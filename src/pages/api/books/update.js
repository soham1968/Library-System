// pages/api/books/update.js

import book from "@/models/book";
import connectToDatabase from "@/utils/dbConnect";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "PUT") {
    const {
      id,
      title,
      author,
      genre,
      publishedYear,
      description,
      totalCopies,
      availableCopies,
    } = req.body;

    try {
      const updatedBook = await book.findByIdAndUpdate(
        id,
        {
          title,
          author,
          genre,
          publishedYear,
          description,
          totalCopies,
          availableCopies,
        },
        { new: true }
      );

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json(updatedBook);
    } catch (error) {
      return res.status(500).json({ message: "Error updating book", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
