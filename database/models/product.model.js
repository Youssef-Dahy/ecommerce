import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "title is too short"],
      maxLength: [30, "title is too long"],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      minLength: [3, "title is too short"],
      maxLength: [300, "title is too long"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    imageCover: String,
    images: [String],
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    rateCount: Number,
    rateAverage: {
      type: Number,
      min: 0,
      max: 5,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, toObject: { virtuals: true } },
  }
);

productSchema.post("init", function (doc) {
  doc.imageCover = process.env.BASEURL + "uploads/" + doc.imageCover;
  if (doc.images)
    doc.images = doc.images.map(
      (ele) => process.env.BASEURL + "product/" + ele
    );
});
const productModel = mongoose.model("Product", productSchema);

productSchema.virtual("myReview", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
  justOne: true,
});
productSchema.pre(/^find/, function () {
  this.populate("myReview");
});
export default productModel;
