const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 8080;
app.use(
  cors({
    origin: "*", // Replace '*' with your domain for security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "infogoedu360@gmail.com",
    pass: "rxjp tesb xoac dein",
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, classes } = req.body;

  // Build email text dynamically based on provided fields
  const details = [
    name ? `Name   : ${name}` : null,
    phone ? `Mobile : ${phone}` : null,
    classes ? `Class  : ${classes}` : null,
    email ? `Email  : ${email}` : null,
  ]
    .filter(Boolean) // Remove `null` values
    .join("\n");

  const subject = `Enquiry from ${name || "Unknown User"}`;
  const text = `
    -------------------------
           User Details
    -------------------------
    ${details || "No details provided"}
    -------------------------
    `;

  const mailOptions = {
    from: "infogoedu360@gmail.com",
    to: "infogoedu360@gmail.com",
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Email not sent", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
