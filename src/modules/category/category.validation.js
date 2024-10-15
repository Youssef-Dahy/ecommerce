import Joi from "joi";

const addCategorySchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required(),
});

const getByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(20).required(),
});

export { addCategorySchema, getByIdSchema, updateCategorySchema };
