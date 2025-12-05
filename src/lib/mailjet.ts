import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!,
);

export async function sendEmail({
  to,
  name,
  subject,
  html,
}: {
  to: string;
  name: string;
  subject: string;
  html: string;
}) {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "samuel.oliveira.developer@gmail.com",
            Name: "Samuel - Help Desk",
          },
          To: [
            {
              Email: to,
              Name: name,
            },
          ],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    });
    return request.body;
  } catch (error) {
    console.log("Mailjet error: ", error);
    throw error;
  }
}
