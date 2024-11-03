const cloudSecurityController = {
  async monitorCloudSecurity(req, res) {
    const metrics = await monitorCloudSecurity();
    for (const metric of metrics) {
      await cloudSecurityModel.createCloudSecurityMetric(metric);
    }
    res.send({ message: 'Cloud security metrics created' });
  }
};