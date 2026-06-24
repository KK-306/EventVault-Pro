const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (
  email,
  subject,
  message
) => {
  try {
    const client =
      SibApiV3Sdk.ApiClient.instance;

    const apiKey =
      client.authentications["api-key"];

    apiKey.apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    const result =
      await apiInstance.sendTransacEmail({
        sender: {
          email:
            "kartikkarnwal11@gmail.com",
          name: "EventVault Pro",
        },
        to: [
          {
            email,
          },
        ],
        subject,
        textContent: message,
      });

    console.log(
      "BREVO EMAIL SENT"
    );
    console.log(result);

  } catch (error) {
    console.log(
      "BREVO EMAIL ERROR"
    );
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;