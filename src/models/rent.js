import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    books: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    ],
    rentedAt: { type: Date, default: Date.now },
    returnDate: { type: "string" },
    status: { type: String, enum: ["ongoing", "returned"], default: "ongoing" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.models.Rent || mongoose.model("Rent", RentalSchema);
