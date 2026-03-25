import Subscribe from "../models/subscribe.model.js";
import geoip from "geoip-lite";

const subscribeEmail = async (req, res) => {
  const ip = req.clientIp || "unknown";
  const geo = geoip.lookup(ip) || {};
  const { email } = req.body;
  try {
    //   checking the already subscribed email or not
    const existEmail = await Subscribe.findOne({ email: email });
    if (existEmail)
      return res.status(401).json({
        message: "You have already Subscribe to QuoBlog.",
        status: false,
      });

    // now saving the client info
    const client = new Subscribe({
      email: email,
      ip_address: ip,
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
    });
    await client.save();

    // sending the email
    //   my email sending code
    return res.status(200).json({
      message: "Thanks for Subscribing to QuoBlog.",
      status: true,
    });
  } catch (error) {
    console.error("Subscribe error API_1", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default subscribeEmail;
