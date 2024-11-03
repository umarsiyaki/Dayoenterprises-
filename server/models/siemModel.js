const siemModel = {
  async createLog(logData) {
    const query = 'INSERT INTO logs SET ?';
    await mysql.createConnection(dbConfig).execute(query, logData);
  }
};