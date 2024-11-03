document.addEventListener('DOMContentLoaded', () => {
  const accountInfoForm = document.getElementById('account-info-form');
  const changePasswordForm = document.getElementById('change-password-form');
  const billingInfoForm = document.getElementById('billing-info-form');
  const addAddressBtn = document.getElementById('add-address-btn');
  const addressesDiv = document.getElementById('addresses');
  const notificationPreferencesForm = document.getElementById('notification-preferences-form');
  const feedbackForm = document.getElementById('feedback-form');
  const verifyEmailBtn = document.getElementById('verify-email-btn');
  const addPaymentBtn = document.getElementById('add-payment-btn');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const verifyPhoneBtn = document.getElementById('verify-phone-btn');
  const referFriendsBtn = document.getElementById('refer-friends-btn');
  const manageSubscriptionsBtn = document.getElementById('manage-subscriptions-btn');

  // Handle account information update
  accountInfoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Implement account update logic here
    alert('Account information updated!');
  });

  //

  Handle password change
  changePasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Implement password change logic here
    alert('Password changed successfully!');
  });

  // Handle billing information update
  billingInfoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Implement billing info update logic here
    alert('Billing information updated!');
  });

  // Handle adding a new address
  addAddressBtn.addEventListener('click', () => {
    const newAddress = prompt('Enter new address:');
    if (newAddress) {
      const addressElem = document.createElement('div');
      addressElem.textContent = newAddress;
      addressesDiv.appendChild(addressElem);
    }
  });

  // Handle notification preferences update
  notificationPreferencesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Notification preferences updated!');
  });

  // Handle feedback submission
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Feedback submitted!');
  });

  // Verify email
  verifyEmailBtn.addEventListener('click', () => {
    alert('Verification email sent!');
  });

  // Add new payment method
  addPaymentBtn.addEventListener('click', () => {
    const newPaymentMethod = prompt('Enter new payment method details:');
    if (newPaymentMethod) {
      const paymentElem = document.createElement('div');
      paymentElem.textContent = newPaymentMethod;
      document.getElementById('payment-methods').appendChild(paymentElem);
    }
  });

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Verify phone number
  verifyPhoneBtn.addEventListener('click', () => {
    alert('Verification SMS sent!');
  });

  // Refer friends
  referFriendsBtn.addEventListener('click', () => {
    alert('Referral link sent!');
  });

  // Manage subscriptions
  manageSubscriptionsBtn.addEventListener('click', () => {
    alert('Manage your subscriptions here.');
  });

  // Load activity log (dummy data)
  loadActivityLog();

  function loadActivityLog() {
    const activityLog = document.getElementById('activity-log');
    const activities = [
            'Logged in on 2024-10-24',
            'Changed password on 2024-10-20',
            'Updated profile information on 2024-10-15'
        ];

    activities.forEach(activity => {
      const logEntry = document.createElement('div');
      logEntry.textContent = activity;
      activityLog.appendChild(logEntry);
    });
  }
});