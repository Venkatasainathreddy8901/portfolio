require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // Convert string to boolean if necessary
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission: ${subject}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log specific error details
      return res.status(500).send('Something went wrong. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Message sent successfully!');
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
