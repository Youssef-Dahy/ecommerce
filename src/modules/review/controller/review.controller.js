import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import reviewModel from "../../../../database/models/reviews.model.js";
import { AppError } from "../../../utils/AppError.js";

const addReview = handleError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isReview = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReview) return next(new AppError("already have review", 409));
  let preReview = new reviewModel(req.body);
  let addedReview = await preReview.save();
  res.json({ message: "Add", addedReview });
});

const getAllReviews = handleError(async (req, res) => {
  let apiFeature = new ApiFeature(reviewModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allReviews = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allReviews });
});

const getReviewById = handleError(async (req, res) => {
  let review = await reviewModel.findOne(req.params.id);
  res.json({ message: "Done", review });
});

const updateReview = handleError(async (req, res, next) => {
  if (req.file) req.body.logo = req.file.filename;
  let updatedReview = await reviewModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.params.id,
    req.body,
    { new: true }
  );
  updatedReview && res.json({ message: "Done", updatedReview });
  !updatedReview && res.json({ message: "not found Review" });
});

const deleteReview = deleteOne(reviewModel);

export { addReview, getAllReviews, getReviewById, updateReview, deleteReview };
