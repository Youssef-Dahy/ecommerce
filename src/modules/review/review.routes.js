import express from "express";
import { uploadSingle } from "../../utils/fileUpload.js";
import {
  addReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "./controller/review.controller.js";
import { protectRoutes } from "../../middleware/auth/auth.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.route("/").post(protectRoutes, addReview).get(getAllReviews);

reviewRoutes
  .route("/:id")
  .get(getReviewById)
  .put(protectRoutes, updateReview)
  .delete(deleteReview);

export default reviewRoutes;
