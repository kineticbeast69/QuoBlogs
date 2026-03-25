import { commentSchema } from "./schema/comment.schema.js";

const CommentMiddleware = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error)
    return res
      .status(409)
      .json({ status: false, message: error.details[0].message });
  next();
};

export default CommentMiddleware;
