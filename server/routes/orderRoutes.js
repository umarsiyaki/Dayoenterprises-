
const express = require('express');
const router = express.Router();
const db = require('../db');
const orderController = require('../controllers/orderController');
const express = require('express');
const {
  collectShippingInfo,
  selectShippingMethod,
  collectBillingInfo,
  processPayment,
  confirmOrder,
  sendOrderConfirmationEmail,
  trackOrderStatus,
  reviewOrder,
  oneClickCheckout,
  guestCheckout,
  saveShippingBillingInfo,
  breakdownCosts,
  editOrder,
  addOrderNotes,
  applyLoyaltyPoints,
} = require('../controllers/orderController');
const router = express.Router();

router.post('/shipping', collectShippingInfo);
router.post('/shipping-method', selectShippingMethod);
router.post('/billing', collectBillingInfo);
router.post('/payment', processPayment);
router.post('/confirm', confirmOrder);
router.post('/confirmation-email', sendOrderConfirmationEmail);
router.get('/track/:id', trackOrderStatus);
router.post('/review', reviewOrder);
router.post('/one-click', oneClickCheckout);
router.post('/guest-checkout', guestCheckout);
router.post('/save-info', saveShippingBillingInfo);
router.post('/breakdown-costs', breakdownCosts);
router.put('/edit-order', editOrder);
router.post('/add-notes', addOrderNotes);
router.post('/apply-loyalty', applyLoyaltyPoints);


router.get('/', orderController.getOrder);
router.post('/create', orderController.createOrder);

// Confirm order
router.post('/confirm', (req, res) => {
    const userId = req.session.userId;
    const { cartItems, totalAmount } = req.body;

    // Insert order
    const orderQuery = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
    db.query(orderQuery, [userId, totalAmount], (err, orderResults) => {
        if (err) throw err;

        const orderId = orderResults.insertId;

// Create an order
router.post('/', (req, res) => {
    const { userId, total } = req.body;
    db.run('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error creating order' });
        }
        res.status(201).json({ orderId: this.lastID });
    });
});

// Confirm an order
router.post('/confirm/:id', (req, res) => {
    const orderId = req.params.id;
    db.run('UPDATE orders SET status = ? WHERE id = ?', ['confirmed', orderId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error confirming order' });
        }
        res.json({ message: 'Order confirmed' });
    });
});

// Cancel an order
router.post('/cancel/:id', (req, res) => {
    const orderId = req.params.id;
    db.run('UPDATE orders SET status = ? WHERE id = ?', ['canceled', orderId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error canceling order' });
        }
        res.json({ message: 'Order canceled' });
    });
});

// Get order details
router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    db.all('SELECT order_items.*, products.name, products.price FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = ?', [orderId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching order details' });
        }
        res.json(rows);
    });
});

        // Insert order items
        const orderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?';
        const orderItemsData = cartItems.map(item => [orderId, item.productId, item.quantity]);

        db.query(orderItemsQuery, [orderItemsData], (err, orderItemsResults) => {
            if (err) throw err;

            // Clear cart after order confirmation
            const clearCartQuery = 'DELETE FROM cart WHERE user_id = ?';
            db.query(clearCartQuery, [userId], (err, clearCartResults) => {
                if (err) throw err;
                res.json({ message: 'Order confirmed and cart cleared' });
            });
        });
    });
});

module.exports = router;