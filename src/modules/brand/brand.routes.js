import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addBrandSchema,
  brandIdSchema,
  updateBrandSchema,
} from "./brand.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "./controller/brand.controller.js";

const brandRoutes = express.Router();

brandRoutes
  .route("/")
  .post(uploadSingle("image"), validation(addBrandSchema), addBrand)
  .get(getAllBrands);

brandRoutes
  .route("/:id")
  .get(validation(brandIdSchema), getBrandById)
  .patch(validation(updateBrandSchema), updateBrand)
  .delete(validation(brandIdSchema), deleteBrand);

export default brandRoutes;
