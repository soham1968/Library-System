import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },

    cart: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
