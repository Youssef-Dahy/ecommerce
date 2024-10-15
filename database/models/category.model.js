import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "title is too short"],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: String,
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
  doc.image = process.env.BASEURL + "uploads/" + doc.image;
});
const categoryModel = mongoose.model("Category", schema);

export default categoryModel;
