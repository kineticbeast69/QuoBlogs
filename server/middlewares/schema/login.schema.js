import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().trim().required().email().messages({
    "any.required": "Email is required.",
    "string.email": "Enter the valid email address.",
  }),
  quoblogID: Joi.string()
    .required()
    .trim()
    .min(13)
    .max(13)
    .pattern(/^AUL\d{7}QUO$/)
    .messages({
      "any.required": "QuoBlog ID is required.",
      "string.min": "QuoBlog ID has 13 characters.",
      "string.max": "QuoBlog ID can't be greater than 13 characters.",
      "string.pattern.base": "Invalid QuoBlog ID format",
    }),
});

export default loginSchema;
