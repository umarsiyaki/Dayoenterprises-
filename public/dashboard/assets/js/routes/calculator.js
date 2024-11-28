const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Assuming your database connection is here

// Route to save products
router.post('/saveProducts', (req, res) => {
  const products = req.body;

  // Construct query
  const query = `INSERT INTO products (product_name, quantity, price, discount, total)
                   VALUES ?`;

  const values = products.map(product => [
        product.productName,
        product.quantity,
        product.price,
        product.discount,
        product.total
    ]);

  // Execute SQL query
  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting products:', err);
      return res.status(500).json({ error: 'Failed to save products' });
    }
    res.json({ success: true, message: 'Products saved successfully' });
  });
});
// Route to fetch products from the database
router.get('/fetchProducts', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});
module.exports = router;