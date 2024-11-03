const thirdPartyRiskModel = {
  async createThirdPartyRiskAssessment(assessmentData) {
    const query = 'INSERT INTO third_party_risk_assessments SET ?';
    await mysql.createConnection(dbConfig).execute(query, assessmentData);
  },

  async updateThirdPartyRiskAssessment(assessmentId, assessmentData) {
    const query = 'UPDATE third_party_risk_assessments SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [assessmentData, assessmentId]);
  }
};