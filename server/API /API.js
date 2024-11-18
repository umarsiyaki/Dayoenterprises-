
const express = require('express');
const router = express.Router();
const { Sales, Customers } = require('./database');

router.get('/sales', async (req, res) => {
    const sales = await Sales.find();
    res.json(sales);
});

router.get('/customers', async (req, res) => {
    const customers = await Customers.find();
    res.json(customers);
});

   app.post('/api/change-password', (req, res) => {
const { userId, currentPassword, newPassword } = req.body;
// Logic to verify current password and update new password
res.send({ message: 'Password changed successfully!' });
});
   const multer = require('multer');
   const upload = multer({ dest: 'uploads/' });

   app.post('/api/upload-profile-pic', upload.single('profile-pic'), (req, res) => {
       const userId = req.body.userId;
       // Logic to save uploaded file path to user account
       res.send({ message: 'Profile picture updated!' });
   });
   app.delete('/api/delete-account/:userId', (req, res) => {
const userId = req.params.userId;
// Logic to delete user account
res.send({ message: 'Account deleted successfully!' });
});
app.post('/api/verify-email', (req, res) => {
const { email } = req.body;
// Logic to send verification email
res.send({ message: 'Verification email sent!' });
});
app.post('/api/setup-2fa', (req, res) => {
const { userId } = req.body;
// Logic to setup 2FA for user
res.send({ message: 'Two-factor authentication enabled!' });
});
app.post('/api/notification-preferences', (req, res) => {
const { userId, preferences } = req.body;
// Logic to update notification preferences in user profile
res.send({ message: 'Notification preferences updated!' });
});
app.post('/api/addresses', (req, res) => {
const { userId, address } = req.body;
// Logic to save new address
res.send({ message: 'Address added successfully!' });
});

app.delete('/api/addresses/:addressId', (req, res) => {
const addressId = req.params.addressId;
// Logic to delete specified address
res.send({ message: 'Address deleted successfully!' });
});

   app.get('/api/activity-log/:userId', (req, res) => {
       const userId = req.params.userId;
       // Logic to retrieve user activity log
       res.send({ activities: ['Logged in', 'Updated profile'] });
   });

  
   app.post('/api/payment-methods', (req, res) => {
       const { userId, paymentMethod } = req.body;
       // Logic to save new payment method
       res.send({ message: 'Payment method added successfully!' });
   });

   app.delete('/api/payment-methods/:methodId', (req, res) => {
       const methodId = req.params.methodId;
       // Logic to delete specified payment method
       res.send({ message: 'Payment method deleted successfully!' });
   });
    app.get('/api/last-login/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to retrieve last login information
        res.send({ lastLogin: '2024-10-20 14:35' });
    });

    app.get('/api/export-data/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to gather account data for export
        res.download('path/to/data/file'); // Replace with actual file path
    });

    app.post('/api/refer-friends', (req, res) => {
        const { userId, friendEmail } = req.body;
        // Logic to send referral link
        res.send({ message: 'Referral link sent!' });
    });

    app.get('/api/manage-subscriptions/:userId', (req, res) => {
        const userId = req.params.userId;
        // Logic to retrieve user subscriptions
        res.send({ subscriptions: ['Newsletter', 'Promotions'] });
    });

    app.post('/api/feedback', (req, res) => {
        const { userId, feedback } = req.body;
        // Logic to store feedback
        res.send({ message: 'Feedback submitted!' });
    });
    app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, rows) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error fetching users' });
    } else {
      res.send(rows);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const id = (link unavailable);
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, id, (err, row) => {
    if (err) {
      console.error('error:', err);
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(row);
    }
  });
});

app.post('/users', (req, res) => {
  const user = req.body;
  const query = 'INSERT INTO users SET ?';
  db.query(query, user, (err, result) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      res.send({ message: 'User created successfully' });
    }
  });
});

app.put('/users/:id', (req, res) => {
  const id = (link unavailable);
  const user = req.body;
  const query = 'UPDATE users SET ? WHERE id = ?';
  db.query(query, [user, id], (err, result) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error updating user' });
    } else {
      res.send({ message: 'User updated successfully' });
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const id = (link unavailable);
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, id, (err, result) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error deleting user' });
    } else {
      res.send({ message: 'User deleted successfully' });
    }
  });
});


// Order Endpoints

app.get('/orders', (req, res) => {
const query = 'SELECT * FROM orders';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching orders' });
} else {
res.send(rows);
}
});
});

app.get('/orders/:id', (req, res) => {
const id = (link unavailable);
const query = 'SELECT * FROM orders WHERE id = ?';
db.query(query, id, (err, row) => {
if (err) {
console.error('error:', err);
res.status(404).send({ message: 'Order not found' });
} else {
res.send(row);
}
});
});

app.post('/orders', (req, res) => {
const order = req.body;
const query = 'INSERT INTO orders SET ?';
db.query(query, order, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error creating order' });
} else {
res.send({ message: 'Order created successfully' });
}
});
});

app.put('/orders/:id', (req, res) => {
const id = (link unavailable);
const order = req.body;
const query = 'UPDATE orders SET ? WHERE id = ?';
db.query(query, [order, id], (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error updating order' });
} else {
res.send({ message: 'Order updated successfully' });
}
});
});

app.delete('/orders/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM orders WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error deleting order' });
} else {
res.send({ message: 'Order deleted successfully' });
}
});
});

// Product Endpoints

app.get('/products', (req, res) => {
const query = 'SELECT * FROM products';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching products' });
} else {
res.send(rows);
}
});
});

app.get('/products/:id', (req, res) => {
const id = (link unavailable);
const query = 'SELECT * FROM products WHERE id = ?';
db.query(query, id, (err, row) => {
if (err) {
console.error('error:', err);
res.status(404).send({ message: 'Product not found' });
} else {
res.send(row);
}
});
});

app.post('/products', (req, res) => {
const product = req.body;
const query = 'INSERT INTO products SET ?';
db.query(query, product, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error creating product' });
} else {
res.send({ message: 'Product created successfully' });
}
});
});

app.put('/products/:id', (req, res) => {
const id = (link unavailable);
const product = req.body;
const query = 'UPDATE products SET ? WHERE id = ?';
db.query(query, [product, id], (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error updating product' });
} else {
res.send({ message: 'Product updated successfully' });
}
});
});

app.delete('/products/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM products WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error deleting product' });
} else {
res.send({ message: 'Product deleted successfully' });
}
});
});

// Category Endpoints

app.get('/categories', (req, res) => {
const query = 'SELECT * FROM categories';
db.query(query, (err, rows) => {
if (err) {
console.error('
[11/6, 14:12] Meta AI: Here is the continuation of the API endpoints:

// Category Endpoints

app.get('/categories', (req, res) => {
const query = 'SELECT * FROM categories';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching categories' });
} else {
res.send(rows);
}
});
});

app.get('/categories/:id', (req, res) => {
const id = (link unavailable);
const query = 'SELECT * FROM categories WHERE id = ?';
db.query(query, id, (err, row) => {
if (err) {
console.error('error:', err);
res.status(404).send({ message: 'Category not found' });
} else {
res.send(row);
}
});
});

app.post('/categories', (req, res) => {
const category = req.body;
const query = 'INSERT INTO categories SET ?';
db.query(query, category, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error creating category' });
} else {
res.send({ message: 'Category created successfully' });
}
});
});

app.put('/categories/:id', (req, res) => {
const id = (link unavailable);
const category = req.body;
const query = 'UPDATE categories SET ? WHERE id = ?';
db.query(query, [category, id], (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error updating category' });
} else {
res.send({ message: 'Category updated successfully' });
}
});
});

app.delete('/categories/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM categories WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error deleting category' });
} else {
res.send({ message: 'Category deleted successfully' });
}
});
});

// Vendor Endpoints

app.get('/vendors', (req, res) => {
const query = 'SELECT * FROM vendors';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching vendors' });
} else {
res.send(rows);
}
});
});

app.get('/vendors/:id', (req, res) => {
const id = (link unavailable);
const query = 'SELECT * FROM vendors WHERE id = ?';
db.query(query, id, (err, row) => {
if (err) {
console.error('error:', err);
res.status(404).send({ message: 'Vendor not found' });
} else {
res.send(row);
}
});
});

app.post('/vendors', (req, res) => {
const vendor = req.body;
const query = 'INSERT INTO vendors SET ?';
db.query(query, vendor, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error creating vendor' });
} else {
res.send({ message: 'Vendor created successfully' });
}
});
});

app.put('/vendors/:id', (req, res) => {
const id = (link unavailable);
const vendor = req.body;
const query = 'UPDATE vendors SET ? WHERE id = ?';
db.query(query, [vendor, id], (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error updating vendor' });
} else {
res.send({ message: 'Vendor updated successfully' });
}
});
});

app.delete('/vendors/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM vendors WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error deleting vendor' });
} else {
res.send({ message: 'Vendor deleted successfully' });
}
});
});

// Cart Endpoints

app.get('/cart', (req, res) => {
const query = 'SELECT * FROM cart';
db.query(query, (err, rows) => {
if (err) {
console.error('
[11/6, 14:13] Meta AI: Here is the continuation of the API endpoints:

// Cart Endpoints

app.get('/cart', (req, res) => {
const query = 'SELECT * FROM cart';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching cart' });
} else {
res.send(rows);
}
});
});

app.post('/cart', (req, res) => {
const item = req.body;
const query = 'INSERT INTO cart SET ?';
db.query(query, item, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error adding item to cart' });
} else {
res.send({ message: 'Item added to cart successfully' });
}
});
});

app.put('/cart/:id', (req, res) => {
const id = (link unavailable);
const item = req.body;
const query = 'UPDATE cart SET ? WHERE id = ?';
db.query(query, [item, id], (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error updating cart item' });
} else {
res.send({ message: 'Cart item updated successfully' });
}
});
});

app.delete('/cart/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM cart WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error removing item from cart' });
} else {
res.send({ message: 'Item removed from cart successfully' });
}
});
});

// Wishlist Endpoints

app.get('/wishlist', (req, res) => {
const query = 'SELECT * FROM wishlist';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching wishlist' });
} else {
res.send(rows);
}
});
});

app.post('/wishlist', (req, res) => {
const item = req.body;
const query = 'INSERT INTO wishlist SET ?';
db.query(query, item, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error adding item to wishlist' });
} else {
res.send({ message: 'Item added to wishlist successfully' });
}
});
});

app.delete('/wishlist/:id', (req, res) => {
const id = (link unavailable);
const query = 'DELETE FROM wishlist WHERE id = ?';
db.query(query, id, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error removing item from wishlist' });
} else {
res.send({ message: 'Item removed from wishlist successfully' });
}
});
});

// Payment Endpoints

app.post('/payment', (req, res) => {
const payment = req.body;
const query = 'INSERT INTO payments SET ?';
db.query(query, payment, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error processing payment' });
} else {
res.send({ message: 'Payment processed successfully' });
}
});
});

// Shipment Endpoints

app.get('/shipments', (req, res) => {
const query = 'SELECT * FROM shipments';
db.query(query, (err, rows) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error fetching shipments' });
} else {
res.send(rows);
}
});
});

app.post('/shipments', (req, res) => {
const shipment = req.body;
const query = 'INSERT INTO shipments SET ?';
db.query(query, shipment, (err, result) => {
if (err) {
console.error('error:', err);
res.status(500).send({ message: 'Error creating shipment' });
} else {
res.send({ message: 'Shipment created successfully' });
}
});
});

module.exports = router;