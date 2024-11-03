const endpointSecurityModel = {
  async createEndpointSecurityMetric(metricData) {
    const query = 'INSERT INTO endpoint_security_metrics SET ?';
    await mysql.createConnection(dbConfig).execute(query, metricData);
  },

  async updateEndpointSecurityMetric(metricId, metricData) {
    const query = 'UPDATE endpoint_security_metrics SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [metricData, metricId]);
  }
};