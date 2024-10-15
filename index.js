import "dotenv/config.js";
import express from "express";
import { dbConnection } from "./database/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { AppError } from "./src/utils/AppError.js";
import categoryRoutes from "./src/modules/category/category.routes.js";
import { globalErrorHandling } from "./src/middleware/handleError.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

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
