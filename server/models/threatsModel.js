const threatIntelModel = {
  async updateThreatData() {
    const data = await getThreatData();
    const query = 'INSERT INTO threat_intel SET ?';
    await mysql.createConnection(dbConfig).execute(query, data);
  }
};