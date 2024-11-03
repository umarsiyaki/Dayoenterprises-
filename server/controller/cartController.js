const db = require('../db/db');

const getCartItems = (req, res) => {
    db.all('SELECT * FROM cart', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(rows);
    });
};

const addToCart = (req, res) => {
    const { product_id, quantity } = req.body;
    db.run('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity], function (err) {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.status(201).json({ id: this.lastID, product_id, quantity });
    });
};

const updateCartItem = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json({ id, quantity });
    });
};

const removeFromCart = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.status(204).send();
    });
};

const db = require('../config/db');

// 1. Add multiple items to cart
exports.addMultipleItemsToCart = (req, res) => {
    const { userId, items } = req.body; // items is an array of { productId, quantity }
    const sql = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ? ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)';

    const values = items.map(item => [userId, item.productId, item.quantity]);
    db.query(sql, [values], (err) => {
        if (err) return res.status(500).json({ message: 'Error adding items to cart', error: err });
        res.status(201).json({ message: 'Items added to cart successfully' });
    });
};

// 2. Bulk update quantities
exports.bulkUpdateCartItems = (req, res) => {
    const { userId, items } = req.body; // items is an array of { productId, quantity }
    const sql = 'UPDATE cart_items SET quantity = CASE product_id ' + items.map(item => `WHEN product_id = ${item.productId} THEN ${item.quantity}`).join(' ') + ' END WHERE user_id = ? AND product_id IN (?)';

    db.query(sql, [userId, items.map(item => item.productId)], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating cart items', error: err });
        res.json({ message: 'Cart items updated successfully' });
    });
};

// 3. Display total price
exports.getCartTotalPrice = (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT SUM(cart_items.quantity * products.price) AS total FROM cart_items INNER JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error calculating total price', error: err });
        res.json({ total: results[0].total });
    });
};

// 4. Save items for later
exports.saveForLater = (req, res) => {
    const { userId, productId } = req.body;
    const sql = 'INSERT INTO saved_items (user_id, product_id) VALUES (?, ?)';

    db.query(sql, [userId, productId], (err) => {
        if (err) return res.status(500).json({ message: 'Error saving item for later', error: err });
        res.json({ message: 'Item saved for later successfully' });
    });
};

// 5. Fetch product recommendations (example)
exports.getProductRecommendations = (req, res) => {
    const userId = req.params.id; // Assuming userId is provided
    const sql = 'SELECT DISTINCT products.* FROM products INNER JOIN cart_items ON products.id = cart_items.product_id WHERE cart_items.user_id != ? LIMIT 5';

    db.query(sql, [userId], (err, recommendations) => {
        if (err) return res.status(500).json({ message: 'Error fetching recommendations', error: err });
        res.json(recommendations);
    });
};

// 6. Apply discount codes
exports.applyDiscountCode = (req, res) => {
    const { code } = req.body;
    const sql = 'SELECT * FROM discount_codes WHERE code = ?';

    db.query(sql, [code], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error applying discount code', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Discount code not found' });
        res.json({ discount: results[0].discount_percentage });
    });
};

// 7. Estimate shipping costs
exports.estimateShipping = (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT SUM(cart_items.quantity * products.price) AS total FROM cart_items INNER JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error estimating shipping costs', error: err });
        const shippingCost = results[0].total > 100 ? 0 : 10; // Free shipping for orders above $100
        res.json({ shippingCost });
    });
};

// 8. Calculate taxes dynamically (example rate of 7%)
exports.calculateTaxes = (req, res) => {
    const { totalPrice } = req.body;
    const taxRate = 0.07; // 7%
    const taxAmount = totalPrice * taxRate;
    res.json({ taxAmount });
};

// 9. Persist cart items for logged-in users
// This is done when adding/removing items; use userId to associate with database.

```

**Updated Order Controller (controllers/orderController.js)**

```javascript
// 10. Collect and validate shipping information
exports.collectShippingInfo = (req, res) => {
    const { userId, shippingDetails } = req.body;
    // Validate the shipping details here...
    res.json({ message: 'Shipping information collected', shippingDetails });
};

// 11. Allow users to select shipping methods (example)
exports.selectShippingMethod = (req, res) => {
    const { method } = req.body; // Example: 'Standard', 'Express'
    res.json({ message: 'Shipping method selected', method });
};

// 12. Collect billing information
exports.collectBillingInfo = (req, res) => {
    const { billingDetails } = req.body;
    // Validate billing details...
    res.json({ message: 'Billing information collected', billingDetails });
};

// 13. Integrate payment processing (example with a placeholder)
exports.processPayment = (req, res) => {
    const { amount } = req.body;
    // Here you would integrate with a payment processing service...
    res.json({ message: 'Payment processed successfully', amount });
};

// 14. Confirmation page before finalizing the order (simplified)
exports.confirmOrder = (req, res) => {
    const orderDetails = req.body; // Grab order details
    res.json({ message: 'Please confirm your order', orderDetails });
};

// 15. Send email confirmations after successful orders (using nodemailer or similar)
exports.sendOrderConfirmationEmail = (req, res) => {
    const { email, orderDetails } = req.body;
    // Use nodemailer to send the email
    res.json({ message: 'Order confirmation email sent', orderDetails });
};

// 16. Track order status and history for users
exports.trackOrderStatus = (req, res) => {
    const userId = req.params.id; // Get userId
    const sql = 'SELECT * FROM orders WHERE user_id = ?';

    db.query(sql, [userId], (err, orders) => {
        if (err) return res.status(500).json({ message: 'Error retrieving orders', error: err });
        res.json(orders);
    });
};

// 17. Allow users to review their orders

 before checkout
exports.reviewOrder = (req, res) => {
    const orderDetails = req.body; // Order details from the request
    res.json({ message: 'Review your order', orderDetails });
};

// 18. Implement one-click checkout (simplified example)
exports.oneClickCheckout = (req, res) => {
    const userId = req.params.id; // User ID
    // Logic to fetch saved payment/billing details and process the order...
    res.json({ message: 'One-click checkout successful' });
};

// 19. Handle guest checkout (no account needed)
exports.guestCheckout = (req, res) => {
    const guestDetails = req.body; // Guest details
    // Process order without user account
    res.json({ message: 'Guest checkout successful' });
};

// 20. Save shipping and billing info for future use (example)
exports.saveShippingBillingInfo = (req, res) => {
    const { userId, shippingDetails, billingDetails } = req.body;
    // Save the info to the database
    res.json({ message: 'Shipping and billing information saved', shippingDetails, billingDetails });
};

// 21. Breakdown of costs
exports.breakdownCosts = (req, res) => {
    const { items } = req.body; // Items with prices
    const totalCost = items.reduce((total, item) => total + item.price * item.quantity, 0);
    res.json({ totalCost });
};

// 22. Enable order editing before final confirmation
exports.editOrder = (req, res) => {
    const { orderId, updatedDetails } = req.body;
    // Logic to update order details in the database...
    res.json({ message: 'Order updated successfully', updatedDetails });
};

// 23. Allow users to leave notes or instructions for their order
exports.addOrderNotes = (req, res) => {
    const { orderId, notes } = req.body;
    // Save the notes in the database associated with the order
    res.json({ message: 'Order notes added successfully', notes });
};

// 24. Integrate loyalty points (simplified)
exports.applyLoyaltyPoints = (req, res) => {
    const { userId, points } = req.body;
    // Logic to apply loyalty points
    res.json({ message: 'Loyalty points applied', points });
};

module.exports = { getCartItems, addToCart, updateCartItem, removeFromCart };
