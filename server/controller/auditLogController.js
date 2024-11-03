const auditLogController = {
  async logEvent(req, res) {
    const eventData = req.body;
    await auditLogModel.logEvent(eventData);
    res.send({ message: 'Event logged' });
  }
};