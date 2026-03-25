import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    ip_address: { type: String, required: true },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    status: { type: String, enum: ["public", "private"], default: "private" },
    blog_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  },
  { timestamps: true },
);

const Comments =
  mongoose.models.comments || mongoose.model("comments", commentsSchema);

export default Comments;
