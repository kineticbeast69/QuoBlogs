import authorRegisterSchema from "./schema/authorRegister.schema.js";

const authorRegister = (req, res, next) => {
  const { error, value } = authorRegisterSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  req.body = value;
  next();
};

export default authorRegister;
