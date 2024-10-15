import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import SubCategoryModel from "./../../../../database/models/subCategory.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addSubCategory = handleError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.image = req.file.filename;
  let preSubCategory = new SubCategoryModel(req.body);
  let addedSubCategory = await preSubCategory.save();
  res.json({ message: "Add", addedSubCategory });
});

const getAllSubCategories = async (req, res) => {
  let filterObject = {};
  if (req.params.category) {
    filterObject.category = req.params.category;
  }
  let apiFeature = new ApiFeature(SubCategoryModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allSubCategories = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allSubCategories });
};

const getSubCategoryById = async (req, res) => {
  let Subcategory = await SubCategoryModel.findById(req.params.id);
  res.json({ message: "Done", Subcategory });
};

const updateSubCategory = async (req, res) => {
  req.body.slug = slugify(req.body.title);
  let updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedSubCategory && res.json({ message: "Done", updatedSubCategory });
  !updatedSubCategory && res.json({ message: "not found Subcategory" });
};

const deleteSubCategory = deleteOne(SubCategoryModel);

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
