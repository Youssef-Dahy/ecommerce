import { handleError } from "../../../middleware/handleError.js";
import slugify from "slugify";
import brandModel from "../../../../database/models/brand.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addBrand = handleError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.logo = req.file.filename;
  let preBrand = new brandModel(req.body);
  let addedBrand = await preBrand.save();
  res.json({ message: "Add", addedBrand });
});

const getAllBrands = handleError(async (req, res) => {
  let apiFeature = new ApiFeature(brandModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allBrands = await apiFeature.mongooseQuery;
  res.json({ message: "Done", allBrands });
});

const getBrandById = handleError(async (req, res) => {
  let brand = await brandModel.findById(req.params.id);
  res.json({ message: "Done", brand });
});

const updateBrand = handleError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  if (req.file) req.body.logo = req.file.filename;
  let updatedBrand = await brandModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedBrand && res.json({ message: "Done", updatedBrand });
  !updatedBrand && res.json({ message: "not found Brand" });
});

const deleteBrand = deleteOne(brandModel);

export { addBrand, getAllBrands, getBrandById, updateBrand, deleteBrand };
