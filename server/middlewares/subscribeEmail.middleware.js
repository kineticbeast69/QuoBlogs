import { subscribeEmailSchema } from "./schema/subscribeEmial.schema.js";

const subscribeEmailMiddleware = (req, res, next) => {
  const { error, value } = subscribeEmailSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  req.body = value;
  next();
};

export default subscribeEmailMiddleware;
