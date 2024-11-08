import book from "@/models/book";
import connectToDatabase from "@/utils/dbConnect";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const {
      title,
      author,
      genre,
      publishedYear,
      description,
      totalCopies,
      availableCopies,
    } = req.body;

    try {
      const newBook = new book({
        title,
        author,
        genre,
        publishedYear,
        description,
        totalCopies,
        availableCopies,
      });

      await newBook.save();
      return res.status(201).json(newBook);
    } catch (error) {
      return res.status(500).json({ message: "Error creating book", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
