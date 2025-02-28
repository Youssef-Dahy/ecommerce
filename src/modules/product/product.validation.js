import Joi from "joi";

const addProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().trim(),
  description: Joi.string().min(10).max(300).required().trim(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),
  imageCover: Joi.array()
    .items(
      Joi.object({
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
      }).required()
    )
    .required(),
  images: Joi.array()
    .items(
      Joi.object({
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
      }).required()
    )
    .required(),
});

const productIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24),
  title: Joi.string().min(3).max(30).trim(),
  description: Joi.string().min(10).max(300).trim(),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().min(0),
  quantity: Joi.number().min(0),
  category: Joi.string().hex().length(24),
  subCategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
  createdBy: Joi.string().hex().length(24).optional(),
  imageCover: Joi.array()
    .items(
      Joi.object({
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
      }).required()
    )
    .required(),
  images: Joi.array()
    .items(
      Joi.object({
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
      }).required()
    )
    .required(),
});

export { addProductSchema, productIdSchema, updateProductSchema };

// image: Joi.object({
//   fieldname: Joi.string().required(),
//   originalname: Joi.string().required(),
//   encoding: Joi.string().required(),
//   mimetype: Joi.string()
//     .valid("image/jpeg", "image/png", "image/jpg")
//     .required(),
//   destination: Joi.string().required(),
//   filename: Joi.string().required(),
//   path: Joi.string().required(),
//   size: Joi.number().max(5242880).required(),
// }).required(),
