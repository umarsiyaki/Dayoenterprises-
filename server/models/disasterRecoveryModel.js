const disasterRecoveryModel = {
  async createDisasterRecoveryPlan(planData) {
    const query = 'INSERT INTO disaster_recovery_plans SET ?';
    await mysql.createConnection(dbConfig).execute(query, planData);
  },

  async updateDisasterRecoveryPlan(planId, planData) {
    const query = 'UPDATE disaster_recovery_plans SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [planData, planId]);
  }
};