const siemController = {
  async sendLogsToSiem(req, res) {
    const logData = req.body;
    await sendLogsToSiem(logData);
    await siemModel.createLog(logData);
    res.send({ message: 'Logs sent to SIEM' });
  }
};