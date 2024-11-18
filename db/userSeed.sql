INSERT INTO users (username, email, password, role, profile_picture)
VALUES
('admin', 'admin@example.com', 'password123', 'admin', 'admin.jpg'),
('john_doe', 'john.doe@example.com', 'password123', 'user', 'john_doe.jpg'),
('jane_doe', 'jane.doe@example.com', 'password123', 'user', 'jane_doe.jpg'),
('cashier', 'cashier@example.com', 'password123', 'cashier', 'cashier.jpg');


--*Products Seed Data*


INSERT INTO products (name, description, price, quantity, category_id, brand, rating, image)
VALUES
('Apple iPhone 13', 'Latest iPhone model', 999.99, 10, 1, 'Apple', 4.5, 'iphone13.jpg'),
('Samsung Galaxy S22', 'Latest Samsung flagship', 899.99, 20, 1, 'Samsung', 4.2, 'galaxy_s22.jpg'),
('Nike Air Max 270', 'Popular running shoes', 129.99, 5, 2, 'Nike', 4.8, 'air_max_270.jpg'),
('Adidas Yeezy Boost 350', 'Fashionable sneakers', 199.99, 10, 2, 'Adidas', 4.6, 'yeezy_boost_350.jpg'),
('Canon EOS R5', 'Professional camera', 2499.99, 5, 3, 'Canon', 4.9, 'eos_r5.jpg');


--*Categories Seed Data*


INSERT INTO categories (name)
VALUES
('Electronics'),
('Fashion'),
('Photography');


--*Orders Seed Data*


INSERT INTO orders (user_id, total, status, payment_method, payment_status, shipping_address)
VALUES
(2, 999.99, 'pending', 'credit_card', 'pending', '123 Main St'),
(3, 129.99, 'pending', 'paypal', 'pending', '456 Elm St'),
(2, 199.99, 'pending', 'bank_transfer', 'pending', '789 Oak St');


--*Order Items Seed Data*


INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 999.99),
(2, 3, 1, 129.99),
(3, 4, 1, 199.99);


--*Reviews Seed Data*


INSERT INTO reviews (user_id, product_id, rating, review)
VALUES
(2, 1, 5, 'Excellent product!'),
(3, 3, 4, 'Good quality shoes'),
(2, 4, 5, 'Love these sneakers!');


--*Notifications Seed Data*


INSERT INTO notifications (user_id, message, type)
VALUES
(2, 'Your order has been placed!', 'info'),
(3, 'Your payment has been processed!', 'info'),
(2, 'Your order has been shipped!', 'info');

-- Products
INSERT INTO products (name, description, price, quantity) 
VALUES 
('Product 1', 'Description 1', 10.99, 10),
('Product 2', 'Description 2', 9.99, 20),
('Product 3', 'Description 3', 12.99, 5);

-- Orders
INSERT INTO orders (user_id, total, status) 
VALUES 
(1, 10.99, 'pending'),
(2, 9.99, 'pending'),
(3, 12.99, 'pending');

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES 
(1, 1, 1, 10.99),
(2, 2, 1, 9.99),
(3, 3, 1, 12.99);

-- Purchases
INSERT INTO purchases (buyer_id, product_number, quantity, total_price)
VALUES
(1, 'PROD001', 2, 100.00),
(2, 'PROD002', 1, 50.00),
(3, 'PROD003', 3, 200.00);

-- Shipments
INSERT INTO shipments (purchase_id, shipping_address, city)
VALUES
(1, '123 Main St', 'New York'),
(2, '456 Elm St', 'Los Angeles'),
(3, '789 Oak St', 'Chicago');

-- Emails
INSERT INTO emails (buyer_id, subject, body)
VALUES
(1, 'Order Confirmation', 'Thank you for your order!'),
(2, 'Shipping Update', 'Your order has been shipped!'),
(3, 'Promotion', 'Check out our latest deals!');

-- Presence
INSERT INTO presence (user_id, status)
VALUES
(1, 'active'),
(2, 'away'),
(3, 'offline');

-- Messages
INSERT INTO messages (sender_id, recipient_id, content)
VALUES
(1, 2, 'Hello!'),
(2, 1, 'Hi!'),
(3, 1, 'How are you?');

-- Spam
INSERT INTO spam (user_id, message_id)
VALUES
(1, 3);

-- Receipts
INSERT INTO receipts (order_id, receipt_text)
VALUES
(1, 'Thank you for your payment!'),
(2, 'Payment received!'),
(3, 'Payment failed!');

-- Cashier Performance
INSERT INTO cashier_performance (cashier_id, total_sales, total_orders, date)
VALUES
(1, 1000.00, 10, '2022-01-01'),
(2, 500.00, 5, '2022-01-02'),
(3, 2000.00, 20, '2022-01-03');

-- Revenue
INSERT INTO revenue (total_revenue, date)
VALUES
(3000.00, '2022-01-01'),
(2500.00, '2022-01-02'),
(4000.00, '2022-01-03');

-- Password Resets
INSERT INTO password_resets (email, token)
VALUES
('user1@example.com', 'token1'),
('user2@example.com', 'token2'),
('user3@example.com', 'token3');

-- Wishlist
INSERT INTO wishlists (buyer_id, product_number)
VALUES
(1, 'PROD004'),
(2, 'PROD005'),
(3, 'PROD006');

-- Comparisons
INSERT INTO comparisons (buyer_id, product_number_1, product_number_2)
VALUES
(1, 'PROD001', 'PROD002'),
(2, 'PROD003', 'PROD004'),
(3, 'PROD005', 'PROD006');
```
[11/6, 13:59] Meta AI: Here is the continuation of the schema and seed data:

-- Comparisons Table_
CREATE TABLE comparisons (
id INT AUTO_INCREMENT PRIMARY KEY,
buyer_id INT NOT NULL,
product_number_1 VARCHAR(50) NOT NULL,
product_number_2 VARCHAR(50) NOT NULL,
compared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Cart Table_
CREATE TABLE cart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Coupons Table_
CREATE TABLE coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(100) NOT NULL UNIQUE,
discount DECIMAL(10, 2),
expiration_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order_Coupon Table_
CREATE TABLE order_coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
coupon_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

-- Email_Verification Table_
CREATE TABLE email_verification (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
verification_token VARCHAR(255),
is_verified BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Password_Tokens Table_
CREATE TABLE password_tokens (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
token VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Purchases Seed Data
INSERT INTO purchases (buyer_id, product_number, quantity, total_price)
VALUES
(1, 'PROD001', 2, 100.00),
(2, 'PROD002', 1, 50.00),
(3, 'PROD003', 3, 200.00);

-- Shipments Seed Data
INSERT INTO shipments (purchase_id, shipping_address, city)
VALUES
(1, '123 Main St', 'New York'),
(2, '456 Elm St', 'Los Angeles'),
(3, '789 Oak St', 'Chicago');

-- Emails Seed Data
INSERT INTO emails (buyer_id, subject, body)
VALUES
(1, 'Order Confirmation', 'Thank you for your order!'),
(2, 'Shipping Update', 'Your order has been shipped!'),
(3, 'Promotion', 'Check out our latest deals!');

-- Presence Seed Data
INSERT INTO presence (user_id, status)
VALUES
(1, 'active'),
(2, 'away'),
(3, 'offline');

-- Messages Seed Data
INSERT INTO messages (sender_id, recipient_id, content)
VALUES
(1, 2, 'Hello!'),
(2, 1, 'Hi!'),
(3, 1, 'How are you?');

-- Spam Seed Data
INSERT INTO spam (user_id, message_id)
VALUES
(1, 3);

-- Receipts Seed Data
INSERT INTO receipts (order_id, receipt_text)
VALUES
(1, 'Thank you for your payment!'),
(2, 'Payment received!'),
(3, 'Payment failed!');

-- Cashier Performance Seed Data
INSERT INTO cashier_performance (cashier_id, total_sales, total_orders, date)
VALUES
(1, 1000.00, 10, '2022-01-01'),
(2, 500.00, 5, '2022-01-02'),
(3, 2000.00, 20, '2022-01-03');

-- Revenue Seed Data
INSERT INTO revenue (total_revenue, date)
VALUES
(3000.00, '2022-01-01'),
(2500.00, '2022-01-02'),
(4000.00, '2022-01-03');

-- Password Resets Seed Data
INSERT INTO password_resets (email, token)
VALUES
('user1@example.com', 'token1'),
('user2@example.com', 'token2'),
('user3@example.com', 'token3');

-- Wishlist Seed Data
INSERT INTO wishlists (buyer_id, product_number)
VALUES
(1, 'PROD004'),
(2, 'PROD005'),
(3, 'PROD006');

-- Comparisons Seed Data
INSERT INTO comparisons (buyer_id, product_number_1, product_number_2)
VALUES
(1, 'PROD001', 'PROD002'),
(2, 'PROD003', 'PROD004'),
(3, 'PROD005', 'PROD006');

-- Cart Seed Data
INSERT INTO cart (user_id, product_id, quantity)
VALUES
(1, 1, 2),
(2, 2, 1),
[11/6, 14:00] Meta AI: Here is the continuation of the schema and seed data:

-- Cart Seed Data
INSERT INTO cart (user_id, product_id, quantity)
VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3);

-- Coupons Seed Data
INSERT INTO coupons (code, discount, expiration_date)
VALUES
('COUPON10', 10.00, '2024-12-31'),
('COUPON20', 20.00, '2025-06-30'),
('COUPON30', 30.00, '2025-12-31');

-- Order_Coupon Seed Data
INSERT INTO order_coupons (order_id, coupon_id)
VALUES
(1, 1),
(2, 2),
(3, 3);

-- Email_Verification Seed Data
INSERT INTO email_verification (user_id, verification_token, is_verified)
VALUES
(1, 'token1', TRUE),
(2, 'token2', TRUE),
(3, 'token3', FALSE);

-- Password_Tokens Seed Data
INSERT INTO password_tokens (user_id, token)
VALUES
(1, 'token1'),
(2, 'token2'),
(3, 'token3');

-- Ratings Seed Data
INSERT INTO ratings (product_id, rating, review)
VALUES
(1, 5, 'Excellent product!'),
(2, 4, 'Good product!'),
(3, 3, 'Average product!');

-- Reports Seed Data
INSERT INTO reports (product_id, reason)
VALUES
(1, 'Inaccurate description'),
(2, 'Defective product'),
(3, 'Incorrect price');

-- Reviews Seed Data
INSERT INTO reviews (product_id, review, rating)
VALUES
(1, 'Excellent product!', 5),
(2, 'Good product!', 4),
(3, 'Average product!', 3);
