const incidentCommunicationController = {
  async createCommunicationPlan(req, res) {
    const planData = req.body;
    await incidentCommunicationModel.createCommunicationPlan(planData);
    res.send({ message: 'Plan created' });
  },

  async updateCommunicationPlan(req, res) {
    const planId = req.params.planId;
    const planData = req.body;
    await incidentCommunicationModel.updateCommunicationPlan(planId, planData);
    res.send({ message: 'Plan updated' });
  }
};