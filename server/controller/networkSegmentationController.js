const networkSegmentationController = {
  async createNetworkSegment(req, res) {
    const segmentData = req.body;
    const vlanId = await createVlan(segmentData);
    await networkSegmentationModel.createNetworkSegment({ ...segmentData, vlanId });
    res.send({ message: 'Network segment created' });
  }
};