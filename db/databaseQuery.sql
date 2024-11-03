
*User Queries*

-- Register User:

INSERT INTO users (username, email, password, role) 
VALUES (?, ?, ?, ?);


-- Login User:

SELECT * FROM users 
WHERE email = ? AND password = ?;


-- Get User by ID:

SELECT * FROM users 
WHERE id = ?;


-- Update User Profile:

UPDATE users 
SET username = ?, email = ?, profile_picture = ? 
WHERE id = ?;


-- Change Password:

UPDATE users 
SET password = ? 
WHERE id = ? AND old_password = ?;


*Product Queries*

-- Add Product:

INSERT INTO products (name, price, category_id, quantity, image, description) 
VALUES (?, ?, ?, ?, ?, ?);


-- Get Products by Category:

SELECT * FROM products 
WHERE category_id = ?;


-- Get Product by ID:

SELECT * FROM products 
WHERE id = ?;


-- Update Product:

UPDATE products 
SET name = ?, price = ?, quantity = ?, image = ?, description = ? 
WHERE id = ?;


-- Delete Product:

DELETE FROM products 
WHERE id = ?;


*Order Queries*

-- Place Order:

INSERT INTO orders (user_id, total, shipping_address, payment_method) 
VALUES (?, ?, ?, ?);


-- Get Orders by User:

SELECT * FROM orders 
WHERE user_id = ?;


-- Get Order by ID:

SELECT * FROM orders 
WHERE id = ?;


-- Update Order Status:

UPDATE orders 
SET status = ? 
WHERE id = ?;


-- Cancel Order:

UPDATE orders 
SET status = 'canceled' 
WHERE id = ?;


*Cart Queries*

-- Add to Cart:

INSERT INTO cart (user_id, product_id, quantity) 
VALUES (?, ?, ?);


-- Get Cart Items:

SELECT * FROM cart 
WHERE user_id = ?;


-- Update Cart Quantity:

UPDATE cart 
SET quantity = ? 
WHERE id = ?;


-- Remove from Cart:

DELETE FROM cart 
WHERE id = ?;


*Notification Queries*

-- Send Notification:

INSERT INTO notifications (user_id, message, type) 
VALUES (?, ?, ?);


-- Get Notifications:

SELECT * FROM notifications 
WHERE user_id = ?;


-- Mark as Read:

UPDATE notifications 
SET read = TRUE 
WHERE id = ?;


*Revenue Queries*

-- Track Revenue:

INSERT INTO revenue (total_revenue, date) 
VALUES (?, ?);


-- Get Daily Revenue:

SELECT * FROM revenue 
WHERE date = ?;


-- Get Monthly Revenue:

SELECT SUM(total_revenue) 
FROM revenue 
WHERE date BETWEEN ? AND ?;


*Cashier Performance Queries*

-- Track Performance:

INSERT INTO cashier_performance (cashier_id, total_sales, total_orders, date) 
VALUES (?, ?, ?, ?);


-- Get Daily Performance:

SELECT * FROM cashier_performance 
WHERE date = ? AND cashier_id = ?;


-- Get Monthly Performance:

SELECT SUM(total_sales), SUM(total_orders) 
FROM cashier_performance 
WHERE date BETWEEN ? AND ? AND cashier_id = ?;


_Activity Queries_

-- Log Activity:

INSERT INTO activities (user_id, activity_type, description) 
VALUES (?, ?, ?);


-- Get User Activities:

SELECT * FROM activities 
WHERE user_id = ?;


-- Get Activity by ID:

SELECT * FROM activities 
WHERE id = ?;


_Password Reset Queries_

-- Request Password Reset:

INSERT INTO password_resets (email, token) 
VALUES (?, ?);


-- Verify Password Reset Token:

SELECT * FROM password_resets 
WHERE token = ? AND email = ?;


-- Update Password:

UPDATE users 
SET password = ? 
WHERE email = ? AND id IN (SELECT id FROM password_resets WHERE token = ?);


_Message Queries_

-- Send Message:

INSERT INTO messages (sender_id, receiver_id, message) 
VALUES (?, ?, ?);


-- Get Messages:

SELECT * FROM messages 
WHERE sender_id = ? OR receiver_id = ?;


-- Get Conversation:

SELECT * FROM messages 
WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?);


_Receipt Queries_

-- Generate Receipt:

INSERT INTO receipts (order_id, receipt_text) 
VALUES (?, ?);


-- Get Receipt by Order:

SELECT * FROM receipts 
WHERE order_id = ?;


-- Get Receipt by ID:

SELECT * FROM receipts 
WHERE id = ?;


