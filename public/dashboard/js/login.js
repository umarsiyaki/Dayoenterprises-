const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'password',
database: 'database'
});

app.post('/login', (req, res) => {
const { email, password } = req.body;

db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
if (err) {
console.error(err);
res.status(500).send('Error logging in');
} else {
const user = results[0];

if (!user) {
return res.status(401).send('Invalid email or password');
}

const isValidPassword = bcrypt.compareSync(password, user.password);

if (!isValidPassword) {
return res.status(401).send('Invalid email or password');
}

const token = jwt.sign({ userId: (link unavailable) }, process.env.SECRET_KEY, { expiresIn: '1h' });

res.send({ token });
}
});
});
// login.js
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send login data to backend
  fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Redirect to dashboard based on user role
        if (data.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else if (data.role === 'moderator') {
          window.location.href = '/moderator-dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      } else {
        document.getElementById('login-error').textContent = data.message;
      }
    })
    .catch((err) => console.error(err));
});
const express = require('express');
const app = express();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate user data
  if (!username || !password) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  // Query database for user
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Check password
    if (!comparePasswords(password, user.password)) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Check user role
    if (user.role === 'admin') {
      // Admin access
      return res.send({ success: true, role: 'admin' });
    } else if (user.role === 'moderator') {
      // Moderator access
      return res.send({ success: true, role: 'moderator' });
    } else {
      // User access
      return res.send({ success: true, role: 'user' });
    }
  });
});

// Password comparison function
function comparePasswords(password, hashedPassword) {
  // Implement password comparison logic (e.g., bcrypt)
}
async function login(username, password) {
    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Login successful');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Login failed', error);
        alert('Login failed');
    }
}