const express = require('express');
const router = express.Router();
const accountsAPI = require('../../API/accounts');

// Mount the accounts API
router.use('/api', accountsAPI);

module.exports = router;