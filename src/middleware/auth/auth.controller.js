import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "../handleError.js";
import userModel from "./../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";

export const signUp = handleError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) next(new AppError("Email already exists", 409));
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "added", user });
});

export const signIn = handleError(async (req, res, next) => {
  let { email, password } = req.body;
  let isFound = await userModel.findOne({ email });
  const match = await bcrypt.compare(password, isFound.password);

  if (isFound && match) {
    let token = jwt.sign(
      {
        name: isFound.name,
        email: isFound.email,
        userId: isFound._id,
        role: isFound.role,
      },
      "treka"
    );
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

export const protectRoutes = handleError(async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ msg: "Token not provided" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({ msg: "Invalid token format" });
    }

    const newToken = token.split("Bearer ")[1];

    const decoded = jwt.verify(newToken, "treka");

    if (!decoded?.email) {
      return res.status(400).json({ msg: "Invalid token payload" });
    }

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(409).json({ msg: "User does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Token verification failed", error });
  }
});

export const allowTo = (...roles) => {
  return handleError((req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Access denied", 403));
    next();
  });
};
