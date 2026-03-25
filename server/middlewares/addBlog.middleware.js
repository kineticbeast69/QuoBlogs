import AddBlogSchema from "./schema/addBlog.schema.js";

const AddBlogMiddleware = (req, res, next) => {
  const { error, value } = AddBlogSchema.validate(req.body);
  if (error) return res.status(409).json({ message: error.details[0].message });
  req.body = value;
  next();
};

export default AddBlogMiddleware;
