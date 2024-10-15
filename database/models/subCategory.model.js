import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "title is too short"],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const SubCategoryModel = mongoose.model("SubCategory", schema);

export default SubCategoryModel;
