const mysql = require('mysql2/promise');

const loginHistoryModel = {
  async recordLogin(userId, ipAddress, userAgent) {
    const query = 'INSERT INTO login_history (user_id, ip_address, user_agent) VALUES (?, ?, ?)';
    await mysql.createConnection(dbConfig).execute(query, [userId, ipAddress, userAgent]);
  },

  async getLoginHistory(userId) {
    const query = 'SELECT * FROM login_history WHERE user_id = ?';
    const [rows] = await mysql.createConnection(dbConfig).execute(query, [userId]);
    return rows;
  }
};