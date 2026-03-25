import Joi from "joi";

const allowedTopics = ["Technology", "Startup", "Lifestyle", "Finance", "AI"];
const authorRegisterSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .min(4)
    .max(25)
    .pattern(/([a-zA-Z_\s]+)/)
    .messages({
      "any.required": "*Name is required.",
      "string.min": "*Name must have 4 characters.",
      "string.max": "*Name can't be greater than 25 characters.",
      "string.pattern.base": "*Name can only contain alphabets and spaces.",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "*Email is required.",
    "string.email": "*Enter the valid email addrress.",
  }),
  bio: Joi.string().trim().required().min(30).max(200).messages({
    "any.required": "*Please write something Bio.",
    "string.min": "*Bio must be greater than 30 characters.",
    "string.max": "*Bio can't be greater than 200 characters.",
  }),
  topics: Joi.array()
    .items(Joi.string().valid(...allowedTopics))
    .min(1)
    .max(5)
    .required()
    .messages({ "any.required": "*Please! Choose atleast one topics." }),
  experience: Joi.string()
    .required()
    .valid("beginner", "intermediate", "professional")
    .messages({
      "any.required": "*Please select the experince level.",
      "any.only": "*Invalid experience level is not allowed.",
    }),
  language: Joi.string().required().valid("english", "hindi").messages({
    "any.required": "*Please choose any one language.",
    "any.one": "*Invalid languages is not allowed.",
  }),
  confirm: Joi.boolean()
    .required()
    .messages({ "any.required": "*Please confirm the filed." }),
  link: Joi.string()
    .trim()
    .uri({ scheme: ["https"] })
    .required()
    .messages({
      "any.required": "*Please enter the portfolio url.",
      "string.uri": "*Enter the valid url.",
    }),
});

export default authorRegisterSchema;
