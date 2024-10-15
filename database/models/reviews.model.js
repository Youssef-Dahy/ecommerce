import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    comment: {
      type: String,
      required: [true, "review comment required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("Review", reviewSchema);

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name");
});

export default reviewModel;
