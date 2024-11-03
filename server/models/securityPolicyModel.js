const securityPolicyModel = {
  // ...

  async createPolicy(policyData) {
    const query = 'INSERT INTO security_policies SET ?';
    await mysql.createConnection(dbConfig).execute(query, policyData);
  },

  async updatePolicy(policyId, policyData) {
    const query = 'UPDATE security_policies SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [policyData, policyId]);
  }
};