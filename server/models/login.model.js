import mongoose from "mongoose";

const loginScehma = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    Author_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    QuoBlog_ID: { type: String, required: true, unique: true },
    block: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now(), required: true },
    loginAttempts: { type: Number, default: 0 },
    lockUntill: { type: Date, default: null },
  },
  { timestamps: true },
);

const Login = mongoose.models.login || mongoose.model("login", loginScehma);

export default Login;
