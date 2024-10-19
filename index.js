import "dotenv/config.js";
import express from "express";
import { dbConnection } from "./database/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { AppError } from "./src/utils/AppError.js";
import categoryRoutes from "./src/modules/category/category.routes.js";
import {
  globalErrorHandling,
  handleError,
} from "./src/middleware/handleError.js";
import cors from "cors";
import Stripe from "stripe";
import cartModel from "./database/models/cart.model.js";
import orderModel from "./database/models/order.model.js";
import productModel from "./database/models/product.model.js";
import userModel from "./database/models/user.model.js";
const stripe = new Stripe(
  "sk_test_51Q9Tpt2NUR7H5U3zlPuNCif8FA8DrDoRoFuhbSXk39O7Nyg4otRz3f8R2Iq6am5N5lRSVebUsxMod5fFohzlBNpN00dWCGXuz4"
);

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/order/webhook",
  express.raw({ type: "application/json" }),
  handleError(async (req, res, next) => {
    const signature = req.headers["stripe-signature"].toString();
    let event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      "whsec_0meXz6kcCe0ldeNvs8VkHpIlP4Xc9SoY"
    );
    // let checkout;

    // if (event.type == "checkout.session.completed") {
    //   checkout = event.data.object;
    //   let user = await userModel.findOne({ email: checkout.customer_email });

    //   let cart = await cartModel.findById({
    //     _id: checkout.client_reference_id,
    //   });

    //   let order = new orderModel({
    //     user: user._id,
    //     cartItems: cart.cartItems,
    //     totalPrice: checkout.amount_total / 100,
    //     shippingAddress: checkout.metadata,
    //     paymentMethod: "credit",
    //     isPaid: true,
    //   });

    //   await order.save();
    //   //bulk Write
    //   if (order) {
    //     let options = cart.cartItems.map((item) => ({
    //       updateOne: {
    //         filter: { _id: item.product },
    //         update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
    //       },
    //     }));

    //     await productModel.bulkWrite(options);
    //   } else {
    //     return next(new AppError("Order not created", 400));
    //   }

    //   await cartModel.findByIdAndDelete({ _id: checkout.client_reference_id });
    // }
    res.status(200).json({ message: "success", checkout });
  })
);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
dbConnection();

allRoutes(app);

app.use("*", (req, res, next) => {
  next(new AppError("url not found", 404));
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode).json({ message: err.message, stack: err.stack });
// });
app.use(globalErrorHandling);
app.use(categoryRoutes);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// app.use(categoryRoutes);
// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
