const incidentResponseController = {
  async createIncidentResponsePlan(req, res) {
    const planData = req.body;
    await incidentResponseModel.createIncidentResponsePlan(planData);
    res.send({ message: 'Plan created' });
  },

  async updateIncidentResponsePlan(req, res) {
    const planId = req.params.planId;
    const planData = req.body;
    await incidentResponseModel.updateIncidentResponsePlan(planId, planData);
    res.send({ message: 'Plan updated' });
  }
};