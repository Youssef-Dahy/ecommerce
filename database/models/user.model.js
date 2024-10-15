import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minLength: [1, "too short user name"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email must be unique"],
      minLength: 1,
    },
    phone: {
      type: String,
      required: [true, "phone number required"],
    },
    role: {
      type: String,
      enums: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "minLength 6 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    wishList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    address: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],
    changePasswordAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 7);
});

userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 7);
});
const userModel = mongoose.model("User", userSchema);

export default userModel;
