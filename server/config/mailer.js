import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "",
  port: "",
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});
export default transporter;
