const orderEmail = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Confirmation</title>
      <link rel="stylesheet" href="email.css">
    </head>
    <body>
      <header>
        <img src="logo.png" alt="Logo">
      </header>
      <main>
        <h1>Order Confirmation</h1>
        <p>Dear ${data.username},</p>
        <p>Thank you for your order (#${data.orderId}).</p>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          ${data.orderItems.map((item) => `
            <tr>
              <td><img src="${item.productImage}" alt="${item.productName}">${item.productName}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
            </tr>
          `).join('')}
        </table>
        <p>Total: $${data.orderTotal}</p>
        <p>Payment Method: ${data.paymentMethod}</p>
      </main>
      <footer>
        <p>Thank you for shopping with us!</p>
        <p>Contact us: support@example.com</p>
      </footer>
    </body>
    </html>
  `;
};

module.exports = orderEmail;