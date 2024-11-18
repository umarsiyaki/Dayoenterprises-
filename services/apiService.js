
const db = require('../models'); // or your database connection module

exports.fetchCashiers = async () => {
    return await db.Cashier.findAll(); // Replace with your actual data fetching logic
};

// Similar functions for other data fetching...

exports.updateUserSettings = async (settings) => {
    // Update settings in the database
    await db.Settings.update(settings, { where: { id: 1 } }); // Replace with actual logic
};

const jwt = require('jsonwebtoken');

const secretKey = '23Er564367-76578key';

app.use(expressJwt({ secret: secretKey }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, row) => {
    if (err || !row) {
      res.status(401).send({ message: 'Invalid credentials' });
    } else {
      const token = jwt.sign({ userId: (link unavailable) }, secretKey, {
        expiresIn: '1h',
      });
      res.send({ token });
    }
  });
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));