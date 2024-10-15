import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    discount: {
      type: Number,
      min: 0,
    },
    expires: String,
  },
  {
    timestamps: true,
  }
);

const couponModel = mongoose.model("Coupon", schema);

export default couponModel;
