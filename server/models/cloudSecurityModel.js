const cloudSecurityModel = {
  async createCloudSecurityMetric(metricData) {
    const query = 'INSERT INTO cloud_security_metrics SET ?';
    await mysql.createConnection(dbConfig).execute(query, metricData);
  },

  async updateCloudSecurityMetric(metricId, metricData) {
    const query = 'UPDATE cloud_security_metrics SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [metricData, metricId]);
  }
};