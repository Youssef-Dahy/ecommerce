import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import userModel from "./../../../../database/models/user.model.js";

const addAddress = handleError(async (req, res, next) => {
  let updatedAddress = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { address: req.body },
    },

    { new: true }
  );
  updatedAddress && res.json({ message: "Done", updatedAddress });
  !updatedAddress && res.json({ message: "not found Review" });
});

const deleteAddress = handleError(async (req, res, next) => {
  let updatedAddress = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: req.params.id } },
    },

    { new: true }
  );
  updatedAddress && res.json({ message: "Done", updatedAddress });
  !updatedAddress && res.json({ message: "not found Review" });
});

const getAllAddress = handleError(async (req, res, next) => {
  let getAddress = await userModel
    .find({ _id: req.user._id })
    .select("address");

  getAddress && res.json({ message: "Done", getAddress });
  !getAddress && res.json({ message: "not found Review" });
});

export { addAddress, deleteAddress, getAllAddress };
