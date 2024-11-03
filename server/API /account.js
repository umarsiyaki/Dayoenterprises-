const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await db.query('SELECT * FROM accounts');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Update account type
router.put('/accounts/:id', async (req, res) => {
  const { id } = req.params;
  const { accountType } = req.body;
  try {
    await db.query('UPDATE accounts SET accountType = ? WHERE id = ?', [accountType, id]);
    res.json({ message: 'Account type updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Delete an account
router.delete('/accounts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM accounts WHERE id = ?', [id]);
    res.json({ message: 'Account deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;