import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import { logInfo, logError } from "./logging.js";

// sendEmail function is used to send an email with parameters from, to, subject, html

dotenv.config();

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});

const sendEmail = async (from, to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    logInfo("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    logError("Error sending email: %s", error);
  }
};

export default sendEmail;
