import { handleError } from "../../../middleware/handleError.js";
import categoryModel from "./../../../../database/models/category.model.js";
import slugify from "slugify";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "./../../../utils/ApiFeatures.js";

const addCategory = handleError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.image = req.file.filename;
  let preCategory = new categoryModel(req.body);
  let addedCategory = await preCategory.save();
  res.json({ message: "Add", addedCategory });
});

const getAllCategories = async (req, res) => {
  let apiFeature = new ApiFeature(categoryModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allCategories = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allCategories });
};

const getCategoryById = async (req, res) => {
  let category = await categoryModel.findById(req.params.id);
  res.json({ message: "Done", category });
};

const updateCategory = async (req, res) => {
  req.body.slug = slugify(req.body.title);
  let updatedCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedCategory && res.json({ message: "Done", updatedCategory });
  !updatedCategory && res.json({ message: "not found category" });
};

const deleteCategory = deleteOne(categoryModel);

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
