const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: "*", // Replace '*' with specific domains for production
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
  const { name, email, phone, classes, source } = req.body; 

  // Build email text dynamically based on provided fields
  const details = [
    name ? `Name   : ${name}` : null,
    phone ? `Mobile : ${phone}` : null,
    classes ? `Class  : ${classes}` : null,
    email ? `Email  : ${email}` : null,
    source ? `Source : ${source}` : null, 
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `Enquiry from ${name || "Unknown User"} - [${source || "Unknown Source"}]`;
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
