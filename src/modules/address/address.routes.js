import express from "express";
import { protectRoutes } from "./../../middleware/auth/auth.controller.js";
import {
  addAddress,
  deleteAddress,
  getAllAddress,
} from "./controller/addressList.controller.js";

const addressRoutes = express.Router();

addressRoutes.patch("/", protectRoutes, addAddress);
// addressRoutes.patch("/:id", protectRoutes, updateAddress);
addressRoutes.get("/", protectRoutes, getAllAddress);
addressRoutes.delete("/:id", protectRoutes, deleteAddress);

export default addressRoutes;
