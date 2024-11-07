require('dotenv').config(); // Load environment variables from .env file

// External Modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // For authentication
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const NodeCache = require('node-cache');

const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const connection = require('./config');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined'));

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Email notification function
const sendOrderUpdateEmail = (order) => {
  const transporter = nodemailer.createTransport( /* SMTP configuration */ );
  const mailOptions = {
    from: 'no-reply@yourstore.com',
    to: order.customerEmail,
    subject: `Order ${order.id} Status Update`,
    text: `Your order status has been updated to: ${order.status}`
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) console.error('Error sending email:', error);
  });
};

// User Management
// Get All Users (Admin Only)
app.get('/API/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  const sql = 'SELECT id, username FROM users';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving users', error: err });
    res.json(results);
  });
});

// Reset Password
app.post('/API/users/reset-password', (req, res) => {
  const { username, newPassword } = req.body;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const sql = 'UPDATE users SET password = ? WHERE username = ?';
  connection.query(sql, [hashedPassword, username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error resetting password', error: err });
    res.json({ message: 'Password reset successfully' });
  });
});

// Create a new order
app.post('/API/orders', authenticateToken, (req, res) => {
  const { customerName, store, vendor, paymentMethod, shippingDetails, items, customerEmail } = req.body;
  const orderDate = new Date();

  // Calculate total amount dynamically based on items
  const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const order = {
    customerName,
    store,
    vendor,
    totalAmount: total,
    orderDate,
    paymentMethod,
    shippingDetails,
    status: 'pending',
    items: JSON.stringify(items),
    customerEmail // Save customer's email for notifications
  };

  const sql = 'INSERT INTO orders SET ?';
  connection.query(sql, order, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating order', error: err });
    sendOrderUpdateEmail(order); // Send email after order creation
    res.status(201).json({ id: result.insertId, ...order });
  });
});

// Get All Orders with Pagination
app.get('/API/orders', authenticateToken, (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  const sql = 'SELECT * FROM orders LIMIT ? OFFSET ?';
  connection.query(sql, [parseInt(limit), offset], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving orders', error: err });
    res.json(results);
  });
});

// Get Order Details
app.get('/API/orders/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const sql = 'SELECT * FROM orders WHERE id = ?';
  connection.query(sql, [orderId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error retrieving order', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Order not found' });

    const order = result[0];
    const response = {
      id: order.id.toString(),
      customerName: order.customerName,
      store: order.store,
      vendor: order.vendor,
      totalAmount: parseFloat(order.totalAmount).toFixed(2),
      status: order.status,
      orderDate: order.orderDate.toISOString(),
      paymentMethod: order.paymentMethod,
      shippingDetails: order.shippingDetails,
      items: JSON.parse(order.items)
    };

    res.json(response);
  });
});

// Update Order Payment Status
app.put('/API/orders/:id/payment-status', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const { paymentStatus } = req.body;

  const sql = 'UPDATE orders SET paymentStatus = ? WHERE id = ?';
  connection.query(sql, [paymentStatus, orderId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating payment status', error: err });
    res.json({ message: 'Payment status updated successfully' });
  });
});

// Update an existing order
app.put('/API/orders/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const { customerName, store, vendor, paymentMethod, shippingDetails, status } = req.body;

  const sql = 'UPDATE orders SET customerName = ?, store = ?, vendor = ?, paymentMethod = ?, shippingDetails = ?, status = ? WHERE id = ?';
  connection.query(sql, [customerName, store, vendor, paymentMethod, shippingDetails, status, orderId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating order', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order updated successfully' });
  });
});

// Cancel an order
app.post('/API/orders/:id/cancel', authenticateToken, (req, res) => {
  const orderId = req.params.id;

  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  connection.query(sql, ['canceled', orderId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error canceling order', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order canceled successfully' });
  });
});

// Ship an order
app.post('/API/orders/:id/ship', authenticateToken, (req, res) => {
  const orderId = req.params.id;

  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  connection.query(sql, ['shipped', orderId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error shipping order', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order shipped successfully' });
  });
});

// Get Order Comments (Admin)
app.get('/API/orders/:id/comments', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const sql = 'SELECT comments FROM order_comments WHERE orderId = ?';
  connection.query(sql, [orderId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving comments', error: err });
    res.json(results);
  });
});

// Add Order Comment (Admin)
app.post('/API/orders/:id/comments', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const { comment } = req.body;
  const sql = 'INSERT INTO order_comments (orderId, comment) VALUES (?, ?)';
  connection.query(sql, [orderId, comment], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding comment', error: err });
    res.status(201).json({ message: 'Comment added successfully' });
  });
});

// Sales Reports (Admin)
app.get('/API/reports/sales', authenticateToken, (req, res) => {
  const sql = 'SELECT SUM(totalAmount) as totalSales FROM orders WHERE orderDate BETWEEN ? AND ?';
  const startDate = req.query.start || '1970-01-01';
  const endDate = req.query.end || new Date().toISOString().split('T')[0];

  connection.query(sql, [startDate, endDate], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error generating report', error: err });
    res.json(results);
  });
});

// User Registration
app.post('/API/register', (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  connection.query(sql, [username, hashedPassword, role || 'customer'], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering user', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// User Login
app.post('/API/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error logging in', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid username or password' });

    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  });
});



// Endpoint to handle checkout
app.post('/api/cart/checkout', (req, res) => {
    const { specialInstructions, cartData } = req.body;

    // Insert into database or perform checkout logic
    // Example: Insert order into orders table
    const order = { special_instructions: specialInstructions, created_at: new Date() };
    db.query('INSERT INTO orders SET ?', order, (error, results) => {
        if (error) return res.status(500).json({ message: 'Checkout failed' });

        const orderId = results.insertId;
        const orderItems = cartData.map(item => ({
            order_id: orderId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        // Use a batch insert for order items
        const orderItemQuery = 'INSERT INTO order_items (order_id, name, quantity, price) VALUES ?';
        const values = orderItems.map(item => [item.order_id, item.name, item.quantity, item.price]);
        
        db.query(orderItemQuery, [values], (err) => {
            if (err) return res.status(500).json({ message: 'Checkout failed' });

            res.status(200).json({ message: 'Order placed successfully!' });
        });
    });
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoute');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Serve HTML pages for routes not handled by API
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/products/contact-us', (req, res) => res.sendFile(path.join(__dirname, 'public/products/contact-us.html')));
app.get('/products/check-out', (req, res) => res.sendFile(path.join(__dirname, 'public/products/check-out.html')));
app.get('/products/climax', (req, res) => res.sendFile(path.join(__dirname, 'public/products/climax.html')));
app.get('/products/collection-page', (req, res) => res.sendFile(path.join(__dirname, 'public/products/collection-page.html')));
app.get('/products/holandia', (req, res) => res.sendFile(path.join(__dirname, 'public/products/holandia.html')));
app.get('/products/locozade', (req, res) => res.sendFile(path.join(__dirname, 'public/products/locozade.html')));
app.get('/products/vendor', (req, res) => res.sendFile(path.join(__dirname, 'public/products/vendor.html')));
app.get('/products/maltina', (req, res) => res.sendFile(path.join(__dirname, 'public/products/maltina.html')));
app.get('/products/marketing', (req, res) => res.sendFile(path.join(__dirname, 'public/products/marketing.html')));
app.get('/products/message', (req, res) => res.sendFile(path.join(__dirname, 'public/register.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public/register.html')));
app.get('/products/cart', (req, res) => res.sendFile(path.join(__dirname, 'public/products/cart.html')));
app.get('/products/faqs', (req, res) => res.sendFile(path.join(__dirname, 'public/products/faqs.html')));
app.get('/products/bigi', (req, res) => res.sendFile(path.join(__dirname, 'public/products/bigi.html')));
app.get('/products/big', (req, res) => res.sendFile(path.join(__dirname, 'public/products/big.html')));
app.get('/products/vijju', (req, res) => res.sendFile(path.join(__dirname, 'public/products/vijju.html')));
app.get('/products/404', (req, res) => res.sendFile(path.join(__dirname, 'public/products/404.html')));
app.get('/products/about-us', (req, res) => res.sendFile(path.join(__dirname, 'public/products/about-us.html')));
// Add additional routes as needed

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});
app.use((req, res, next) => {
  res.status(400).sendFile(path.join(__dirname, 'public/400.html'));
});
app.use((req, res, next) => {
  res.status(402).sendFile(path.join(__dirname, 'public/402.html'));
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviewsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Define a review schema and model
const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: Number
});

// Handle review submission
app.post('/api/reviews', async (req, res) => {
  const { name, comment, rating } = req.body;
  
  try {
    const review = new Review({ name, comment, rating });
    await review.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Fetch reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  }
   catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a review schema and model

const Review = mongoose.model('Review', reviewSchema);

// Handle review submission
app.post('/api/reviews', async (req, res) => {
  const { name, comment, rating } = req.body;
  
  try {
    const review = new Review({ name, comment, rating });
    await review.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Fetch reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Import routes
const userRoutes = require('./server/routes/userRoutes');
const productRoutes = require('./server/routes/productRoutes');
const orderRoutes = require('./server/routes/orderRoutes');
const locationRoutes = require('./server/routes/locationRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const cashierRoutes = require('./server/routes/cashierRoutes');
const paymentRoutes = require('./server/routes/paymentRoutes');
const indexRoutes = require('./server/routes/indexRoutes');
const messageRoutes = require('./server/routes/messageRoutes');

// Import models
const User = require('./server/models/userModel');
const Product = require('./server/models/product');
const Order = require('./server/models/order');
const Notification = require('./server/models/notification');
const Message = require('./server/models/message');

// Initialize app
const server = http.createServer(app);
const io = socketIo(server);
const cache = new NodeCache();
const PORT = process.env.PORT || 5000;

// Middleware setup for security, performance, and logging
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(morgan('combined')); // Logging
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// File upload setup (using Multer)
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 60 * 1024 * 1024 }, // 2MB limit
});

// Rate limiting (apply for specific routes like login)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Caching middleware
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      cache.set(key, body, 60 * 10); // Cache for 10 minutes
      res.originalSend(body);
    };
    next();
  }
};
app.use(cacheMiddleware);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// SQLite3 Database Setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      totalLeft INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL
    )`);
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/locations', locationRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cashier', cashierRoutes);
app.use('/payment', paymentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/', indexRoutes);

// Serve HTML files
const serveHTML = (route, file) => app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'public', file)));
serveHTML('/', 'public/index.html');
serveHTML('/admin', 'public/dashboard/admin.html');
serveHTML('/cashier', 'public/dashboard/cashier.html');
serveHTML('/user', 'public/dashboard/user.html');
serveHTML('/register', 'public/register.html');
serveHTML('/login', 'public/login.html');
serveHTML('/market', 'public/marketing.html');
serveHTML('/payment', 'public/payment.html');
serveHTML('/receipt', 'public/retrieve.html');
serveHTML('/blogs', 'public/maltina.html');

// Live notifications and messaging
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send message', (msg) => {
    io.emit('receive message', msg);
  });
  socket.on('send notification', (notification) => {
    io.emit('receive notification', notification);
  });
});
const http = require('http');
const socketIO = require('socket.io');
const nodemailer = require('nodemailer');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle cart updates
  socket.on('cart-updated', (cartData) => {
    console.log('Cart updated:', cartData);
    io.emit('cart-updated', cartData);
  });

  // Handle checkout start
  socket.on('checkout-started', (checkoutData) => {
    console.log('Checkout started:', checkoutData);
    io.emit('checkout-started', checkoutData);
  });

  // Handle payment processed
  socket.on('payment-processed', (paymentData) => {
    console.log('Payment processed:', paymentData);
    io.emit('payment-processed', paymentData);
    sendPaymentNotification(paymentData);
  });

  // Handle receipt generation
  socket.on('receipt-generated', (receiptData) => {
    console.log('Receipt generated:', receiptData);
    io.emit('receipt-generated', receiptData);
    sendReceiptNotification(receiptData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Notification function to send email/message/notification
function sendPaymentNotification(paymentData) {
  // Use nodemailer or a notification service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: paymentData.userEmail,
    subject: 'Payment Confirmation',
    text: `Payment of ${paymentData.totalAmount} has been processed successfully.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function sendReceiptNotification(receiptData) {
  // Similar to sendPaymentNotification, customize for receipt
}
// Handle 400 - Bad Request
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).sendFile(path.join(__dirname, 'public', '400.html'));
  } else {
    next(err);
  }
});

// Handle 402 - Payment Required
app.use((err, req, res, next) => {
  if (err.status === 402) {
    res.status(402).sendFile(path.join(__dirname, 'public', '402.html'));
  } else {
    next(err);
  }
});
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name'
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// API endpoint to retrieve products
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

// API endpoint to add product to cart
app.post('/api/cart', (req, res) => {
    const productId = req.body.productId;
    const query = 'INSERT INTO cart (product_id) VALUES (?)';
    db.query(query, productId, (err, results) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Product added to cart' });
    });
});

// API endpoint to add product to wishlist
app.post('/api/wishlist', (req, res) => {
    const productId = req.body.productId;
    const query = 'INSERT INTO wishlist (product_id) VALUES (?)';
    db.query(query, productId, (err, results) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Product added to wishlist' });
    });
});

// API endpoint to complete checkout
app.post('/api/checkout', (req, res) => {
    const query = 'DELETE FROM cart';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Checkout complete' });
    });
});

// Handle 500 - Internal Server Error
app.use((err, req, res, next) => {
  if (err.status === 500 || !err.status) {
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
  } else {
    next(err);
  }
});

// Fallback for any other 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});
app.get('/trigger-500', (req, res, next) => {
  const error = new Error('Something went wrong');
  error.status = 500;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});
// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // Verify token and proceed
  next();
}

app.use(express.json());

// Routes
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
const payrollRoutes = require('./routes/payroll');
const performanceRoutes = require('./routes/performance');
const trainingRoutes = require('./routes/training');
const benefitsRoutes = require('./routes/benefits');
const leaveRoutes = require('./routes/leave');
const promotionRoutes = require('./routes/promotion');
const terminationRoutes = require('./routes/termination');

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/benefits', benefitsRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/promotion', promotionRoutes);
app.use('/api/termination', terminationRoutes);
// Protect review submission route
app.post('/api/reviews', isAuthenticated, async (req, res) => {
  // Review submission logic
});
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '.. public/dashboard/index.html');
});

app.get('/api/sales', (req, res) => {
  const salesData = [
    { month: 'Jan', sales: 1000 },
    { month: 'Feb', sales: 2000 },
    { month: 'Mar', sales: 3000 },
    { month: 'Apr', sales: 4000 },
    { month: 'May', sales: 5000 }
    ];
  res.json(salesData);
});

app.get('/api/customers', (req, res) => {
  const customersData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com' }
    ];
  res.json(customersData);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const geoip = require('geoip-lite');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'dashboard'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define models
const Models = {
  Sales: {
    getAll: (callback) => {
      db.query('SELECT * FROM Sales', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Sales SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Sales SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Sales WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Customers: {
    getAll: (callback) => {
      db.query('SELECT * FROM Customers', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Customers SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Customers SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Customers WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Products: {
    getAll: (callback) => {
      db.query('SELECT * FROM Products', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Products SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Products SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Products WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Orders: {
    getAll: (callback) => {
      db.query('SELECT * FROM Orders', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Orders SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Orders SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Orders WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Messages: {
    getAll: (callback) => {
      db.query('SELECT * FROM Messages', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Messages SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Messages SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Messages WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  


  Todos: {
    getAll: (callback) => {
      db.query('SELECT * FROM Todos', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Todos SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Todos SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Todos WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  AdminRoles: {
    getAll: (callback) => {
      db.query('SELECT * FROM AdminRoles', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO AdminRoles SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE AdminRoles SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM AdminRoles WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Moderation: {
    getAll: (callback) => {
      db.query('SELECT * FROM Moderation', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Moderation SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Moderation SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Moderation WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  UserActivity: {
    getAll: (callback) => {
      db.query('SELECT * FROM UserActivity', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO UserActivity SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE UserActivity SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM UserActivity WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  ProductPerformance: {
    getAll: (callback) => {
      db.query('SELECT * FROM ProductPerformance', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO ProductPerformance SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE ProductPerformance SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM ProductPerformance WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Metrics: {
    getAll: (callback) => {
      db.query('SELECT * FROM Metrics', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Metrics SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Metrics SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Metrics WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  

  SecurityMeasures: {
    getAll: (callback) => {
      db.query('SELECT * FROM SecurityMeasures', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO SecurityMeasures SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE SecurityMeasures SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM SecurityMeasures WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Orders: {
    getAll: (callback) => {
      db.query('SELECT * FROM Orders', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Orders SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Orders SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Orders WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Receipts: {
    getAll: (callback) => {
      db.query('SELECT * FROM Receipts', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Receipts SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Receipts SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Receipts WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Redirects: {
    getAll: (callback) => {
      db.query('SELECT * FROM Redirects', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Redirects SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Redirects SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Redirects WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Sessions: {
    getAll: (callback) => {
      db.query('SELECT * FROM Sessions', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Sessions SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Sessions SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Sessions WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  APIConnections: {
    getAll: (callback) => {
      db.query('SELECT * FROM APIConnections', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO APIConnections SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE APIConnections SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM APIConnections WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  
  IPAddress: {
    getAll: (callback) => {
      db.query('SELECT * FROM IPAddress', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO IPAddress SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE IPAddress SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM IPAddress WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  UserLocation: {
    getAll: (callback) => {
      db.query('SELECT * FROM UserLocation', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO UserLocation SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE UserLocation SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM UserLocation WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  SocialMedia: {
    getAll: (callback) => {
      db.query('SELECT * FROM SocialMedia', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO SocialMedia SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE SocialMedia SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM SocialMedia WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Sharing: {
    getAll: (callback) => {
      db.query('SELECT * FROM Sharing', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Sharing SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Sharing SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Sharing WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Rating: {
    getAll: (callback) => {
      db.query('SELECT * FROM Rating', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Rating SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Rating SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Rating WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },
  Category: {
    getAll: (callback) => {
      db.query('SELECT * FROM Category', (err, results) => {
        callback(err, results);
      });
    },
    create: (data, callback) => {
      db.query('INSERT INTO Category SET ?', data, (err, results) => {
        callback(err, results);
      });
    },
    update: (id, data, callback) => {
      db.query('UPDATE Category SET ? WHERE id = ?', [data, id], (err, results) => {
        callback(err, results);
      });
    },
    delete: (id, callback) => {
      db.query('DELETE FROM Category WHERE id = ?', id, (err, results) => {
        callback(err, results);
      });
    }
  },

Vendor: {
getAll: (callback) => {
db.query('SELECT * FROM Vendor', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Vendor SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Vendor SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Vendor WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Author: {
getAll: (callback) => {
db.query('SELECT * FROM Author', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Author SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Author SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Author WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Date: {
getAll: (callback) => {
db.query('SELECT * FROM Date', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Date SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Date SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Date WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Size: {
getAll: (callback) => {
db.query('SELECT * FROM Size', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Size SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Size SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Size WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Quantity: {
getAll: (callback) => {
db.query('SELECT * FROM Quantity', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Quantity SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Quantity SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Quantity WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Blogs: {
getAll: (callback) => {
db.query('SELECT * FROM Blogs', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Blogs SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Blogs SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Blogs WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},

Comments: {
getAll: (callback) => {
db.query('SELECT * FROM Comments', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Comments SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Comments SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Comments WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
ProductReviews: {
getAll: (callback) => {
db.query('SELECT * FROM ProductReviews', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO ProductReviews SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE ProductReviews SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM ProductReviews WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
FAQs: {
getAll: (callback) => {
db.query('SELECT * FROM FAQs', (err, results) => {
callback(err, results);
});
},

//_GiftCards_

GiftCards: {
enabled: true,
expirationDays: 365,
maxAmount: 1000
},


//_LoyaltyPrograms_

LoyaltyPrograms: {
enabled: true,
pointsPerDollar: 10,
redemptionRate: 100
},


//_Affiliates_

Affiliates: {
enabled: true,
commissionRate: 0.1,
cookieDuration: 30
},


//_SocialMediaAccounts_

SocialMediaAccounts: {
facebook: {
appId: 'YOUR_APP_ID',
appSecret: 'YOUR_APP_SECRET'
},
twitter: {
consumerKey: 'YOUR_CONSUMER_KEY',
consumerSecret: 'YOUR_CONSUMER_SECRET'
}
},


//_EmailCampaigns_

EmailCampaigns: {
enabled: true,
smtpServer: '(link unavailable)',
smtpPort: 587,
fromEmail: 'info@example.com'
},


//_InventoryLevels_

InventoryLevels: {
lowThreshold: 10,
reorderPoint: 20,
reorderQuantity: 50
},

//_Suppliers_

Suppliers: {
enabled: true,
defaultLeadTime: 7
},


//_Returns_

Returns: {
enabled: true,
returnWindow: 30
},


//_ProductVariants_

ProductVariants: {
enabled: true,
maxVariantsPerProduct: 10
},


//_CustomerSegments_

CustomerSegments: {
enabled: true,
defaultSegment: 'general'
},


//*Server Settings*


Security: {
encryptionKey: 'YOUR_ENCRYPTION_KEY',
saltRounds: 10
},

PaymentGateways: {
stripe: {
secretKey: 'YOUR_STRIPE_SECRET_KEY',
publicKey: 'YOUR_STRIPE_PUBLIC_KEY'
},
paypal: {
clientId: 'YOUR_PAYPAL_CLIENT_ID',
secret: 'YOUR_PAYPAL_SECRET'
}
},

EmailTemplates: {
verificationEmail: 'verification-email-template',
passwordResetEmail: 'password-reset-email-template'
},

APIKeys: {
googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY',
mailgun: 'YOUR_MAILGUN_API_KEY'
},

FileUploads: {
maxFileSize: 1024 * 1024 * 5, // 5MB
allowedFileTypes: ['image/jpeg', 'image/png']
},

Logs: {
level: 'info',
filePath: './logs/app.log'
},
create: (data, callback) => {
db.query('INSERT INTO FAQs SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE FAQs SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM FAQs WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Settings: {
getAll: (callback) => {
db.query('SELECT * FROM Settings', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Settings SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Settings SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Settings WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
},
Subscriptions: {
getAll: (callback) => {
db.query('SELECT * FROM Subscriptions', (err, results) => {
callback(err, results);
});
},
create: (data, callback) => {
db.query('INSERT INTO Subscriptions SET ?', data, (err, results) => {
callback(err, results);
});
},
update: (id, data, callback) => {
db.query('UPDATE Subscriptions SET ? WHERE id = ?', [data, id], (err, results) => {
callback(err, results);
});
},
delete: (id, callback) => {
db.query('DELETE FROM Subscriptions WHERE id = ?', id, (err, results) => {
callback(err, results);
});
}
}
};

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = Models;
