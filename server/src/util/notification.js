import nodemailer from "nodemailer"; // library for sending emails
import cron from "node-cron"; // utility to run scheduled tasks
import dotenv from "dotenv";
import { logInfo, logError } from "./logging.js";

dotenv.config();

//! Creating transporter for sending mail using nodemailer (just to test how notification works)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//! Sending emails using nodemailer (just to test how notification works)
async function sendEmail(subscriberEmail, subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      to: subscriberEmail,
      subject: subject,
      html: htmlContent,
    });

    logInfo("Email sent: " + info.response);
  } catch (err) {
    logError("Error sending email:", err);
  }
}

// Setting a schedule for mailing using node-cron
function scheduleNotificator() {
  cron.schedule(
    "32 14 * * 4",
    () => {
      // This is an example list of subscribers. Later the data will be taken from db
      const subscribers = ["zubatkinnoname@yandex.ru"];

      subscribers.forEach((subscriber) => {
        const subject = "Weekly books recommendations";
        // This is an example content. Later we will work out how recomendations are calculated
        const htmlContent = `<p>This is <b>individual recommendations content</b> for ${subscriber}:</p>`;

        sendEmail(subscriber, subject, htmlContent);
      });
    },
    {
      timezone: "Europe/Amsterdam",
    },
  );
}

export default scheduleNotificator;
