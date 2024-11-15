
-- *Users Table*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'cashier', 'user') NOT NULL DEFAULT 'user',
  profile_picture VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- *Products Table*
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(10, 2),
  quantity INT,
  size VARCHAR(50),
  description TEXT,
  vendor VARCHAR(255),
  supplier VARCHAR(255),
  promoType VARCHAR(50),
  promoDiscount DECIMAL(5, 2),
  promoStart DATE,
  promoEnd DATE,
  stockThreshold INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- *Categories Table*
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- *Orders Table*
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'canceled') NOT NULL DEFAULT 'pending',
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending',
  shipping_address VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- *Order Items Table*
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- *Notifications Table*
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'warning', 'error') NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- *Messages Table*
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- *Receipts Table*
CREATE TABLE receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  receipt_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- *Cashier Performance Table*
CREATE TABLE cashier_performance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cashier_id INT NOT NULL,
  total_sales DECIMAL(10, 2) DEFAULT 0,
  total_orders INT DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (cashier_id) REFERENCES users(id)
);

-- *Revenue Table*
CREATE TABLE revenue (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE
);

-- *Activities Table*
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity_type ENUM('login', 'logout', 'order', 'profile_update') NOT NULL,
  description TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- *Cart Table*
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- *Wishlists Table*
CREATE TABLE wishlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- *Comparisons Table*
CREATE TABLE comparisons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
```
[11/6, 13:11] Meta AI: Here's the continuation of the database schema:

-- _Comparisons Table_
CREATE TABLE comparisons (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

-- _Reviews Table_
CREATE TABLE reviews (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
rating DECIMAL(3, 2) NOT NULL,
review TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

-- _Shipping Table_
CREATE TABLE shipping (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
tracking_number VARCHAR(255),
carrier VARCHAR(100),
status VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- _Payments Table_
CREATE TABLE payments (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
payment_method VARCHAR(100),
payment_status VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- _Refunds Table_
CREATE TABLE refunds (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
refund_amount DECIMAL(10, 2),
refund_reason TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- _Coupons Table_
CREATE TABLE coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(100) NOT NULL UNIQUE,
discount DECIMAL(10, 2),
expiration_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- _Order_Coupon Table_
CREATE TABLE order_coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
coupon_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

-- _Email_Verification Table_
CREATE TABLE email_verification (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
verification_token VARCHAR(255),
is_verified BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- _Password_Tokens Table_
CREATE TABLE password_tokens (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
token VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- _Password_Resets Table_
CREATE TABLE password_resets (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL,
token VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- _Accounts Table_
CREATE TABLE accounts (
id INT AUTO_INCREMENT PRIMARY KEY,
accountType ENUM('customer', 'user', 'cashier', 'admin') NOT NULL,
balance DECIMAL(10, 2) NOT NULL
);

-- _Todos Table_
CREATE TABLE todos (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
due_date DATE
);

-- _Events Table_
CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
start_date DATE,
end_date DATE
);

