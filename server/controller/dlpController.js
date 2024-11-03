const dlpController = {
  async scanForSensitiveData(req, res) {
    const scanResult = await scanForSensitiveData();
    for (const finding of scanResult.findings) {
      await dlpModel.createDlpPolicy(finding);
    }
    res.send({ message: 'Sensitive data scanned' });
  }
};