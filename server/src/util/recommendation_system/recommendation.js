import { logInfo, logError } from "../logging.js";
import { getBooksByTagSortedByRating } from "../fetch/books.js";
import { getUsersTopTags, getSubscribers } from "../fetch/users.js";
import generateEmailContent from "./emails/generateEmailContent.js";
import sendEmail from "./emails/sendEmail.js";
import { SUBJECT, FROM } from "./constants.js";

const recommendBooks = async (users, limit) => {
  try {
    for (const user of users) {
      const topTags = await getUsersTopTags(user, 5);
      const books = [];
      for (const tag of topTags) {
        await getBooksByTagSortedByRating(tag, limit).then((data) => {
          books.unshift(...data);
        });
      }
      const emailContent = await generateEmailContent(books);
      try {
        await sendEmail(FROM, user.email, SUBJECT, emailContent);
      } catch (error) {
        logError(`Failed to send email: ${error} `);
      }
    }
  } catch (error) {
    logError(`Failed to recommend books: ${error}`);
  } finally {
    logInfo(`recommendation emails have been sent to ${users.length} users`);
  }
};

export const sendRecommendations = async (limit = 2) => {
  recommendBooks(await getSubscribers(), limit);
};
