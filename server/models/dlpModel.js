const dlpModel = {
  async createDlpPolicy(policyData) {
    const query = 'INSERT INTO dlp_policies SET ?';
    await mysql.createConnection(dbConfig).execute(query, policyData);
  }
};