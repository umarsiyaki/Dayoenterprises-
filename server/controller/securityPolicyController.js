const securityPolicyController = {
  // ...

  async createPolicy(req, res) {
    const policyData = req.body;
    await securityPolicyModel.createPolicy(policyData);
    res.send({ message: 'Policy created' });
  },

  async updatePolicy(req, res) {
    const policyId = req.params.policyId;
    const policyData = req.body;
    await securityPolicyModel.updatePolicy(policyId, policyData);
    res.send({ message: 'Policy updated' });
  }
};