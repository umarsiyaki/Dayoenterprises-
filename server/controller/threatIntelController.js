const threatIntelController = {
  async updateThreatData(req, res) {
    await threatIntelModel.updateThreatData();
    res.send({ message: 'Threat data updated' });
  }
};