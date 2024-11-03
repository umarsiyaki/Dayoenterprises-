
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const twilio = require('twilio');
const db = require('../db');
const { hashPassword, comparePassword } = require('./password');

const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const [user] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
  try {
    const [user] = await db.execute('SELECT * FROM Users WHERE googleId = ?', [profile.id]);
    if (!user) {
      const newUser = await db.execute(
        'INSERT INTO Users (googleId, username, role) VALUES (?, ?, ?)',
        [profile.id, profile.displayName, 'customer']
      );
      return done(null, newUser);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
}, async (token, tokenSecret, profile, done) => {
  try {
    const [user] = await db.execute('SELECT * FROM Users WHERE facebookId = ?', [profile.id]);
    if (!user) {
      const newUser = await db.execute(
        'INSERT INTO Users (facebookId, username, role) VALUES (?, ?, ?)',
        [profile.id, profile.displayName, 'customer']
      );
      return done(null, newUser);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// WhatsApp OTP (via Twilio)
const sendWhatsAppOTP = async (phoneNumber) => {
  const service = await twilioClient.verify.services.create({ friendlyName: 'Smoothie OTP Service' });
  return twilioClient.verify.services(service.sid)
    .verifications
    .create({ to: `whatsapp:${phoneNumber}`, channel: 'sms' });
};

const verifyWhatsAppOTP = async (phoneNumber, code) => {
  return twilioClient.verify.services(service.sid)
    .verificationChecks
    .create({ to: `whatsapp:${phoneNumber}`, code });
};

// Serialize and Deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = {
  passport,
  sendWhatsAppOTP,
  verifyWhatsAppOTP,
};
