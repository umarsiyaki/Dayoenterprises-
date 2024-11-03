const socialMediaService = require('../services/socialMediaService');

const socialMediaController = {
  // Enable 2FA
  enableTwoFASocialMedia: async (req, res) => {
    const { userId, provider } = req.body;
    try {
      const result = await socialMediaService.enableTwoFA(userId, provider);
      res.status(200).json({ message: '2FA enabled successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to enable 2FA', details: error.message });
    }
  },

  // Verify 2FA token
  verifyTwoFATokenSocialMedia: async (req, res) => {
    const { userId, token } = req.body;
    try {
      const isValid = await socialMediaService.verifyTwoFAToken(userId, token);
      if (isValid) {
        res.status(200).json({ message: 'Token verified successfully' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Token verification failed', details: error.message });
    }
  },

  // Signup methods
  signupWithFacebook: async (req, res) => {
    const { accessToken } = req.body;
    try {
      const user = await socialMediaService.signupWithFacebook(accessToken);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },
  
  signupWithTwitter: async (req, res) => {
    const { oauthToken, oauthVerifier } = req.body;
    try {
      const user = await socialMediaService.signupWithTwitter(oauthToken, oauthVerifier);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },
  
  signupWithGoogle: async (req, res) => {
    const { idToken } = req.body;
    try {
      const user = await socialMediaService.signupWithGoogle(idToken);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },
  
  signupWithTelegram: async (req, res) => {
    const { telegramUserId } = req.body;
    try {
      const user = await socialMediaService.signupWithTelegram(telegramUserId);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },
  
  signupWithWhatsApp: async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const user = await socialMediaService.signupWithWhatsApp(phoneNumber);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },

  signupWithYouTube: async (req, res) => {
    const { accessToken } = req.body;
    try {
      const user = await socialMediaService.signupWithYouTube(accessToken);
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Signup failed', details: error.message });
    }
  },

  // Login methods
  loginWithFacebook: async (req, res) => {
    const { accessToken } = req.body;
    try {
      const user = await socialMediaService.loginWithFacebook(accessToken);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  loginWithTwitter: async (req, res) => {
    const { oauthToken, oauthVerifier } = req.body;
    try {
      const user = await socialMediaService.loginWithTwitter(oauthToken, oauthVerifier);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  loginWithGoogle: async (req, res) => {
    const { idToken } = req.body;
    try {
      const user = await socialMediaService.loginWithGoogle(idToken);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  loginWithTelegram: async (req, res) => {
    const { telegramUserId } = req.body;
    try {
      const user = await socialMediaService.loginWithTelegram(telegramUserId);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  loginWithWhatsApp: async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const user = await socialMediaService.loginWithWhatsApp(phoneNumber);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  loginWithYouTube: async (req, res) => {
    const { accessToken } = req.body;
    try {
      const user = await socialMediaService.loginWithYouTube(accessToken);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  },

  // Recovery methods
  recoverFacebookAccount: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await socialMediaService.recoverFacebookAccount(email);
      res.status(200).json({ message: 'Recovery email sent', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  recoverTwitterAccount: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await socialMediaService.recoverTwitterAccount(email);
      res.status(200).json({ message: 'Recovery email sent', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  recoverGoogleAccount: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await socialMediaService.recoverGoogleAccount(email);
      res.status(200).json({ message: 'Recovery email sent', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  recoverTelegramAccount: async (req, res) => {
    const { telegramUserId } = req.body;
    try {
      const result = await socialMediaService.recoverTelegramAccount(telegramUserId);
      res.status(200).json({ message: 'Recovery process initiated', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  recoverWhatsAppAccount: async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const result = await socialMediaService.recoverWhatsAppAccount(phoneNumber);
      res.status(200).json({ message: 'Recovery process initiated', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  recoverYouTubeAccount: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await socialMediaService.recoverYouTubeAccount(email);
      res.status(200).json({ message: 'Recovery email sent', result });
    } catch (error) {
      res.status(500).json({ error: 'Recovery failed', details: error.message });
    }
  },

  // Share methods
  shareProductOnFacebook: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnFacebook(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  shareProductOnTwitter: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnTwitter(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  shareProductOnGoogle: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnGoogle(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  shareProductOnTelegram: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnTelegram(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  shareProductOnWhatsApp: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnWhatsApp(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  shareProductOnYouTube: async (req, res) => {
    const { productId, message } = req.body;
    try {
      const result = await socialMediaService.shareProductOnYouTube(productId, message);
      res.status(200).json({ message: 'Product shared successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Sharing failed', details: error.message });
    }
  },

  // User Profile Management
  updateProfile: async (req, res) => {
    const { userId, profileData } = req.body;
    try {
      const updatedProfile = await socialMediaService.updateProfile(userId, profileData);
      res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error) {
      res.status(500).json({ error: 'Profile update failed', details: error.message });
    }
  },

  getProfile: async (req, res) => {
    const { userId } = req.params;
    try {
      const profile = await socialMediaService.getProfile(userId);
      res.status(200).json({ profile });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve profile', details: error.message });
    }
  },

  // Notifications
  getUserNotifications: async (req, res) => {
    const { userId } = req.params;
    try {
      const notifications = await socialMediaService.getUserNotifications(userId);
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve notifications', details: error.message });
    }
  },

  markNotificationAsRead: async (req, res) => {
    const { notificationId } = req.body;
    try {
      await socialMediaService.markNotificationAsRead(notificationId);
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark notification as read', details: error.message });
    }
  },

  // Activity Logging
  logUserActivity: async (req, res) => {
    const { userId, activity } = req.body;
    try {
      await socialMediaService.logUserActivity(userId, activity);
      res.status(200).json({ message: 'Activity logged successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log activity', details: error.message });
    }
  },

  // Analytics
  getUserAnalytics: async (req, res) => {
    const { userId } = req.params;
    try {
      const analytics = await socialMediaService.getUserAnalytics(userId);
      res.status(200).json({ analytics });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve analytics', details: error.message });
    }
  },

  // Referral System
  sendReferral: async (req, res) => {
    const { userId, referralData } = req.body;
    try {
      await socialMediaService.sendReferral(userId, referralData);
      res.status(200).json({ message: 'Referral sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send referral', details: error.message });
    }
  },

  getReferralStats: async (req, res) => {
    const { userId } = req.params;
    try {
      const stats = await socialMediaService.getReferralStats(userId);
      res.status(200).json({ stats });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve referral stats', details: error.message });
    }
  },
};

module.exports = socialMediaController;
