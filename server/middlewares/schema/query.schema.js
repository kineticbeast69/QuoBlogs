import Joi from "joi";

export const querySchema = Joi.object({
  query: Joi.string()
    .trim()
    .min(3)
    .max(300)
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .messages({
      "any.required": "*Query is required.",
      "string.min": "*Query must have 3 characters.",
      "string.max": "*Query can't be greater than 300 characters.",
      "string.pattern.base": "Query Contains invalid characters.",
    }),
});
