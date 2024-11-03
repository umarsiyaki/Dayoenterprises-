const incidentController = {
  async automateResponse(req, res) {
    const incidentData = req.body;
    await automateResponse(incidentData);
    res.send({ message: 'Response automated' });
  }
};
```