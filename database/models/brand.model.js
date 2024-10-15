import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "title is too short"],
      maxLength: [30, "title is too long"],
      unique: true,
    },
    logo: String,
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

schema.post("init", function (doc) {
  doc.logo = process.env.BASEURL + "uploads/" + doc.logo;
});
const brandModel = mongoose.model("Brand", schema);

export default brandModel;
