import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    topics: { type: [String], required: true },
    experience: { type: String, required: true },
    language: { type: String, required: true },
    link: { type: String, required: true },
    confirm: { type: Boolean, required: true, default: false },
    ip_address: { type: String, required: true },
    region: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    verified: { type: Boolean, default: false },
    unverified: { type: Boolean, default: true },
    block: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Author =
  mongoose.models.authors || mongoose.model("authors", authorSchema);

export default Author;
