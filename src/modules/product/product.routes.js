import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields, uploadSingle } from "../../utils/fileUpload.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./controller/product.controller.js";
import {
  addProductSchema,
  productIdSchema,
  updateProductSchema,
} from "./product.validation.js";
import {
  allowTo,
  protectRoutes,
} from "../../middleware/auth/auth.controller.js";

const productRoutes = express.Router();

productRoutes
  .route("/")
  .get(getAllProducts)
  .post(
    protectRoutes,
    allowTo("admin"),
    uploadFields([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductSchema),
    addProduct
  );

productRoutes
  .route("/:id")
  .get(validation(productIdSchema), getProductById)
  .patch(
    uploadFields([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductSchema),
    updateProduct
  )
  .delete(validation(productIdSchema), deleteProduct);

export default productRoutes;
