import Blog from "../models/blogs.model.js";
import Comments from "../models/comments.model.js";
import Author from "../models/author.model.js";
import geoip from "geoip-lite";
// homepage blogs route
const Blogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .where({ status: "public" })
      .select("title subtitle category description imageUrl");
    return res.status(200).json({ status: true, blogs });
  } catch (error) {
    console.log("Quoblogs error API_1", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error QUOBlogs API_1" });
  }
};

// fetching the single
const BlogInfo = async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await Blog.findById(blogID).select(
      "title subtitle description imageUrl category likes disLikes dislikes createdAt author_ID",
    );
    const author = await Author.findById(blog.author_ID).select("name");
    return res.status(200).json({ status: true, blog, author });
  } catch (error) {
    console.log("QuoBlogs error API_2", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error QuoBlogs API_2" });
  }
};

// liking the blog
const Likeblog = async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await Blog.findById(blogID).select("likes");
    blog.likes += 1;
    await blog.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("QuoBlog error API_3", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error QuoBlog API_3" });
  }
};

// disliking the blog
const Dislikeblog = async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await Blog.findById(blogID).select("disLikes");
    blog.disLikes += 1;
    await blog.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("QuoBlog error API_3", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error QuoBlog API_3" });
  }
};

// comments
const Addcomments = async (req, res) => {
  const { blogId } = req.params;
  const { name, comment } = req.body;
  const ip = req.clientIp || "unknown";
  const geo = geoip.lookup(ip) || {};
  try {
    const addComment = new Comments({
      name: name,
      comment: comment,
      blog_ID: blogId,
      ip_address: ip,
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
    });
    await addComment.save();
    return res
      .status(200)
      .json({ status: true, message: "Comment added succesfully." });
  } catch (error) {
    console.log("QuoBlogs error API_5", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error QuoBlog API_5" });
  }
};

// fecthing comments
const BlogComment = async (req, res) => {
  const { blogId } = req.params;
  try {
    const comments = await Comments.find({
      blog_ID: blogId,
      status: "public",
    }).select("name comment likes dislikes createdAt");

    const totalComments = comments.length;

    return res.status(200).json({
      status: true,
      comments,
      length: totalComments,
    });
  } catch (error) {
    console.log("Quoblog error API_6", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error QuoBlog API-6",
    });
  }
};

// comment like
const CommentLike = async (req, res) => {
  const { commentId } = req.params;
  try {
    const info = await Comments.findById(commentId).select(" likes");
    info.likes += 1;
    await info.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("Quo blog error API_7", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error QuoBlog API_7" });
  }
};

// comment dislikes
const Commentdislike = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comments.findById(commentId).select(" dislikes");
    comment.dislikes += 1;
    await comment.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("Quo blog error API_8", error);
    return res
      .status(500)
      .json({ status: fasle, message: "Internal Server Error QuoBlog API_8" });
  }
};

// query blogs
const QueryBlog = async (req, res) => {
  const { query } = req.body;
  try {
    const blog = await Blog.find({
      title: { $regex: query, $options: "i" },
      status: "public",
    }).select("imageUrl title description category");
    return res.status(200).json({ status: true, blog });
  } catch (error) {
    console.log("Quoblog error API_9", error);
    return res
      .status(500)
      .json({ status: fasle, message: "Internal server Error QuoBlogs API_9" });
  }
};
export {
  Blogs,
  BlogInfo,
  Likeblog,
  Dislikeblog,
  Addcomments,
  BlogComment,
  CommentLike,
  Commentdislike,
  QueryBlog,
};
