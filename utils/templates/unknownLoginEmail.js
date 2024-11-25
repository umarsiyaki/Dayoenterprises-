const unknownLoginEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Security Alert: Unknown Login</title>
      <link rel="stylesheet" href="email.css">
    </head>
    <body>
      <header>
        <img src="logo.png" alt="Logo">
      </header>
      <main>
        <h1>Security Alert</h1>
        <p>Dear ${data.username},</p>
        <p>We've detected a login attempt from an unknown device:</p>
        <img src="alert.jpg" alt="Alert Image">
        <ul>
          <li>Device: ${data.deviceInfo}</li>
          <li>Location: ${data.location}</li>
          <li>Time: ${data.time}</li>
        </ul>
        <p>If this wasn't you, please change your password immediately.</p>
      </main>
      <footer>
        <p>Best regards,</p>
        <p>[Your Name/Company]</p>
      </footer>
    </body>
    </html>
  `;
};

module.exports = unknownLoginEmail;