const express = require('express');
const socialMediaController = require('../controllers/socialMediaController');
const router = express.Router();

const socialMediaRoutes = () => {
  // Enable 2FA for social media accounts
  router.post('/enable-2fa', socialMediaController.enableTwoFASocialMedia);
  
  // Verify 2FA token for social media accounts
  router.post('/verify-2fa-token', socialMediaController.verifyTwoFATokenSocialMedia);
  
  // Sign up with social media
  router.post('/signup/facebook', socialMediaController.signupWithFacebook);
  router.post('/signup/twitter', socialMediaController.signupWithTwitter);
  router.post('/signup/google', socialMediaController.signupWithGoogle);
  router.post('/signup/telegram', socialMediaController.signupWithTelegram);
  router.post('/signup/whatsapp', socialMediaController.signupWithWhatsApp);
  router.post('/signup/youtube', socialMediaController.signupWithYouTube);
  
  // Login with social media
  router.post('/login/facebook', socialMediaController.loginWithFacebook);
  router.post('/login/twitter', socialMediaController.loginWithTwitter);
  router.post('/login/google', socialMediaController.loginWithGoogle);
  router.post('/login/telegram', socialMediaController.loginWithTelegram);
  router.post('/login/whatsapp', socialMediaController.loginWithWhatsApp);
  router.post('/login/youtube', socialMediaController.loginWithYouTube);
  
  // Password recovery for social media accounts
  router.post('/recover/facebook', socialMediaController.recoverFacebookAccount);
  router.post('/recover/twitter', socialMediaController.recoverTwitterAccount);
  router.post('/recover/google', socialMediaController.recoverGoogleAccount);
  router.post('/recover/telegram', socialMediaController.recoverTelegramAccount);
  router.post('/recover/whatsapp', socialMediaController.recoverWhatsAppAccount);
  router.post('/recover/youtube', socialMediaController.recoverYouTubeAccount);
  
  // Share products on social media
  router.post('/share/facebook', socialMediaController.shareProductOnFacebook);
  router.post('/share/twitter', socialMediaController.shareProductOnTwitter);
  router.post('/share/google', socialMediaController.shareProductOnGoogle);
  router.post('/share/telegram', socialMediaController.shareProductOnTelegram);
  router.post('/share/whatsapp', socialMediaController.shareProductOnWhatsApp);
  router.post('/share/youtube', socialMediaController.shareProductOnYouTube);
  
  // Update user profile on social media
  router.post('/update-profile/facebook', socialMediaController.updateProfileOnFacebook);
  router.post('/update-profile/twitter', socialMediaController.updateProfileOnTwitter);
  router.post('/update-profile/google', socialMediaController.updateProfileOnGoogle);
  
  // Log user activities
  router.post('/log-activity', socialMediaController.logUserActivity);
  
  // Notifications for user
  router.post('/notifications', socialMediaController.getUserNotifications);
  
  // Referral system
  router.post('/refer', socialMediaController.referProduct);
  
  // Get analytics for user shares
  router.get('/analytics/shares', socialMediaController.getShareAnalytics);
  
  // User-generated content submission
  router.post('/submit-review', socialMediaController.submitUserReview);
  
  return router;
};

module.exports = socialMediaRoutes();
