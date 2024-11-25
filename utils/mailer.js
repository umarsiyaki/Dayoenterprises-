
// utils/mailer.js
const nodemailer = require('nodemailer');
const { createTransport } = require('nodemailer');
const { mail } = require('nodemailer-mail');
const { createTestAccount } = require('nodemailer');

// Email configuration
const emailConfig = {
  host: '(link unavailable)',
  port: 587,
  secure: true, // or 'STARTTLS'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Create SMTP transporter with email configuration
const transporter = createTransport(emailConfig);

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function to validate email addresses
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Function to send email
const sendEmail = async (to, subject, template, data) => {
  try {
    // Validate recipient email address
    if (!validateEmail(to)) {
      throw new Error('Invalid recipient email address');
    }

    // Send email using transporter
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: template(data),
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Close transporter connection
transporter.on('end', () => {
  console.log('Transporter connection closed');
});

// Handle transporter errors
transporter.on('error', (error) => {
  console.error('Transporter error:', error);
});

module.exports = { sendEmail };



// utils/emailTemplates/confirmationEmail.js
const confirmationEmail = (data) => {
  return `
    <h2>Welcome, ${data.username}!</h2>
    <p>Please confirm your email address by clicking this link: <a href="${data.confirmationLink}">Confirm Email</a></p>
  `;
};
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configure Handlebars
const options = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve(__dirname, 'Templates'),
    layoutsDir: path.resolve(__dirname, 'Templates'),
  },
  viewPath: path.resolve(__dirname, 'Templates'),
};

transporter.use('compile', hbs(options));

// Send email
const sendEmail = async (to, subject, template, data) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    template,
    context: data,
  });
};

// Email templates
const emailTemplates = {
  registration: 'registration',
  login: 'login',
  passwordReset: 'passwordReset',
  orderConfirmation: 'orderConfirmation',
  orderUpdate: 'orderUpdate',
  newsletter: 'newsletter',
  newProduct: 'newProduct',
  profileUpdate: 'profileUpdate',
};

// Scenario-based email sending
const sendRegistrationEmail = async (to, data) => {
  await sendEmail(to, 'Registration Confirmation', emailTemplates.registration, data);
};

const sendLoginEmail = async (to, data) => {
  await sendEmail(to, 'Login Notification', emailTemplates.login, data);
};

const sendPasswordResetEmail = async (to, data) => {
  await sendEmail(to, 'Password Reset', emailTemplates.passwordReset, data);
};

const sendOrderConfirmationEmail = async (to, data) => {
  await sendEmail(to, 'Order Confirmation', emailTemplates.orderConfirmation, data);
};

const sendOrderUpdateEmail = async (to, data) => {
  await sendEmail(to, 'Order Update', emailTemplates.orderUpdate, data);
};

const sendNewsletterEmail = async (to, data) => {
  await sendEmail(to, 'Newsletter', emailTemplates.newsletter, data);
};

const sendNewProductEmail = async (to, data) => {
  await sendEmail(to, 'New Product Arrival', emailTemplates.newProduct, data);
};

const sendProfileUpdateEmail = async (to, data) => {
  await sendEmail(to, 'Profile Update', emailTemplates.profileUpdate, data);
};

module.exports = {
  sendRegistrationEmail,
  sendLoginEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendOrderUpdateEmail,
  sendNewsletterEmail,
  sendNewProductEmail,
  sendProfileUpdateEmail,
};
