const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const juice = require('juice');
const EventEmitter = require('events');
const winston = require('winston');
const schedule = require('node-schedule'); // For scheduling emails
const axios = require('axios'); // For making HTTP requests

// Email configuration
const emailConfig = {
  host: 'email.oladayo.com.ng',
  port: 587,
  secure: false,
  auth: {
    user: 'admin@oladayoenterprise.com.ng',
    pass: 'ADMIN123456789'
  },
};

const transporter = nodemailer.createTransport(emailConfig);
const emailEventEmitter = new EventEmitter();

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'email-log.txt' })
  ]
});

// Load and inline email template
const loadTemplate = (templateName, data) => {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');
  template = juice(template);
  return Object.keys(data).reduce((result, key) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    return result.replace(regex, data[key]);
  }, template);
};

// Store sent email locally
const storeEmailLocally = (emailData) => {
  const emailLogPath = path.join(__dirname, 'sent-emails.json');
  fs.readFile(emailLogPath, 'utf8', (err, data) => {
    let emails = [];
    if (!err) {
      emails = JSON.parse(data);
    }
    emails.push(emailData);
    fs.writeFile(emailLogPath, JSON.stringify(emails, null, 2), (writeErr) => {
      if (writeErr) {
        logger.error('Failed to save email locally:', writeErr.message);
      }
    });
  });
};

// Function to send standard email
const sendEmail = async (to, subject, body, userId) => {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to,
      subject,
      html: body,
    };
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
    console.log(`Email sent to ${to}`);

    // Store email data locally
    storeEmailLocally({ to, subject, body, userId, timestamp: new Date() });
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    throw new Error('Failed to send email.');
  }
};

// Retry mechanism for sending email
const sendEmailWithRetry = async (to, subject, body, userId, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sendEmail(to, subject, body, userId);
      return; // If successful, exit the loop
    } catch (error) {
      console.error(`Attempt ${i + 1} failed. Retrying...`);
      if (i === retries - 1) {
        throw error; // Rethrow after final attempt
      }
    }
  }
};

// Account Recovery Email
const sendRecoveryEmail = async (email, recoveryLink, userId) => {
  const body = loadTemplate('recovery-email', { recoveryLink });
  await sendEmailWithRetry(email, 'Password Recovery', body, userId);
};

// Sign-Up Confirmation Email
const sendSignUpConfirmation = async (email, confirmationLink, userId) => {
  const body = loadTemplate('signup-confirmation', { confirmationLink });
  await sendEmailWithRetry(email, 'Confirm Your Registration', body, userId);
};

// Login Notification Email
const sendLoginNotification = async (email, userId) => {
  const body = loadTemplate('login-notification', {});
  await sendEmailWithRetry(email, 'Login Notification', body, userId);
};

// Purchase Confirmation Email
const sendPurchaseConfirmation = async (email, orderDetails, userId) => {
  const body = loadTemplate('purchase-confirmation', { orderDetails });
  await sendEmailWithRetry(email, 'Purchase Confirmation', body, userId);
};

// Account Deletion Confirmation Email
const sendAccountDeletionConfirmation = async (email, userId) => {
  const body = loadTemplate('account-deletion', {});
  await sendEmailWithRetry(email, 'Account Deletion Confirmation', body, userId);
};

// Newsletter subscription
const subscribeToNewsletter = async (email) => {
  // Store subscription info to your database or file
  console.log(`Subscribed ${email} to the newsletter.`);
};

// Send newsletter
const sendNewsletter = async (subscribers, newsletterContent) => {
  for (const email of subscribers) {
    await sendEmailWithRetry(email, 'Our Latest Newsletter', newsletterContent);
  }
};

// Security alert
const sendSecurityAlert = async (email, alertDetails) => {
  const body = loadTemplate('security-alert', { alertDetails });
  await sendEmailWithRetry(email, 'Security Alert', body);
};

// Automated email response (e.g., welcome email)
const sendWelcomeEmail = async (email, userName, userId) => {
  const body = loadTemplate('welcome-email', { userName });
  await sendEmailWithRetry(email, 'Welcome to Our Platform!', body, userId);
};

// sending an automated response
const sendAutomatedEmail = async (email, subject, content, userId) => {
  const body = loadTemplate('automated-email', { content });
  await sendEmailWithRetry(email, subject, body, userId);
};

// Event listener for email notifications
emailEventEmitter.on('sendEmail', async (to, subject, body, userId) => {
  await sendEmailWithRetry(to, subject, body, userId);
});

module.exports = {
  sendEmail,
  sendRecoveryEmail,
  sendSignUpConfirmation,
  sendLoginNotification,
  sendPurchaseConfirmation,
  sendAccountDeletionConfirmation,
  sendWelcomeEmail,
  sendNewsletter,
  sendSecurityAlert,
  sendAutomatedEmail,
  subscribeToNewsletter,
  emailEventEmitter,
};
