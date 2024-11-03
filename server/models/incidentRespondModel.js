const incidentResponseModel = {
  async createIncidentResponsePlan(planData) {
    const query = 'INSERT INTO incident_response_plans SET ?';
    await mysql.createConnection(dbConfig).execute(query, planData);
  },

  async updateIncidentResponsePlan(planId, planData) {
    const query = 'UPDATE incident_response_plans SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [planData, planId]);
  }
};
