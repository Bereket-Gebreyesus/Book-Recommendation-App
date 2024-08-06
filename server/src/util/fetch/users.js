import { logError } from "../logging.js";
import User from "../../models/User.js";
import { getBooksById } from "./books.js";

//get all the users who subscribed to weekly recommendations.

export const getSubscribers = async () => {
  try {
    return await User.find({ weeklyEmail: true });
  } catch (error) {
    logError("Couldn't fetch users data:", error);
    throw error;
  }
};

// get single users top "limit" tags.
export const getUsersTopTags = async (user, limit) => {
  const favoriteBooks = await getBooksById(user.favorites);

  const flattenedTags = favoriteBooks.flatMap((book) => book.tags);
  // Count each tag occurrence
  const tagCounts = flattenedTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  // Get the top n tags sorted by their count
  const topTags = Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, limit)
    .map(([tag]) => tag);

  return topTags;
};

// get all the subscribers top "limit" tags.
export const getAllSubscribersTopTags = async (limit) => {
  const subscribers = await getSubscribers();
  subscribers.forEach(async (subscriber) => {
    const topTags = await getUsersTopTags(subscriber, limit);
    logError(`Top tags for ${subscriber.email}: ${topTags}`);
  });
};

// get user by id
export const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    logError("Couldn't fetch user data:", error);
    throw error;
  }
};
