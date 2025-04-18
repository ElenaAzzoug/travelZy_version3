// services/emailService.js
const nodemailer = require("nodemailer");
// require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true si port = 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Erreur de connexion SMTP :", error);
  } else {
    console.log("Transporteur email prêt à envoyer !");
  }
});

module.exports = transporter;
