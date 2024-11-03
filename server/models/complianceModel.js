const complianceModel = {
  async checkCompliance(complianceData) {
    const query = 'SELECT * FROM compliance_requirements WHERE ?';
    const requirements = await mysql.createConnection(dbConfig).execute(query, complianceData);
    return requirements;
  }
};