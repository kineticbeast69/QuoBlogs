import express from "express";
import {
  Addcomments,
  BlogComment,
  BlogInfo,
  Blogs,
  Commentdislike,
  CommentLike,
  Dislikeblog,
  Likeblog,
  QueryBlog,
} from "../controller/quoblogs.controller.js";
import CommentMiddleware from "../middlewares/comment.middleware.js";
import queryMiddleware from "../middlewares/query.middleware.js";
const QuoRoutes = express.Router();

QuoRoutes.get("/blogs", Blogs);
QuoRoutes.get("/blog-info/:blogID", BlogInfo);
QuoRoutes.put("/likes/:blogID", Likeblog);
QuoRoutes.put("/dislikes/:blogID", Dislikeblog);
QuoRoutes.post("/comment/:blogId", CommentMiddleware, Addcomments);
QuoRoutes.get("/blog-comments/:blogId", BlogComment);
QuoRoutes.put("/comment-like/:commentId", CommentLike);
QuoRoutes.put("/comment-dislike/:commentId", Commentdislike);
QuoRoutes.post("/query-blog", queryMiddleware, QueryBlog);
export default QuoRoutes;
