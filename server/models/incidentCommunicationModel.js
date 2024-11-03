const incidentCommunicationModel = {
  async createCommunicationPlan(planData) {
    const query = 'INSERT INTO incident_communication_plans SET ?';
    await mysql.createConnection(dbConfig).execute(query, planData);
  },

  async updateCommunicationPlan(planId, planData) {
    const query = 'UPDATE incident_communication_plans SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [planData, planId]);
  }
};