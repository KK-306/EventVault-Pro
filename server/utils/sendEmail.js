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
    console.log(
      "RESEND KEY EXISTS:",
      !!process.env.RESEND_API_KEY
    );

    console.log(
      "SENDING EMAIL TO:",
      email
    );

    const data =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject,
        text: message,
      });

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );

    console.log(
      "RESEND RESPONSE:"
    );

    console.log(
      JSON.stringify(
        data,
        null,
        2
      )
    );

    return data;

  } catch (error) {

    console.log(
      "EMAIL SEND ERROR"
    );

    console.log(
      JSON.stringify(
        error,
        null,
        2
      )
    );

    throw error;
  }
};

module.exports = sendEmail;