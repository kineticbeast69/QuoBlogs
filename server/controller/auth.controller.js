import Login from "../models/login.model.js";
import jwt from "jsonwebtoken";

// login controller
const LoginUser = async (req, res) => {
  const { email, quoblogID } = req.body;

  try {
    // ADMIN LOGIN
    if (
      email === process.env.ADMIN_EMAIL &&
      quoblogID === process.env.ADMIN_ID
    ) {
      const token = jwt.sign(
        { role: "admin", email, id: process.env.ADMIN_ID },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "2d" },
      );

      // Author login — fixed ✅
      res.cookie("token", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_COOKIE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_COOKIE_ENV === "production",
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: true,
        message: "Welcome Admin",
      });
    }

    // AUTHOR LOGIN
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "No credentials found.",
      });
    }

    // CHECK LOCK
    if (user.lockUntill && user.lockUntill > Date.now()) {
      return res.status(401).json({
        status: false,
        message: "Account is locked. Try after 15 minutes.",
      });
    }

    // WRONG ID
    if (user.QuoBlog_ID !== quoblogID) {
      user.loginAttempts += 1;

      // increasing the attempts
      if (user.loginAttempts >= 5) {
        user.lockUntill = Date.now() + 15 * 60 * 1000;
      }

      await user.save();

      const attemptsLeft = Math.max(0, 5 - user.loginAttempts);

      return res.status(401).json({
        status: false,
        message: `Invalid QuoBlogID. Attempts left: ${attemptsLeft}`,
      });
    }

    // BLOCK CHECK
    if (user.block || !user.verified) {
      return res.status(403).json({
        status: false,
        message: "Access denied.",
      });
    }

    // SUCCESS LOGIN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: "author",
        authorID: user.Author_ID,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "2d" },
    );

    // Author login — fixed ✅
    res.cookie("token", token, {
      httpOnly: true,
      sameSite:
        process.env.NODE_COOKIE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_COOKIE_ENV === "production",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    user.loginAttempts = 0;
    user.lockUntill = null;
    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Welcome Sir!",
    });
  } catch (error) {
    console.log("Auth error API_1", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error Auth API_1",
    });
  }
};

// auth user controller
const AuthUser = async (req, res) => {
  const { id, role } = req.user;
  try {
    return res
      .status(200)
      .json({ status: true, message: "Verified user", role, id });
  } catch (error) {
    console.log("Auth error API_3", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error Auth API_3" });
  }
};

// logout controller
const Logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_COOKIE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "strict", // ✅ matches login
      secure: isProduction, // ✅ matches login
    });

    return res
      .status(200)
      .json({ status: true, message: "Logout successfully." });
  } catch (error) {
    console.log("Auth Error API_2", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error Auth API_2" });
  }
};

export { LoginUser, Logout, AuthUser };
