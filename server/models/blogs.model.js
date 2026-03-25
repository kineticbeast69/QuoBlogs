import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    disLikes: { type: Number, default: 0 },
    status: { type: String, enum: ["public", "private"], default: "private" },
    author_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default Blog;
