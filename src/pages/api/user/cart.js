import user from "@/models/user";
import connectToDatabase from "@/utils/dbConnect";
import validateToken from "@/utils/validateToken";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "PUT") {
    const { firebaseUID, cart, token } = req.body;

    if (!firebaseUID || !Array.isArray(cart) || !token) {
      return res
        .status(400)
        .json({ message: "firebaseUID and cart and tojen are required" });
    }
    const decodedToken = await validateToken(token);
    if (!decodedToken.uid || decodedToken.uid !== firebaseUID) {
      return res.status(401).json({ message: "Authorization Failed" });
    }
    try {
      // Validate that each book in the cart exists in the Book collection
      const bookIds = cart.map((item) => item.book);
      const validBooks = await book.find({ _id: { $in: bookIds } });

      if (validBooks.length !== bookIds.length) {
        return res
          .status(400)
          .json({ message: "One or more book IDs are invalid" });
      }

      // Update user's cart
      const updatedUser = await user.findOneAndUpdate(
        { firebaseUID },
        { cart },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating cart", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
