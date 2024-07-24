import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { logError } from "../logging.js";

dotenv.config();

// Fetches data about books
// (so far it takes data from 5 first books in database)
async function fetchBooks() {
  const uri = process.env.MONGODB_URL;

  let client;
  try {
    client = new MongoClient(uri, {});
    await client.connect();
    const db = client.db("book_recommendation");
    const books = await db
      .collection("books")
      .find()
      .skip(1) // the first book in our db has an indecent cover, so we skip it :)
      .limit(5)
      .toArray();

    await client.close();
    return books;
  } catch (error) {
    logError("Failed to fetch books:", error);
    if (client && client.topology.isConnected()) {
      await client.close();
    }
    throw error;
  }
}

export default fetchBooks;
