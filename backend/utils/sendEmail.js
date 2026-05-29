import nodemailer from "nodemailer";

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    const info =
      await transporter.sendMail(
        mailOptions
      );

    return info;
  } catch (error) {
    console.error(
      "Send Email Error:",
      error
    );

    throw error;
  }
};

export default sendEmail;