import Joi from "joi";

export const commentSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .min(4)
    .max(30)
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      "any.required": "*Name is required.",
      "string.pattern.base": "*Only alphabets and spaces are allowed.",
      "string.min": "*Name must have 4 characters.",
      "string.max": "*Name can't be greater than 30 characters.",
    }),
  comment: Joi.string()
    .trim()
    .required()
    .min(10)
    .max(300)
    .pattern(/^[A-Za-z0-9\s.,!?'"()-]+$/)
    .messages({
      "any.required": "*Please write some comment.",
      "string.pattern.base": "*Comment contains invalid characters.",
      "string.min": "*Comment must have 10 characters.",
      "string.max": "Comment can't be greater than 300 characters.",
    }),
});
