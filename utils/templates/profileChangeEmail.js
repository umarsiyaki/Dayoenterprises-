const profileChangeEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Profile Update Notification</title>
      <link rel="stylesheet" href="email.css">
    </head>
    <body>
      <header>
        <img src="logo.png" alt="Logo">
      </header>
      <main>
        <h1>Profile Update</h1>
        <p>Dear ${data.username},</p>
        <p>Your profile information has been updated:</p>
        <img src="user.jpg" alt="User Image">
        <ul>
          <li>Field: ${data.fieldUpdated}</li>
          <li>New Value: ${data.newValue}</li>
        </ul>
        <p>If you didn't make these changes, please contact support.</p>
      </main>
      <footer>
        <p>Best regards,</p>
        <p>[Your Name/Company]</p>
        <p>Contact us: support@example.com</p>
      </footer>
    </body>
    </html>
  `;
};

module.exports = profileChangeEmail;