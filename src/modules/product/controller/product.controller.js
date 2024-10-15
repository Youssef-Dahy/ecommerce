import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import productModel from "./../../../../database/models/product.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import { mongoose } from "mongoose";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addProduct = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((ele) => ele.filename);
  let preProduct = new productModel(req.body);
  let addedProduct = await preProduct.save();
  res.json({ message: "Add", addedProduct });
});

const getAllProducts = handleError(async (req, res) => {
  let apiFeature = new ApiFeature(productModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();

  let allProducts = await apiFeature.mongooseQuery;
  res.json({ message: "Done", page: apiFeature.page, allProducts });
});

const getProductById = handleError(async (req, res) => {
  let product = await productModel.findById(req.params.id);
  res.json({ message: "Done", product });
});

const updateProduct = handleError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  if (req.files.imageCover)
    req.body.imageCover = req.files.imageCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((ele) => ele.filename);
  let updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedProduct && res.json({ message: "Done", updatedProduct });
  !updatedProduct && res.json({ message: "not found Product" });
});

const deleteProduct = deleteOne(productModel);

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
