const newProductEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>New Arrival: ${data.productName}</title>
      <link rel="stylesheet" href="email.css">
    </head>
    <body>
      <header>
        <img src="logo.png" alt="Logo">
      </header>
      <main>
        <h1>New Arrival</h1>
        <p>Dear ${data.username},</p>
        <p>We're excited to introduce our latest product:</p>
        <article>
          <h2>${data.productName}</h2>
          <img src="${data.productImage}" alt="${data.productName}">
          <p>${data.productDescription}</p>
          <p>Price: $${data.productPrice}</p>
          <a href="${data.productLink}">Shop now</a>
        </article>
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

module.exports = newProductEmail;