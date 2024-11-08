import { removeFromAlgolia, syncToAlgolia } from "@/utils/algolia";
import mongoose from "mongoose";
const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    description: { type: String },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

BookSchema.pre("save", function (next) {
  this.isAvailable = this.availableCopies > 0;
  next();
});

// BookSchema.post("save", async function (doc) {
//   await syncToAlgolia(doc);
// });

// BookSchema.post("remove", async function (doc) {
//   await removeFromAlgolia(doc._id);
// });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
