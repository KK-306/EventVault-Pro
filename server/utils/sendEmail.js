const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async (
  email,
  subject,
  message
) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject,
      text: message,
    });

    console.log("EMAIL SENT");
    console.log(data);
  } catch (error) {
    console.log("EMAIL SEND ERROR");
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;