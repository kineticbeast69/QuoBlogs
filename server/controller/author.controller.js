"use strict";
import AuthorModel from "../models/author.model.js";
import geoip from "geoip-lite";
import Imageclient from "../config/imagekit.js";
import Blog from "../models/blogs.model.js";
import Comments from "../models/comments.model.js";
import { toFile } from "@imagekit/nodejs";

const AddAuthor = async (req, res) => {
  const { name, email, bio, link, language, experience, confirm, topics } =
    req.body;
  const ip = req.clientIp || unknown;
  const geo = geoip.lookup(ip) || {};
  try {
    // checking person already registered or not
    const authorExists = await AuthorModel.findOne({ email });
    if (authorExists)
      return res.status(401).json({
        status: false,
        message: "You have already registered yourself.",
      });

    //saving the new registered authors
    const author = new AuthorModel({
      name,
      email,
      bio,
      link,
      language,
      experience,
      confirm,
      topics,
      ip_address: ip,
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
    });
    await author.save();

    return res.status(201).json({
      status: true,
      message:
        "Registration successful. Your account is pending admin approval. You will be notified once your account is verified.",
    });
  } catch (error) {
    console.log("Author Error API_1", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
};

// add blog controller
const AddBlog = async (req, res) => {
  const { title, subtitle, category, description } = req.body;
  const { authorID } = req.user; //author id
  const image = req.file;

  try {
    if (!authorID)
      return res.status(400).json({ message: "AuthorID is not found." });
    if (!image)
      return res.status(400).json({ message: "Blog Image is required" });

    // upload image to imagekit

    const file = await toFile(image.buffer, image.originalname);

    const response = await Imageclient.files.upload({
      file,
      fileName: image.originalname,
      useUniqueFileName: true,
      folder: "/quoblogs",
    });

    const optimizedImageUrl = Imageclient.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const Saveblog = new Blog({
      title,
      subtitle,
      description,
      category,
      imageUrl: optimizedImageUrl,
      author_ID: authorID,
    });

    await Saveblog.save();

    return res.status(200).json({
      status: true,
      message: "Blog Added Successfully.",
    });
  } catch (error) {
    console.log("Author Error API_2", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error Author API_2",
    });
  }
};

// blog list controller
const BlogList = async (req, res) => {
  const { authorID, role } = req.user;
  const { status } = req.query;
  try {
    switch (role) {
      case "admin":
        var list = await Blog.find()
          .where({ status: status })
          .select("title likes disLikes createdAt author_ID");
        return res.status(200).json({ status: true, list });
        break;
      case "author":
        if (!authorID) return console.log("author id is not found.");
        var list = await Blog.find()
          .where({
            author_ID: authorID,
            status: status,
          })
          .select("title likes disLikes createdAt author_ID");
        return res.status(200).json({ status: true, list });
        break;
    }
  } catch (error) {
    console.log("Authors api error API_3", error);
    return res
      .status(500)
      .json({ status: false, message: "Authors Api error API_3" });
  }
};

// author dashboard
const Dashboard = async (req, res) => {
  const { authorID } = req.user;
  try {
    if (!authorID) return console.log("Author id not found.");
    const lists = await Blog.find().where({ author_ID: authorID });
    // totals blog and private blog length
    const totalblogs = lists.length;
    const draftBlogs = lists.filter((list) => list.status === "private").length;
    const publicBlogs = lists.filter((list) => list.status === "public");
    const info = { total: totalblogs, draft: draftBlogs, list: publicBlogs };
    return res.status(200).json({ status: true, info });
  } catch (error) {
    console.log("Author error API_4", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error Author API_4" });
  }
};

// publicCommentedBlog
const AuthorCommentedBlog = async (req, res) => {
  const { authorID } = req.user;
  try {
    if (!authorID) console.log("author id is not found.");
    const blog = await Blog.find().where({
      author_ID: authorID,
      status: "public",
    });
    return res.status(200).json({ status: true, blog });
  } catch (error) {
    console.log("Author Error API_5", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error Author API_5" });
  }
};

// blogcomments
const BlogComments = async (req, res) => {
  const { blogId } = req.params;
  try {
    const lists = await Comments.find()
      .where({ blog_ID: blogId })
      .select("name comment status likes dislikes ");
    return res.status(200).json({ status: true, lists });
  } catch (error) {
    console.log("Authors error API_6", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error Author API_6" });
  }
};
export {
  AddAuthor,
  AddBlog,
  BlogList,
  Dashboard,
  AuthorCommentedBlog,
  BlogComments,
};
