const thirdPartyRiskController = {
  async assessThirdPartyRisk(req, res) {
    const vendorData = req.body;
    const riskAssessment = await assessThirdPartyRisk(vendorData);
    await thirdPartyRiskModel.createThirdPartyRiskAssessment(riskAssessment);
    res.send({ message: 'Risk assessment created' });
  }
};