import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addUser,
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route("/").post(addUser).get(getAllUsers);

userRoutes.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

userRoutes.patch("/changePassword/:id", changePassword);

export default userRoutes;
