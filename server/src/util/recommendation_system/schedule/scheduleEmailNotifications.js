import cron from "node-cron";
import { logError } from "../../logging.js";
import { sendRecommendations } from "../recommendation.js";
import { SCHEDULE_TIME } from "../constants.js";

async function scheduleEmailNotifications() {
  cron.schedule(
    SCHEDULE_TIME,
    async () => {
      try {
        sendRecommendations(2);
      } catch (error) {
        logError("Failed to send email", error);
      }
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleEmailNotifications;
