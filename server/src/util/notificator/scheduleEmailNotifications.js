import cron from "node-cron"; // utility to run scheduled tasks
import sendEmail from "../sendEmail.js";

// Setting a schedule for mailing using node-cron
function scheduleEmailNotifications({
  scheduleTime,
  from,
  subscribers,
  subject,
  htmlContent,
}) {
  cron.schedule(
    scheduleTime,
    () => {
      subscribers.forEach((subscriber) => {
        sendEmail(from, subscriber, subject, htmlContent);
      });
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleEmailNotifications;
