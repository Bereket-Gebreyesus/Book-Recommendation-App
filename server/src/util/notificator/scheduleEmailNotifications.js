import cron from "node-cron"; // utility to run scheduled tasks
import sendEmail from "../sendEmail.js";
import { logInfo, logError } from "../logging.js";

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
    async () => {
      for (const subscriber of subscribers) {
        try {
          await sendEmail(from, subscriber, subject, htmlContent);
          logInfo(`Email sent to ${subscriber}`);
        } catch (error) {
          logError("Failed to send email", error);
        }
      }
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleEmailNotifications;
