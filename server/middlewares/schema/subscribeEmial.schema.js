import Joi from "joi";

export const subscribeEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "*Email is required.",
    "string.email": "*Enter the valid email address.",
  }),
});
