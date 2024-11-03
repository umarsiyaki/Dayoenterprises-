const businessContinuityModel = {
  async createBusinessContinuityPlan(planData) {
    const query = 'INSERT INTO business_continuity_plans SET ?';
    await mysql.createConnection(dbConfig).execute(query, planData);
  },

  async updateBusinessContinuityPlan(planId, planData) {
    const query = 'UPDATE business_continuity_plans SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [planData, planId]);
  }
};