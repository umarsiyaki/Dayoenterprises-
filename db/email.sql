CREATE DATABASE email_service;

USE email_service;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  total DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE newsletters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subscription_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);


Seed data:


INSERT INTO users (name, email, password) 
VALUES 
('John Doe', 'john.doe@example.com', 'password123'),
('Jane Doe', 'jane.doe@example.com', 'password123');

INSERT INTO orders (user_id, order_date, total) 
VALUES 
(1, '2022-01-01', 100.00),
(2, '2022-01-15', 200.00);

INSERT INTO newsletters (user_id, subscription_date) 
VALUES 
(1, '2022-01-01'),
(2, '2022-01-15');

INSERT INTO products (name, price) 
VALUES 
('Product 1', 20.00),
('Product 2', 50.00);

INSERT INTO order_items (order_id, product_id, quantity) 
VALUES 
(1, 1, 2),
(1, 2, 1),
(2, 1, 1),
(2, 2, 2);
Here are some example SQL queries for the email service database:

--Get user information--


SELECT FROM users WHERE email = 'john.doe@example.com';


--Get order history for a user--


SELECT FROM orders 
JOIN order_items ON (link unavailable) = order_items.order_id 
JOIN products ON order_items.product_id = (link unavailable) 
WHERE orders.user_id = 1;


--Get newsletter subscribers--


SELECT FROM newsletters 
JOIN users ON newsletters.user_id = (link unavailable);


--Get products purchased by a user--


SELECT DISTINCT products 
FROM products 
JOIN order_items ON (link unavailable) = order_items.product_id 
JOIN orders ON order_items.order_id = (link unavailable) 
WHERE orders.user_id = 1;


--Update user profile--


UPDATE users 
SET name = 'John Doe Updated', 
    email = 'john.doe.updated@example.com' 
WHERE id = 1;


--Send password reset email--


SELECT email 
FROM users 
WHERE id = 1;


--Get order details--


SELECT
FROM orders 
JOIN order_items ON (link unavailable) = order_items.order_id 
JOIN products ON order_items.product_id = (link unavailable) 
WHERE (link unavailable) = 1;


--Send new product notification--


SELECT email 
FROM users 
JOIN newsletters ON (link unavailable) = newsletters.user_id;
