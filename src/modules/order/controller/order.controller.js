import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/AppError.js";
import cartModel from "../../../../database/models/cart.model.js";
import orderModel from "../../../../database/models/order.model.js";
import productModel from "../../../../database/models/product.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Q9Tpt2NUR7H5U3zlPuNCif8FA8DrDoRoFuhbSXk39O7Nyg4otRz3f8R2Iq6am5N5lRSVebUsxMod5fFohzlBNpN00dWCGXuz4"
);

const createOrder = handleError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  //bulk Write
  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(options);
    await order.save();
  } else {
    return next(new AppError("Order not created", 400));
  }

  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Done", order });
});

const getOrder = handleError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");

  res.json({ message: "Done", order });
});

const getAllOrders = handleError(async (req, res, next) => {
  let order = await orderModel.find({ user: req.user._id });

  res.json({ message: "Done", order });
});

const onlinePayment = handleError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://fresh-cart-jet.vercel.app/home",
    cancel_url: "https://fresh-cart-jet.vercel.app/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });

  res.json({ message: "Done", session });
});

export { createOrder, getOrder, getAllOrders, onlinePayment };
