import Joi from "joi";

const AddBlogSchema = Joi.object({
  title: Joi.string().trim().required().min(5).messages({
    "any.required": "Blog Title is required.",
    "string.min": "Title must have 5 characters.",
  }),

  subtitle: Joi.string().trim().required().min(15).messages({
    "any.required": "SubTitle is required.",
    "string.min": "Subtitle must have 15 characters.",
  }),

  category: Joi.string().required().messages({
    "any.required": "Category is required.",
  }),

  description: Joi.string().trim().required().min(20).messages({
    "any.required": "Some description is required.",
    "string.min": "Description must be at least 20 characters.",
  }),
});

export default AddBlogSchema;
