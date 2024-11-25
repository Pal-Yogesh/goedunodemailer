const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use(cors({
  origin: '*', // Replace '*' with your domain for security
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'infogoedu360@gmail.com',
        pass: 'rxjp tesb xoac dein',
    },
});
app.post('/send-email', async (req, res) => {
    const { name, email, phone, classes } = req.body;
    let toEmail;
  
    const subject = `Enquiry from ${name}`;
    const text = `
    ---------------------------------
               User Details
    ---------------------------------
    Name   : ${name}
    Mobile : ${phone}
    Class  : ${classes}
    Email  : ${email}
    ---------------------------------
    `;
        // Define mail options for primary and default emails
    const primaryMailOptions = {
        from: 'infogoedu360@gmail.com',
        to: "infogoedu360@gmail.com",
        subject: subject,
        text: text,
    };

    try {
        // Send both emails concurrently
        await Promise.all([
            transporter.sendMail(primaryMailOptions),
        ]);
        console.log('Both emails sent successfully');
        res.status(200).send({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ success: false, message: 'Emails not sent', error });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});