import jwt from "jsonwebtoken";
const VerifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token generated." });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid token found." });
  }
};

export default VerifyToken;
