const axios = require('axios');
const winston = require('winston');
const rateLimit = require('express-rate-limit');

// Configure winston for logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'recaptcha-log.txt' }),
    new winston.transports.Console()
  ]
});

// ReCAPTCHA configuration
const recaptchaConfig = {
  siteKey: 'your-recaptcha-site-key', // Replace with your site key
  secretKey: 'your-recaptcha-secret-key', // Replace with your secret key
  serviceUrl: 'https://www.google.com/recaptcha/api/siteverify', // Default for Google reCAPTCHA
  version: 'v2' // Default version (v2 or v3)
};

// Rate limiting for ReCAPTCHA verification
const recaptchaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Verify the ReCAPTCHA response
const recaptchaVerify = async (req) => {
  const response = req.body.recaptchaResponse;

  if (!response) {
    logger.warn('ReCAPTCHA response is missing in the request');
    throw new Error('ReCAPTCHA response is required');
  }

  try {
    const verificationResponse = await axios.post(recaptchaConfig.serviceUrl, null, {
      params: {
        secret: recaptchaConfig.secretKey,
        response: response,
      },
    });

    // Log the response from Google
    logger.info('ReCAPTCHA verification response', verificationResponse.data);

    // Handling for reCAPTCHA v3 score
    if (recaptchaConfig.version === 'v3') {
      if (verificationResponse.data.success) {
        return { success: true, score: verificationResponse.data.score };
      }
    } else {
      // For reCAPTCHA v2
      if (verificationResponse.data.success) {
        return { success: true };
      }
    }

    logger.warn('ReCAPTCHA verification failed', verificationResponse.data['error-codes']);
    return { success: false, errorCodes: verificationResponse.data['error-codes'] };
  } catch (error) {
    logger.error('Error during ReCAPTCHA verification', error);
    throw new Error('ReCAPTCHA verification failed');
  }
};

// Middleware for verifying ReCAPTCHA in express
const recaptchaMiddleware = async (req, res, next) => {
  try {
    const verificationResult = await recaptchaVerify(req);
    if (!verificationResult.success) {
      return res.status(403).send({
        message: 'ReCAPTCHA verification failed',
        errorCodes: verificationResult.errorCodes
      });
    }
    next(); // Proceed if verification is successful
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Middleware to apply rate limiting for ReCAPTCHA
const applyRecaptchaRateLimit = (req, res, next) => {
  recaptchaLimiter(req, res, next);
};

// Export the recaptcha verification function and middleware
module.exports = {
  recaptchaVerify,
  recaptchaMiddleware,
  applyRecaptchaRateLimit,
};

const express = require('express');
const { recaptchaMiddleware, applyRecaptchaRateLimit } = require('./config/recaptcha');

const app = express();

app.use(express.json()); // Parse JSON bodies

app.post('/login', applyRecaptchaRateLimit, recaptchaMiddleware, async (req, res) => {
  // Handle login logic here
  res.send('Login successful');
});

app.post('/signup', applyRecaptchaRateLimit, recaptchaMiddleware, async (req, res) => {
  // Handle signup logic here
  res.send('Signup successful');
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on
 port ${PORT}`);
});