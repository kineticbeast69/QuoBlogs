import Subscribe from "../models/subscribe.model.js";
import Author from "../models/author.model.js";
import Login from "../models/login.model.js";
import Blog from "../models/blogs.model.js";
import Comments from "../models/comments.model.js";
// getting the authors list
const AuthorList = async (req, res) => {
  const { field } = req.query;
  // console.log(field);
  try {
    const authors = await Author.find()
      .where(`${field[0]}`) //field comes in an array format
      .equals(true)
      .select("name email topics link");
    return res.status(200).json({ status: true, authors });
  } catch (error) {
    console.log("Admin Error API_1", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
};

// verifying the authors
const VerifyingAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    // getting the author info and verfying it
    const author = await Author.findById(id);
    author.verified = !author.verified;
    author.unverified = !author.unverified;

    // checking the author login account having or
    const user = await Login.findOne({ Author_ID: id });
    if (!user && author.verified) {
      // generating the author login info amd quoblog Id
      const QuoBlogId =
        "AUL" + Math.floor(100000 + Math.random() * 9000000) + "QUO";
      const login = new Login({
        email: author.email,
        Author_ID: id,
        QuoBlog_ID: QuoBlogId,
        verified: true,
      });
      // saving the info
      await login.save();
    }
    // if user exists and reverified changes these fields
    if (user && author.verified) {
      user.block = false;
      user.verified = true;
      await user.save();
    }

    await author.save();

    // sending the email to author verified with id to login

    return res.status(200).json({
      status: true,
      message: "Author Verified Status updated succesfully.",
    });
  } catch (error) {
    console.log("Admin error API_2", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error API_2 admin." });
  }
};

// unverifying the authors
const UnverifyingAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    // getting the author info and unverifying it
    const author = await Author.findById(id);
    author.verified = !author.verified;
    author.unverified = !author.unverified;

    // blocking the author from login
    const login = await Login.findOne({ Author_ID: id });
    login.block = true;
    login.verified = false;

    // saving the info
    await author.save();
    await login.save();
    return res.status(200).json({
      status: true,
      message: "Author unverified Status updated succesfully.",
    });
  } catch (error) {
    console.log("Admin error API_3", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error API_3 admin" });
  }
};

// public the blog
const PublicBlog = async (req, res) => {
  const { blogID } = req.params;
  try {
    await Blog.findByIdAndUpdate(
      blogID,
      {
        status: "public",
      },
      { new: true },
    );
    return res.status(200).json({
      status: true,
      message: "Blog Public Status updated successfully.",
    });
  } catch (error) {
    console.log("Admin error API_4", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error Admin API_4" });
  }
};

// privating the blog
const PrivateBlog = async (req, res) => {
  const { blogID } = req.params;
  try {
    await Blog.findByIdAndUpdate(blogID, { status: "private" }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Blog private status updated succesfully.",
    });
  } catch (error) {
    console.log("Admin error API_5", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error Admin API_5" });
  }
};

// dashboard
const Dashboard = async (req, res) => {
  try {
    const blog = await Blog.find();
    const author = await Author.find();
    const comment = await Comments.find();

    // blogs
    const totalBlog = blog.length;
    const draftBlog = blog.filter((list) => list.status === "private").length;
    const publishBlog = blog.filter((list) => list.status === "public");

    // authors
    const totalAuthor = author.length;
    const approvedAuthor = author.filter((list) => list.verified === true);

    // comments
    const totalComments = comment.length;

    const info = {
      blog: totalBlog,
      draft: draftBlog,
      publish: publishBlog,
      author: totalAuthor,
      approved: approvedAuthor,
      comment: totalComments,
    };
    return res.status(200).json({ status: true, info });
  } catch (error) {
    console.log("Admin errror API_6", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error Admin API_6" });
  }
};

// public commented blogs
const PublicCommentedBlog = async (req, res) => {
  try {
    const blog = await Blog.find()
      .where({ status: "public" })
      .select("title createdAt");
    return res.status(200).json({ status: true, blog });
  } catch (error) {
    console.log("Admin error API_7", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error Admin API_7" });
  }
};

//blog comments
const BlogComments = async (req, res) => {
  const { blogId } = req.params;
  try {
    const comment = await Comments.find()
      .where({ blog_ID: blogId })
      .select("name comment status likes dislikes");
    return res.status(200).json({ status: true, comment });
  } catch (error) {
    console.log("Admin error API_8", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error Admin API_8" });
  }
};

// comments status
const CommentStatus = async (req, res) => {
  const { value } = req.query;
  const { commentID } = req.params;
  try {
    const info = await Comments.findById(commentID);
    // changing the comment status
    info.status = value;
    await info.save();
    return res.status(200).json({
      status: true,
      message: `Comment ${value} status updated succesfully.`,
    });
  } catch (error) {
    console.log("Admin error API_9", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error Admin API_9",
    });
  }
};

// susbcriber list function
const SubscriberList = async (req, res) => {
  try {
    const list = await Subscribe.find().select("email city region country");
    return res.status(200).json({ status: true, list });
  } catch (error) {
    console.log("Subscriber List Error", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server Error." });
  }
};

export {
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
};
