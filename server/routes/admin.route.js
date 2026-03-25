import express from "express";
import {
  SubscriberList,
  AuthorList,
  VerifyingAuthor,
  UnverifyingAuthor,
  PublicBlog,
  PrivateBlog,
  Dashboard,
  PublicCommentedBlog,
  BlogComments,
  CommentStatus,
} from "../controller/admin.controller.js";
const AdminRoute = express.Router();

AdminRoute.get("/subscriber-list", SubscriberList);
AdminRoute.get("/authors-list", AuthorList);
AdminRoute.put("/verify/:id", VerifyingAuthor);
AdminRoute.put("/unverify/:id", UnverifyingAuthor);
AdminRoute.put("/public/:blogID", PublicBlog);
AdminRoute.put("/private/:blogID", PrivateBlog);
AdminRoute.get("/dashboard", Dashboard);
AdminRoute.get("/public-commented-blog", PublicCommentedBlog);
AdminRoute.get("/blog-comments/:blogId", BlogComments);
AdminRoute.put("/comment-status/:commentID", CommentStatus);
export default AdminRoute;
