const complianceController = {
  async checkCompliance(req, res) {
    const complianceData = req.body;
    const requirements = await complianceModel.checkCompliance(complianceData);
    res.send({ requirements });
  }
};