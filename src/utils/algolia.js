// algolia.js
import { algoliasearch } from "algoliasearch";

// Replace with your actual Algolia App ID and API Key
const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX_NAME = "books";

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

// 1. Function to add or update a book in Algolia
export const syncToAlgolia = async (book) => {
  try {
    const algoliaBook = {
      objectID: book._id, // Algolia requires an `objectID` field for indexing
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      description: book.description,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
      isAvailable: book.availableCopies > 0,
      createdAt: book.createdAt,
    };

    await client.saveObject({
      indexName: ALGOLIA_INDEX_NAME,
      body: algoliaBook,
    });
    console.log("Book synced to Algolia successfully");
  } catch (error) {
    console.error("Error syncing book to Algolia:", error);
  }
};

// 2. Function to remove a book from Algolia
export const removeFromAlgolia = async (bookId) => {
  try {
    await client.deleteObject({
      indexName: ALGOLIA_INDEX_NAME,
      objectID: bookId,
    });
    console.log("Book removed from Algolia successfully");
  } catch (error) {
    console.error("Error removing book from Algolia:", error);
  }
};

// 3. Function to search books in Algolia
export const searchBooks = async (query) => {
  try {
    const result = await client.searchSingleIndex({
      indexName: ALGOLIA_INDEX_NAME,
      searchParams: { query },
    });
    return result.hits;
  } catch (error) {
    console.error("Error searching books in Algolia:", error);
    return [];
  }
};
