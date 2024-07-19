import cron from "node-cron"; // utility to run scheduled tasks
import { sentRecommendedBookEmail } from "./nodeMailer.js";

// Setting a schedule for mailing using node-cron
function scheduleNotificator() {
  cron.schedule(
    "0 9 * * 5",
    () => {
      // This is an example list of subscribers. Later the data will be taken from db
      const subscribers = ["zubatkinnoname@yandex.ru"];

      subscribers.forEach((subscriber) => {
        const subject = "Weekly books recommendations";
        // This is an example content. Later we will work out how recomendations are calculated
        const htmlContent = `<p>This is <b>individual recommendations content</b> for ${subscriber}:</p>`;

        sentRecommendedBookEmail(
          "Book recomendations app",
          subscriber,
          subject,
          htmlContent,
        );
      });
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleNotificator;
