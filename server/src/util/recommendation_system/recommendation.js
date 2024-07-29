import { logInfo, logError } from "../logging.js";
import { getBooksByTagSortedByRating } from "../fetch/books.js";
import { getUsersTopTags, getSubscribers } from "../fetch/users.js";
import generateEmailContent from "./emails/generateEmailContent.js";
import sendEmail from "./emails/sendEmail.js";
import { SUBJECT, FROM } from "./constants.js";

const recommendBooks = async (users, limit) => {
  for (const user of users) {
    const topTags = await getUsersTopTags(user, 5);
    for (const tag of topTags) {
      const books = await getBooksByTagSortedByRating(tag, limit);
      const emailContent = await generateEmailContent(books);
      try {
        logInfo(`Sending email to ${user.email}`);
        await sendEmail(FROM, user.email, SUBJECT, emailContent);
      } catch (error) {
        logError("Failed to send email", error);
      }
    }
  }
};

export const sendRecommendations = async (limit = 2) => {
  recommendBooks(await getSubscribers(), limit);
};
