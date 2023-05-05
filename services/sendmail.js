require("dotenv").config();
const nodemailer = require("nodemailer");


const SendMail = async (UserEmailId, template) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `Education Platform <${process.env.SMTP_USER}>`,
      to: [UserEmailId],
      subject: "Registered Successfully",
      html: template,
      attachDataUrls: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = SendMail;
