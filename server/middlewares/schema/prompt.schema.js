import Joi from "joi";
export const promptSchema = Joi.object({
  prompt: Joi.string()
    .trim()
    .min(5)
    .max(300)
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .messages({
      "any.required": "Prompt is required.",
      "string.min": "Prompt must have 5 characters.",
      "string.max": "Prompt can't be greater than 300 characters.",
      "string.pattern.base": "Prompt contains Invalid characters.",
    }),
});
