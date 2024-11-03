
const express = require('express');
const router = express.Router();
const { Sales, Customers } = require('./database');

router.get('/sales', async (req, res) => {
    const sales = await Sales.find();
    res.json(sales);
});

router.get('/customers', async (req, res) => {
    const customers = await Customers.find();
    res.json(customers);
});

   app.post('/api/change-password', (req, res) => {
const { userId, currentPassword, newPassword } = req.body;
// Logic to verify current password and update new password
res.send({ message: 'Password changed successfully!' });
});
   const multer = require('multer');
   const upload = multer({ dest: 'uploads/' });

   app.post('/api/upload-profile-pic', upload.single('profile-pic'), (req, res) => {
       const userId = req.body.userId;
       // Logic to save uploaded file path to user account
       res.send({ message: 'Profile picture updated!' });
   });
   app.delete('/api/delete-account/:userId', (req, res) => {
const userId = req.params.userId;
// Logic to delete user account
res.send({ message: 'Account deleted successfully!' });
});
app.post('/api/verify-email', (req, res) => {
const { email } = req.body;
// Logic to send verification email
res.send({ message: 'Verification email sent!' });
});
app.post('/api/setup-2fa', (req, res) => {
const { userId } = req.body;
// Logic to setup 2FA for user
res.send({ message: 'Two-factor authentication enabled!' });
});
app.post('/api/notification-preferences', (req, res) => {
const { userId, preferences } = req.body;
// Logic to update notification preferences in user profile
res.send({ message: 'Notification preferences updated!' });
});
app.post('/api/addresses', (req, res) => {
const { userId, address } = req.body;
// Logic to save new address
res.send({ message: 'Address added successfully!' });
});

app.delete('/api/addresses/:addressId', (req, res) => {
const addressId = req.params.addressId;
// Logic to delete specified address
res.send({ message: 'Address deleted successfully!' });
});

   app.get('/api/activity-log/:userId', (req, res) => {
       const userId = req.params.userId;
       // Logic to retrieve user activity log
       res.send({ activities: ['Logged in', 'Updated profile'] });
   });

  
   app.post('/api/payment-methods', (req, res) => {
       const { userId, paymentMethod } = req.body;
       // Logic to save new payment method
       res.send({ message: 'Payment method added successfully!' });
   });

   app.delete('/api/payment-methods/:methodId', (req, res) => {
       const methodId = req.params.methodId;
       // Logic to delete specified payment method
       res.send({ message: 'Payment method deleted successfully!' });
   });
    app.get('/api/last-login/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to retrieve last login information
        res.send({ lastLogin: '2024-10-20 14:35' });
    });

    app.get('/api/export-data/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to gather account data for export
        res.download('path/to/data/file'); // Replace with actual file path
    });

    app.post('/api/refer-friends', (req, res) => {
        const { userId, friendEmail } = req.body;
        // Logic to send referral link
        res.send({ message: 'Referral link sent!' });
    });

    app.get('/api/manage-subscriptions/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to retrieve user subscriptions
        res.send({ subscriptions: ['Newsletter', 'Promotions'] });
    });

    app.post('/api/feedback', (req, res) => {
        const { userId, feedback } = req.body;
        // Logic to store feedback
        res.send({ message: 'Feedback submitted!' });
    });
module.exports = router;