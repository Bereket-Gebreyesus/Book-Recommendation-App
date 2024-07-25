import cron from "node-cron";

import sendEmail from "../sendEmail.js";
import fetchBooks from "../fetchBooks.js";
import generateEmailContent from "./generateEmailContent.js";
import { logInfo, logError } from "../logging.js";

async function scheduleEmailNotifications({
  scheduleTime,
  from,
  subscribers,
  subject,
}) {
  cron.schedule(
    scheduleTime,
    async () => {
      try {
        const books = await fetchBooks();
        const htmlContent = generateEmailContent(books);

        for (const subscriber of subscribers) {
          try {
            await sendEmail(from, subscriber, subject, htmlContent);
            logInfo(`Email sent to ${subscriber}`);
          } catch (error) {
            logError("Failed to send email", error);
          }
        }
      } catch (error) {
        logError("Failed to fetch books or generate email content", error);
      }
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleEmailNotifications;
