
const express = require('express');
const router = express.Router();
const db = require('../db');
// Add product to cart
router.post('/add', (req, res) => {
    const { productId } = req.body;
    const userId = req.session.userId; // Assuming the user is logged in

    const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1';
    db.query(query, [userId, productId], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Product added to cart' });
    });
});

const {
    addMultipleItemsToCart,
    bulkUpdateCartItems,
    getCartTotalPrice,
    saveForLater,
    getProductRecommendations,
    applyDiscountCode,
    estimateShipping,
    calculateTaxes,
} = require('../controllers/cartController');
const router = express.Router();

router.post('/add-multiple', addMultipleItemsToCart);
router.put('/bulk-update', bulkUpdateCartItems);
router.get('/total/:id', getCartTotalPrice);
router.post('/save-for-later', saveForLater);
router.get('/recommendations/:id', getProductRecommendations);
router.post('/apply-discount', applyDiscountCode);
router.get('/estimate-shipping/:userId', estimateShipping);
router.post('/calculate-taxes', calculateTaxes);


// Fetch cart items for the user
router.get('/items', (req, res) => {
    const userId = req.session.userId;

    const query = 'SELECT c.id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
