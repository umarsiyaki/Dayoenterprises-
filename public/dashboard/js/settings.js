const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Handle personal info form submission
app.post('/personal-info', (req, res) => {
  const { username, firstName, lastName, email, location, country, state, ninNumber, age, gender, profilePicture } = req.body;
  // Save data to database or file
  console.log(req.body);
  res.send('Personal info updated successfully!');
});

// Handle account settings form submission
app.post('/account-settings', (req, res) => {
  const { password, confirmPassword } = req.body;
  // Save data to database or file
  console.log(req.body);
  res.send('Account settings updated successfully!');
});

// Handle address form submission
app.post('/address', (req, res) => {
  const { addressLine1, addressLine2, city, postalCode } = req.body;
  // Save data to database or file
  console.log(req.body);
  res.send('Address updated successfully!');
});

export const themeOptions = [
  { id: 1, name: 'Light', className: 'light-theme' },
  { id: 2, name: 'Dark', className: 'dark-theme' },
];

export const socialMediaPlatforms = [
  { id: 1, name: 'Facebook', url: '(link unavailable)' },
  { id: 2, name: 'Twitter', url: '(link unavailable)' },
  { id: 3, name: 'LinkedIn', url: '(link unavailable)' },
];

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
Settings.js

// General settings
const settings = {
  theme: {
    currentTheme: 'light', // Default theme (light or dark)
    allowUserCustomization: true, // Allow users to switch between themes
    customThemeOptions: ['light', 'dark', 'blue', 'green'], // Available theme options
  },

  language: {
    defaultLanguage: 'en', // Default language
    supportedLanguages: ['en', 'es', 'fr', 'de', 'zh'], // Supported languages for localization
    autoDetect: true, // Automatically detect browser language
  },

  dateFormat: {
    defaultFormat: 'MM-DD-YYYY', // Default date format
    allowCustomFormat: true, // Allow users to set custom date format
    formatOptions: ['MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'], // Available format options
  },

  timezone: {
    defaultTimezone: 'UTC', // Default timezone
    allowUserSelection: true, // Allow users to select their own timezone
    supportedTimezones: ['UTC', 'PST', 'EST', 'CET', 'IST'], // Supported timezone options
  },

  notifications: {
    enabled: true, // Enable/disable notifications
    notificationTypes: ['email', 'SMS', 'push'], // Supported notification types
    dailyDigestEnabled: false, // Enable daily digest emails
    sendTestNotification: false, // Send test notifications for troubleshooting
  },

  currency: {
    defaultCurrency: 'USD', // Default currency for transactions
    allowCurrencySelection: true, // Allow users to select a different currency
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'JPY'], // List of supported currencies
  },

  security: {
    enforcePasswordStrength: true, // Enforce strong password policies
    passwordExpirationDays: 90, // Password expiration time in days
    enableTwoFactorAuthentication: false, // Enable two-factor authentication
    maxLoginAttempts: 5, // Maximum login attempts before lockout
    ipWhitelist: [], // List of whitelisted IP addresses
    enableCaptcha: true, // Enable CAPTCHA for login forms
    enableEmailVerification: true, // Require email verification for new users
  },

  session: {
    autoLogout: 30, // Auto-logout time in minutes
    sessionTimeout: 60, // Session timeout in minutes
    rememberUser: true, // Remember user login details
    allowSessionExtension: true, // Allow users to extend their session before timeout
  },

  userInterface: {
    showSidebar: true, // Display sidebar by default
    allowCustomThemes: true, // Allow users to choose custom themes
    defaultFontSize: 16, // Default font size for UI
    enableDarkMode: false, // Enable dark mode by default
    showBreadcrumbs: true, // Show breadcrumbs in navigation
    compactLayout: false, // Enable compact layout for smaller screens
    allowAccessibilityOptions: true, // Enable accessibility options (high contrast, text-to-speech)
  },

  backupAndData: {
    autoSaveInterval: 10, // Auto-save data every 10 minutes
    enableDataExport: true, // Allow users to export their data
    backupFrequency: 'daily', // Backup frequency for data (daily, weekly, monthly)
    dataRetentionPeriod: '1 year', // Period to retain user data
    enableGDPRCompliance: true, // Enable GDPR compliance features
    enableDataEncryption: true, // Encrypt sensitive user data
  },

  emailSettings: {
    emailVerificationRequired: true, // Require email verification for new users
    smtpServer: 'smtp.yourserver.com', // SMTP server for sending emails
    smtpPort: 587, // SMTP port number
    emailNotificationTypes: ['welcome', 'passwordReset', 'orderConfirmation'], // Types of email notifications
    emailSenderName: 'oladayo enterprises', // Default sender name for emails
    emailSenderAddress: 'no-reply@oladayoenterprises.com', // Default sender email address
    enableEmailLogging: true, // Log all outgoing email messages
  },

  performance: {
    enableLazyLoading: true, // Enable lazy loading for assets
    enableCache: true, // Enable caching for faster performance
    maxAPIRetries: 6, // Maximum retries for API calls before failure
    enableCompression: true, // Compress resources for faster loading
  },

  analytics: {
    enableAnalytics: true, // Enable analytics tracking
    trackingProvider: 'GoogleAnalytics', // Analytics provider
    anonymizeUserData: true, // Anonymize user data for privacy
    eventTrackingEnabled: true, // Track user events and interactions
  },

  socialMedia: {
    enableSocialLogins: true, // Enable social logins (Google, Facebook, etc.)
    supportedPlatforms: ['google', 'facebook', 'twitter'], // Supported social login platforms
    shareButtonsEnabled: true, // Enable social media share buttons
  },

  apiSettings: {
    enableAPI: true, // Enable external API access
    apiRateLimit: 1000, // API rate limit (requests per hour)
    apiVersion: 'v1.0', // API version
    enableWebhookSupport: true, // Enable support for webhooks
  },

  personalization: {
    allowUserProfiles: true, // Allow users to create custom profiles
    recommendBasedOnHistory: true, // Recommend items based on user history
    allowSavedPreferences: true, // Save user preferences for future sessions
    enableProductComparison: true, // Allow users to compare products
  },

  privacy: {
    enableDoNotTrack: true, // Enable "Do Not Track" functionality
    allowDataDownload: true, // Allow users to download their data
    allowDataDeletion: true, // Allow users to request deletion of their data
  },

  integration: {
    enablePaymentGateways: ['PayPal', 'Stripe'], // Supported payment gateways
    enableShippingIntegrations: ['DHL', 'FedEx'], // Shipping service integrations
    enableCRMIntegration: true, // Enable CRM system integration
  },

  search: {
    enableSearch: true, // Enable search functionality
    allowSearchSuggestions: true, // Show search suggestions as user types
    searchDebounceTime: 300, // Debounce time for search queries in milliseconds
    enableVoiceSearch: false, // Enable voice search option
  },

  debugging: {
    enableDebugMode: false, // Enable debug mode for troubleshooting
    logLevel: 'error', // Logging level (error, warn, info, debug)
    enableErrorReporting: true, // Report errors to an externalservice
    showDetailedErrors: false, // Show detailed error messages to users
  }
};

export default settings;


