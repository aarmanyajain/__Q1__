// Require the necessary modules
const express = require('express');
const nodemailer = require('nodemailer');

// Create an instance of Express
const app = express();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route for form submission
app.post('/send-email', (req, res) => {
  // Extract the form data from the request body
  const { name, email } = req.body;

  // Create a Nodemailer transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mca22.tembhare.grecy.rajesh@sunstone.edu.in',
      pass: 'sunstone835474',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'mca22.tembhare.grecy.rajesh@sunstone.edu.in',
    to: email,
    subject: 'Thank you for your contribution',
    text: `Thank you for your contribution, ${name}!`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
