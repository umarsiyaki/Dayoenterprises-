const iamModel = {
  async createUser(userData) {
    const query = 'INSERT INTO users SET ?';
    await mysql.createConnection(dbConfig).execute(query, userData);
  },

  async updateUser(userId, userData) {
    const query = 'UPDATE users SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [userData, userId]);
  }
};