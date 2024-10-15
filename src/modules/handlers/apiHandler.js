import { handleError } from "../../middleware/handleError.js";

export const deleteOne = (model) => {
  return handleError(async (req, res) => {
    let brand = await model.findByIdAndDelete(req.params.id);
    brand && res.json({ message: "deleted", brand });
    !brand && res.json({ message: "not found Item" });
  });
};
