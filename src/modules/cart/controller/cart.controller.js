import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/AppError.js";
import cartModel from "../../../../database/models/cart.model.js";
import productModel from "../../../../database/models/product.model.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.price * ele.quantity;
  });

  cart.totalPrice = totalPrice;
}

const createCart = handleError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));

  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });

    calcPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "Cart created successfully", cart });
  }

  let item = isCartExist.cartItems.find(
    (ele) => ele.product == req.body.product
  );
  if (item) {
    item.quantity += 1;
  } else {
    isCartExist.cartItems.push(req.body);
  }

  calcPrice(isCartExist);

  await isCartExist.save();
  res.json({ message: "Success", isCartExist });
});

const getAllCarts = handleError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  res.json({ message: "Done", cart });
});

const deleteCartItem = handleError(async (req, res, next) => {
  // Find and update the cart by removing the specified item
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );

  // If the cart doesn't exist, return an error
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Recalculate the total price after the item is removed
  calcPrice(cart);

  // Save the updated cart with the new total price
  await cart.save();

  res.json({ message: "Item deleted and total price updated", cart });
});

const updateCart = handleError(async (req, res, next) => {
  // Find the product to get the price
  let product = await productModel.findById(req.body.product).select("price");
  if (!product) return next(new AppError("Product not found", 404));

  req.body.price = product.price;

  // Check if the cart exists for the user
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) return next(new AppError("Cart not found", 404));

  // Find the specific item in the cart
  let item = isCartExist.cartItems.find(
    (ele) => ele.product == req.body.product
  );
  if (!item) return next(new AppError("Item not found in cart", 404));

  // Update the item's quantity (increase or decrease)
  item.quantity += req.body.quantity;

  // Recalculate the total price of the cart
  calcPrice(isCartExist);

  // Save the updated cart
  await isCartExist.save();

  // Return success response with the updated cart
  res.json({ message: "Cart updated successfully", isCartExist });
});

export { createCart, getAllCarts, deleteCartItem, updateCart };
