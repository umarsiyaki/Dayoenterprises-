// Import necessary modules
  const express = require('express');
const mysql = require('mysql2/promise');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimiter = require('./config/rateLimit');
const rateLimiter = require('./config/iam');
const ipBlockMiddleware = require('./middleware/ipBlockMiddleware');
const { search, sort, getTimeZone, getCurrentDateTime } = require('./utils'); // Externalized utility functions
const { themeOptions, socialMediaPlatforms } = require('./settings');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import socketServer from './components/socketServer';
import Cart from './components/Cart';

import userAuth from './components/userAuth';
import product from './components/product';
import productForm from './components/productForm';
import product from './components/productForm';
import message from './components/message';
import login from './components/login';
import mediaUpload from './components/mediaUpload';
import dashboard from './components/dashboard';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('cart-item')
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="./dashboard/:id" component={ProductDetail} />
        <Route path="/dashboard" component={dashboard} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('admin-card')
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/product" component={productList} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('product-performance')
);
// Create app instance
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(rateLimiter);
app.use(ipBlockMiddleware);

// Database Connection
let db;
(async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'ADMIN123456789',
    database: 'oladayo'
  });
})();

// state variables for simulated use
let users = [];
let orders = [];
let products = [];
let admin = [admin, oladayo]
let password =[ADMIN123456789]
let receipt= []
// Extended Features List

// 1. Rate Limiting - already implemented in config/rateLimit
// 2. IP Blocking Middleware - already implemented in middleware/ipBlockMiddleware
// 3. Authentication and Session Management
app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.authenticated = true;
    res.cookie('authenticated', true, { maxAge: 900000 });
    res.send('Authenticated!');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// 4. Authorization Middleware
app.get('/api/authorized', (req, res) => {
  if (req.session.authenticated) {
    res.send('Welcome, authorized user!');
  } else {
    res.status(401).send('Unauthorized');
  }
});
const app = express();
const lb = require('load-balancer');

app.use(lb());

// Caching
const cache = require('cache-manager');
const cacheMiddleware = cache.cachingMiddleware;

app.use(cacheMiddleware);
// 5. CRUD Operations - Users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const [result] = await db.execute('INSERT INTO Users SET ?', { name, email, role });
    res.json({ id: result.insertId, name, email, role });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// 6. CRUD Operations - Products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const [result] = await db.execute('INSERT INTO Products SET ?', { name, price, description });
    res.json({ id: result.insertId, name, price, description });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});
app.delete('/api/products/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM Products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// 7. CRUD Operations - Orders
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Orders');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});
app.post('/api/orders', async (req, res) => {
  try {
    const { user_id, total } = req.body;
    const [result] = await db.execute('INSERT INTO Orders SET ?', { user_id, total });
    res.json({ id: result.insertId, user_id, total });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// 8. Search Feature
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  const result = search(products, query);
  res.json({ result });
});

// 9. Sorting Feature
app.get('/api/sort', (req, res) => {
  const sortBy = req.query.sortBy || 'name';
  const result = sort(products, sortBy);
  res.json({ result });
});

// 10. Theme Handling
app.use((req, res, next) => {
  const theme = req.cookies.theme || 'light-theme';
  res.locals.theme = theme;
  next();
});

// 11. Social Media Integration (Dummy)
app.get('/api/social', (req, res) => {
  res.json(socialMediaPlatforms);
});

// 12. Date and Time
app.get('/api/date', (req, res) => {
  res.send(`Current date: ${getCurrentDateTime()}`);
});

// 13. Timezone Handling
app.get('/api/timezone', (req, res) => {
  res.send(`Your time zone is: ${getTimeZone()}`);
});

// 14. Animations
app.get('/api/animate', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          .animate { transition: opacity 2s; }
        </style>
      </head>
      <body>
        <div class="animate" style="opacity: 0;">Hello, world!</div>
        <script>
          setTimeout(() => { document.querySelector('.animate').style.opacity = 1; }, 2000);
        </script>
      </body>
    </html>
  `);
});

const thirdPartyRiskRoutes = require('server/routes/thirdPartyRiskRoutes');
const vulnerabilityRoute = require('server/routes/vulnerabilityRoute');
const threatIntelRoute = require('server/routes/threatIntelRoute');

const socialMediaRoutes = require('server/routes/socialMediaRoutes');

const siemRoutes = require('server/routes/siemRoutes');

const adminRoutes = require('server/routes/adminRoutes');
const cashierRoutes = require('server/routes/cashierRoutes');
const cartRoutes = require('server/routes/carttRoutes');

const checkoutRoutes = require('server/routes/checkoutRoutes');
const networkSegmentRoutes = require('server/routes/networkSegmentRoutes');
const loginRoutes = require('server/routes/loginRoutes');

const shipingRoutes = require('server/routes/shipingRoutes');
const messageRoutes = require('server/routes/message');
const incidentRoutes = require('server/routes/incidentRoutes');
const authRoutes = require('./routes/authRoutes');
const securityPolicyRoute = require('./routes/securityPolicyRoute');
const reviewRoutes = require('./routes/reviewRoutes');
const gcalendarapi = require('./routes/gcalendarapi');
const disasterRecoveryRoute = require('./routes/disasterRecoveryRoute');
const securityAwarenessRoutes = require('./routes/securityAwarenessRoutes');
const messageRoutes = require('./routes/messageRoutes');
const endpointSecuritys = require('./routes/endpointSecurityRoutes');
const auditLogs = require('./routes/auditLogRoute');
const products = require('./routes/productRoutes');
const incidentCommunications = require('./routes/incidentCommunicationRoutes');
const users = require('./routes/userRoutes');

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/login', loginRoutes);
app.use('/endpointSecuritys', endpointSecurityRoutes);
app.use('/register', registerRoutes);
app.use('/threatIntelRoute', threatIntelRoute);
app.use('/vulnerabilityRoute', vulnerabilityRoute);
app.use('/thirdPartyRiskRoutes', thirdPartyRiskRoutes);

app.use('/cart', cartRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/incident', incidentRoutes);
app.use('/shipping', shippingRoutes);
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);
app.use('/incidentReports', incidentReportRoutes);
app.use('/message', messageRoutes);
app.use('/notification', notificationRoutes);
app.use('/auth', authRoutes);

// Views
app.set('view engine', 'ejs,html');

// 15. Loop Example
app.get('/api/loop', (req, res) => {
  const array = [1, 2, 3, 4, 5];
  res.send(`Loop result: ${array.join(' ')}`);
});

// 16. Dynamic Page Generation
app.get('/api/generate-page/:page', async (req, res) => {
  try {
    const page = req.params.page;
    const [data] = await db.execute(`SELECT * FROM ${page}`);
    res.send(generateHtml(page, data));
  } catch (error) {
    res.status(500).json({ message: 'Error generating page' });
  }
});

// Generate HTML dynamically
function generateHtml(page, data) {
  let html = `<h1>${page}</h1><ul>`;
  data.forEach(item => {
    html += `<li>${JSON.stringify(item)}</li>`;
  });
  html += '</ul>';
  return html;
}

// 17. Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 18. 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const passport = require('./config/auth');


// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database',
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

// Close database connection on exit
process.on('exit', () => {
  db.end();
});


// 20. Server Start
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
;
const app = express();
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For multipart/form-data
app.use(upload.any());





import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  import React from 'react';
import ReactDOM from 'react-dom';


class Title extends React.Component {
  render() {
    return (<h1 className="">{this.props.label}</h1>)
  }
}

class Paragraph extends React.Component {
  render() {
    return (
      <p className="">
      {this.props.text}
      </p>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="">
        <Title label={this.props.title} />
          <Paragraph text={this.props.text} />
      </div>
    )
  }
}


ReactDOM.render(
  <Main title="React" text="Caution: do not look into laser with remaining eye."></Main>,
  document.getElementById('react-app')
);
}
// Importing required libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useParams } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import ProductCard from './ProductCard';
import ProductList from './ProductList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import ProductDetail from './ProductDetail';
import ShoppingCart from './ShoppingCart';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import ErrorPage from './ErrorPage';
import { useAuth } from './auth';
import fetch from 'node-fetch'; // Importing node-fetch for server-side fetch
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + 'public/dashboard/admin.html');
});

app.get('/api/sales', (req, res) => {
    const salesData = [
        { month: 'Jan', sales: 1000 },
        { month: 'Feb', sales: 2000 },
        { month: 'Mar', sales: 3000 },
        { month: 'Apr', sales: 4000 },
        { month: 'May', sales: 5000 },
    ];
    res.json(salesData);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// SQL ORM setup using Sequelize
const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();

const order = require('./order');

app.use(express.json());

app.post('/submit-order', (req, res) => {
  try {
    const orderData = req.body;
    order.submitOrder(orderData);
    res.send('Order submitted successfully!');
  } catch (err) {
    console.error('error submitting order:', err);
    res.status(500).send('Error submitting order');
  }
});

app.get('/order-history', (req, res) => {
  try {
    order.getOrderHistory().then((results) => {
      res.json(results);
    });
  } catch (err) {
    console.error('error getting order history:', err);
    res.status(500).send('Error getting order history');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Create Sequelize instance for SQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

// Define SQL models (tables)
const Product = sequelize.define('Product', {
  name: { type: Sequelize.STRING, allowNull: false },
  category: { type: Sequelize.STRING },
  price: { type: Sequelize.FLOAT, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  totalLeft: { type: Sequelize.INTEGER, allowNull: false },
  image: { type: Sequelize.STRING },
});

const Cashier = sequelize.define('Cashier', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING },
  status: { type: Sequelize.STRING },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set up multer for image uploads
const upload = multer({ dest: 'uploads/' });

// Define routes for products and cashiers
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      totalLeft: req.body.totalLeft,
      image: req.file ? req.file.filename : null,
    });
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/cashiers', async (req, res) => {
  try {
    const cashier = await Cashier.create(req.body);
    res.status(201).send(cashier);
  } catch (error) {
    res.status(500).send(error);
  }
});



app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'adminpassword') {
        // Success: Respond with a success message and user data
        res.json({ success: true, message: 'Login successful' });
    } else {
        // Failure: Respond with an error message
        res.json({ success: false, message: 'Invalid username or password' });
    }
});
// Additional routes for orders, users, etc.
app.get('/api/orders', async (req, res) => {
  // Logic to fetch orders
  res.send('Orders route');
});

app.get('/api/inventory', async (req, res) => {
  // Logic to fetch inventory
  res.send('Inventory route');
});

app.get('/api/users', async (req, res) => {
  // Logic to fetch users
  res.send('Users route');
});

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// React Frontend App Component
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => setError(error));
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleRegister = (newUser) => {/* Register logic */};
  const handleAddToCart = (product) => setCart([...cart, product]);
  const handleRemoveFromCart = (productId) => setCart(cart.filter(item => item.id !== productId));
  const handleCheckout = () => {/* Checkout logic */};

  return (
    <Router>
      <Header />
      <Navigation />
      <Switch>
        <Route path="/" exact>
          {user ? <Redirect to="/dashboard" /> : <LoginForm onLogin={handleLogin} />}
        </Route>
        <Route path="/dashboard">
          {user ? (
            <Dashboard>
              <ProductList products={products} onAddToCart={handleAddToCart} />
              <ShoppingCart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
              <CheckoutForm onCheckout={handleCheckout} />
            </Dashboard>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/products/:id">
          <ProductDetail />
        </Route>
        <Route path="/register">
          <RegisterForm onRegister={handleRegister} />
        </Route>
        <Route path="/profile">
          {user ? <UserProfile /> : <Redirect to="/" />}
        </Route>
        <Route path="/order-summary">
          {user ? <OrderSummary /> : <Redirect to="/" />}
        </Route>
        <Route path="/static/:filename">
          <StaticFile />
        </Route>
        <Route path="*">
          <ErrorPage error="Page not found" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

const StaticFile = () => {
  const { filename } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`/static/${filename}`)
      .then(response => response.blob())
      .then(blob => setFile(blob));
  }, [filename]);

  return file ? (
    <div>
      <h1>Static File: {filename}</h1>
      <object data={URL.createObjectURL(file)} type="application/pdf" />
    </div>
  ) : (
    <div>Loading...</div>
  );
};
// Vendor IDs mapping for each page
const vendorMapping = {
  'index.html': {
    'bigi': 'bigi-products',
    'maltinal': 'maltinal-products',
    'holandia': 'holandia products',
    'cocacola': 'cocacola drinks',
    'pepsi': 'pepsi drinks', 'viju': 'viju milk drinks',
    'climax': 'climax energy drinks',
    'lucozade': 'lucozade energy drinks',
    'slim': 'slim fruit drinks', 'dudu': 'dudu drinks',
    // add more vendors as needed
  },
  'bigi.html': { 'bigi': 'products' },'big.html': { 'bigi': 'products' },'cocacola.html': { 'cocacola': 'products' },'climax.html': { 'climax': 'products' },'holandia.html': { 'holandia': 'products' },'viju.html': { 'viju': 'products' },
  'maltina.html': { 'maltinal': 'products' },  'lucozade.html': { 'lucozade': 'products' },
  'slim.html': { 'slim': 'products' },
  'smoove.html': { 'smoove': 'products' },

  // map other pages and vendors
};

// Example product data (can be retrieved from a server/database)
const products = [
  { id: 1, vendor: 'bigi', name: 'Bigi Cola', price: '$1', img: 'bigi-cola.jpg', size: '50cl' },
  { id: 2, vendor: 'maltinal', name: 'Maltina (can)', price: '$1.5', img: 'maltina-can.jpg', size: '50cl' },
  // Add more products
];

// Save product to localStorage and Database
function saveProductData(product) {
  let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  storedProducts.push(product);
  localStorage.setItem('products', JSON.stringify(storedProducts));

  // Save to database
  fetch('https://api.oladayoent.com.ng/save-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  .then(response => response.json())
  .then(data => console.log('Product saved to database:', data))
  .catch(error => console.error('Error saving product:', error));
}

// Dynamically load and render products by vendor
function renderProductsByVendor(vendorID) {
  const productsContainer = document.getElementById(vendorID);
  if (!productsContainer) return;

  // Retrieve products from localStorage or fallback to default
  const storedProducts = JSON.parse(localStorage.getItem('products')) || products;

  storedProducts
    .filter(product => product.vendor === vendorID)
    .forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Size: ${product.size}</p>
        <p>Price: ${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productsContainer.appendChild(productCard);
    });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      const selectedProduct = storedProducts.find(product => product.id == productId);
      saveProductData(selectedProduct);
    });
  });
}

// Get current page and load corresponding vendor products
const currentPage = window.location.pathname.split('/').pop();
const vendors = vendorMapping[currentPage];
if (vendors) {
  Object.values(vendors).forEach(vendorID => renderProductsByVendor(vendorID));
}

export default App;
