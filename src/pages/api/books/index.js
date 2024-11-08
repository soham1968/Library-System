// pages/api/books/index.js

import book from "@/models/book";
import connectToDatabase from "@/utils/dbConnect";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const books = await book.find({});
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
