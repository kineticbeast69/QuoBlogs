import { querySchema } from "./schema/query.schema.js";

const queryMiddleware = (req, res, next) => {
  const { error } = querySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  next();
};
export default queryMiddleware;
