import express from "express";
import { protectRoutes } from "./../../middleware/auth/auth.controller.js";
import {
  addToWishList,
  deleteFromWishList,
  getAllWishLists,
} from "./controller/wishList.controller.js";

const wishListRoutes = express.Router();

wishListRoutes.patch("/:id", protectRoutes, addToWishList);
wishListRoutes.get("/", protectRoutes, getAllWishLists);
wishListRoutes.delete("/", protectRoutes, deleteFromWishList);

export default wishListRoutes;
