const db = require('../config/database');

exports.getOrder = async (req, res) => {
  const [orders] = await db.execute('SELECT * FROM Orders');
  res.render('orders', { orders });
};

exports.createOrder = async (req, res) => {
  const { user_id, total } = req.body;
  await db.execute('INSERT INTO Orders SET ?', { user_id, total });
  res.redirect('/orders');
};