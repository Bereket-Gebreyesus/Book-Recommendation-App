import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import { logInfo, logError } from "../../logging.js";

// sendEmail function is used to send an email with parameters from, to, subject, html

dotenv.config();

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_APP_PASSWORD,
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
    logInfo("Message sent: ", info.messageId);
  } catch (error) {
    logError("Error sending email: ", error);
  }
};

export default sendEmail;
