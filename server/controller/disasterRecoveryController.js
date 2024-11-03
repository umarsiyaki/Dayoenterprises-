const disasterRecoveryController = {
  async createDisasterRecoveryPlan(req, res) {
    const planData = req.body;
    await disasterRecoveryModel.createDisasterRecoveryPlan(planData);
    res.send({ message: 'Plan created' });
  },

  async updateDisasterRecoveryPlan(req, res) {
    const planId = req.params.planId;
    const planData = req.body;
    await disasterRecoveryModel.updateDisasterRecoveryPlan(planId, planData);
    res.send({ message: 'Plan updated' });
  }
};