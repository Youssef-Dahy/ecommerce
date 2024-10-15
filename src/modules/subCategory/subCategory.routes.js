import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addSubCategorySchema,
  getByIdSchema,
  updateSubCategorySchema,
} from "./subCategory.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "./controller/subCategory.controller.js";

const subCategoryRoutes = express.Router({ mergeParams: true });

subCategoryRoutes
  .route("/")
  .post(uploadSingle("image"), validation(addSubCategorySchema), addSubCategory)
  .get(getAllSubCategories);

subCategoryRoutes
  .route("/:id")
  .get(validation(getByIdSchema), getSubCategoryById)
  .patch(validation(updateSubCategorySchema), updateSubCategory)
  .delete(validation(getByIdSchema), deleteSubCategory);

export default subCategoryRoutes;
