import mongoose from "mongoose";

// models schema
const subscribeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    ip_address: { type: String, required: true },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
  },
  { timestamps: true },
);

// subscribe models
const Subscribe =
  mongoose.models.subscribe || mongoose.model("subscribe", subscribeSchema);

export default Subscribe;
