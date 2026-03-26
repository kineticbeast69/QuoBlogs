import { promptSchema } from "./schema/prompt.schema.js";

const PromptMiddleware = (req, res, next) => {
  const { error } = promptSchema.validate(req.body);
  if (error)
    return res
      .status(409)
      .json({ status: false, message: error.details[0].message });
  next();
};
export default PromptMiddleware;
