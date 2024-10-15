import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import userModel from "./../../../../database/models/user.model.js";

const addToWishList = handleError(async (req, res, next) => {
  let updatedWishList = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.params.id },
    },

    { new: true }
  );
  updatedWishList && res.json({ message: "Done", updatedWishList });
  !updatedWishList && res.json({ message: "not found Review" });
});

const deleteFromWishList = handleError(async (req, res, next) => {
  let { product } = req.body;

  let updatedWishList = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { wishList: product },
    },

    { new: true }
  );
  updatedWishList && res.json({ message: "Done", updatedWishList });
  !updatedWishList && res.json({ message: "not found Review" });
});

const getAllWishLists = handleError(async (req, res, next) => {
  let updatedWishList = await userModel
    .findOne({ _id: req.user._id })
    .populate("wishList");
  console.log(updatedWishList);

  updatedWishList &&
    res.json({ message: "Done", updatedWishList: updatedWishList.wishList });
  !updatedWishList && res.json({ message: "not found Review" });
});
export { addToWishList, deleteFromWishList, getAllWishLists };
