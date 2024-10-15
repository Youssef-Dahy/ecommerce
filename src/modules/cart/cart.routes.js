import express from "express";
import { uploadSingle } from "../../utils/fileUpload.js";

import { protectRoutes } from "../../middleware/auth/auth.controller.js";
import {
  createCart,
  deleteCartItem,
  getAllCarts,
  updateCart,
} from "./controller/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes
  .route("/")
  .post(protectRoutes, createCart)
  .get(protectRoutes, getAllCarts);

cartRoutes
  .route("/:id")
  .delete(protectRoutes, deleteCartItem)
  .patch(protectRoutes, updateCart);

export default cartRoutes;
