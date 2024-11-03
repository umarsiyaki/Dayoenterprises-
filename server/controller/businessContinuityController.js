const businessContinuityController = {
  async createBusinessContinuityPlan(req, res) {
    const planData = req.body;
    await businessContinuityModel.createBusinessContinuityPlan(planData);
    res.send({ message: 'Plan created' });
  },

  async updateBusinessContinuityPlan(req, res) {
    const planId = req.params.planId;
    const planData = req.body;
    await businessContinuityModel.updateBusinessContinuityPlan(planId, planData);
    res.send({ message: 'Plan updated' });
  }
};