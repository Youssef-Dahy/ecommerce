import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import userModel from "./../../../../database/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";

const addUser = handleError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("Email already exists", 409));

  let preUser = new userModel(req.body);
  let addedUser = await preUser.save();
  res.status(201).json({ message: "Add", addedUser });
});

const getAllUsers = handleError(async (req, res, next) => {
  let apiFeature = new ApiFeature(userModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();

  let allUsers = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allUsers });
});

const getUserById = handleError(async (req, res) => {
  let user = await userModel.findById(req.params.id);
  res.json({ message: "Done", user });
});

const updateUser = handleError(async (req, res) => {
  // req.body.slug = slugify(req.body.title);
  // if (req.file) req.body.logo = req.file.filename;
  let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updatedUser && res.json({ message: "Done", updatedUser });
  !updatedUser && res.json({ message: "not found User" });
});

const deleteUser = deleteOne(userModel);

const changePassword = handleError(async (req, res, next) => {
  // req.body.slug = slugify(req.body.title);
  // if (req.file) req.body.logo = req.file.filename;
  req.body.changePasswordAt = Date.now();
  let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updatedUser && res.json({ message: "Done", updatedUser });
  !updatedUser && res.json({ message: "not found User" });
});

export {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
};
