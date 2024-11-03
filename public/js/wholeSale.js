const express = require('express');
const router = express.Router();
const { ensureRole } = require('../middleware/authMiddleware');

// Wholesale Smoothie Orders
router.post('/wholesale-order', ensureRole('wholesaler'), async (req, res) => {
  const { smoothieType, quantity, wholesalePrice } = req.body;

  // Assuming you have a Smoothie order model in SQL
  try {
    await db.execute(
      'INSERT INTO WholesaleOrders (smoothieType, quantity, wholesalePrice, wholesalerId) VALUES (?, ?, ?, ?)',
      [smoothieType, quantity, wholesalePrice, req.user.id]
    );
    res.status(200).send('Order placed successfully');
  } catch (error) {
    res.status(500).send('Error placing order');
  }
});

module.exports = router;