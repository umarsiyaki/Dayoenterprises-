const securityAwarenessController = {
  async trainModel(req, res) {
    const model = await trainModel();
    res.send({ model });
  },

  async createTrainingModule(req, res) {
    const moduleData = req.body;
    await securityAwarenessModel.createTrainingModule(moduleData);
    res.send({ message: 'Module created' });
  }
};