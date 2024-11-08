import Book from "@/models/book";
import User from "@/models/user";
import connectToDatabase from "@/utils/dbConnect";
import validateToken from "@/utils/validateToken";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const { firebaseUID, token } = req.query;

    if (!firebaseUID || !token) {
      return res
        .status(400)
        .json({ message: "firebaseUID and token are required" });
    }

    const decodedToken = await validateToken(token);
    if (!decodedToken.uid || decodedToken.uid !== firebaseUID) {
      return res.status(401).json({ message: "Authorization Failed" });
    }

    try {
      const user = await User.findOne({ firebaseUID });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const cartItems = await Promise.all(
        user.cart.map(async (cartItem) => {
          const book = await Book.findById(cartItem.book);
          return {
            bookId: cartItem.book,
            title: book.title,
            author: book.author,
            quantity: cartItem.quantity,
          };
        })
      );

      return res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error fetching cart items", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
