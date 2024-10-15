import express from "express";
import { uploadSingle } from "../../utils/fileUpload.js";

import { protectRoutes } from "../../middleware/auth/auth.controller.js";
import {
  createOrder,
  getAllOrders,
  getOrder,
  onlinePayment,
} from "./controller/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.route("/:id").post(protectRoutes, createOrder);
orderRoutes.route("/checkout/:id").post(protectRoutes, onlinePayment);
orderRoutes
  .route("/")
  .get(protectRoutes, getOrder)
  .get(protectRoutes, getAllOrders);
// orderRoutes.route("/:id").delete(protectRoutes).patch(protectRoutes);

export default orderRoutes;
