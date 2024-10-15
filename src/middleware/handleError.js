import { AppError } from "../utils/AppError.js";

export const handleError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export const globalErrorHandling = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: "error", err: err.message });
};
