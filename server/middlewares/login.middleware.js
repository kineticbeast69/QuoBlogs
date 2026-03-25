import loginSchema from "./schema/login.schema.js";

const LoginMiddleware = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(401)
      .json({ status: false, message: error.details[0].message });
  }
  req.body = value;
  next();
};

export default LoginMiddleware;
