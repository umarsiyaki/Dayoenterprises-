
const newsletterEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>[Your Company] Newsletter</title>
      <link rel="stylesheet" href="email.css">
    </head>
    <body>
      <header>
        <img src="logo.png" alt="Logo">
      </header>
      <main>
        <h1>Newsletter</h1>
        <p>Dear ${data.username},</p>
        <p>Stay up-to-date with our latest news and offers:</p>
        ${data.newsletterContent.map((item) => `
          <article>
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
            <p>${item.description}</p>
            <a href="${item.link}">Read more</a>
          </article>
        `).join('')}
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

module.exports = newsletterEmail;