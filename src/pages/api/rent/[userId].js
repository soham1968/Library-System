import book from "@/models/book";
import rent from "@/models/rent";
import user from "@/models/user";
import connectToDatabase from "@/utils/dbConnect";

export default async function handler(req, res) {
  await connectToDatabase();

  const { userId } = req.query;

  if (req.method === "POST") {
    const { bookIds, rentalDuration } = req.body;

    try {
      const user = await user.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Verify books availability and update quantities
      const books = await book.find({ _id: { $in: bookIds } });
      const unavailableBooks = books.filter((book) => book.availableCopies < 1);

      if (unavailableBooks.length > 0) {
        return res
          .status(400)
          .json({ error: "Some books are not available for rent" });
      }

      // Update books' available copies
      const rentedBooks = await Promise.all(
        books.map(async (book) => {
          book.availableCopies -= 1;
          await book.save();
          return book._id;
        })
      );

      // Create rental record
      const rent = new rent({
        user: userId,
        books: rentedBooks,
        rentedAt: new Date(),
        returnDate: new Date(Date.now() + rentalDuration * 24 * 60 * 60 * 1000), // e.g., 7 days
        status: "ongoing",
      });

      await rent.save();
      res.json({ message: "Rental successful", rent });
    } catch (error) {
      res.status(500).json({ error: "Error processing rental", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
