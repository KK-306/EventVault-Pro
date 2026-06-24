const nodemailer = require("nodemailer");

const sendEmail = async (
  email,
  subject,
  message
) => {
  try {
    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log("EMAIL PASS:", process.env.EMAIL_PASS);

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info.response);

  } catch (error) {
    console.log("EMAIL SEND ERROR:");
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;