import express from "express";
import {
  AddAuthor,
  AddBlog,
  AuthorCommentedBlog,
  BlogList,
  Dashboard,
  BlogComments,
  GenerateContent,
} from "../controller/author.controller.js";

// middlewares
import authorRegister from "../middlewares/authorRegister.middleware.js";
import AddBlogMiddleware from "../middlewares/addBlog.middleware.js";
import VerifyToken from "../middlewares/verifyToken.middleware.js";
import PromptMiddleware from "../middlewares/prompt.middleware.js";
import upload from "../middlewares/multer.js";

const AuthorRoutes = express.Router();

AuthorRoutes.post("/register-author", authorRegister, AddAuthor);
AuthorRoutes.post(
  "/add-blog",
  VerifyToken,
  upload.single("image"),
  AddBlogMiddleware,
  AddBlog,
);
AuthorRoutes.get("/blog-list", VerifyToken, BlogList);
AuthorRoutes.get("/dashboard", VerifyToken, Dashboard);
AuthorRoutes.get("/author-comment-blog", VerifyToken, AuthorCommentedBlog);
AuthorRoutes.get("/blog-comments/:blogId", VerifyToken, BlogComments);
AuthorRoutes.post("/generate", VerifyToken, PromptMiddleware, GenerateContent);
export default AuthorRoutes;
