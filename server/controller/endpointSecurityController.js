const endpointSecurityController = {
  async monitorEndpoints(req, res) {
    const devices = await monitorEndpoints();
    for (const device of devices) {
      await endpointSecurityModel.createEndpointSecurityMetric(device);
    }
    res.send({ message: 'Endpoint security metrics created' });
  }
};