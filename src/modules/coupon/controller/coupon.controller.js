import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import couponModel from "./../../../../database/models/coupon.model.js";
import { AppError } from "../../../utils/AppError.js";
import QRCode from "qrcode";

const addCoupon = handleError(async (req, res, next) => {
  let preCoupon = new couponModel(req.body);
  let addedCoupon = await preCoupon.save();
  res.json({ message: "Add", addedCoupon });
});

const getAllCoupons = handleError(async (req, res) => {
  let apiFeature = new ApiFeature(couponModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allCoupons = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allCoupons });
});

const getCouponById = handleError(async (req, res) => {
  let coupon = await couponModel.findById(req.params.id);

  let url = await QRCode.toDataURL(coupon.code);
  res.json({ message: "Done", coupon, url });
});

const updateCoupon = handleError(async (req, res, next) => {
  let { id } = req.params;
  let updatedCoupon = await couponModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  updatedCoupon && res.json({ message: "Done", updatedCoupon });
  !updatedCoupon && next(new AppError("Coupon not found", 404));
});

const deleteCoupon = deleteOne(couponModel);

export { addCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon };
