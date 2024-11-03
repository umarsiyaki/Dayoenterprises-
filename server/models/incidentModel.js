const incidentModel = {
  async createIncident(incidentData) {
    const query = 'INSERT INTO incidents SET ?';
    await mysql.createConnection(dbConfig).execute(query, incidentData);
  }
};