const networkSegmentationModel = {
  async createNetworkSegment(segmentData) {
    const query = 'INSERT INTO network_segments SET ?';
    await mysql.createConnection(dbConfig).execute(query, segmentData);
  },

  async updateNetworkSegment(segmentId, segmentData) {
    const query = 'UPDATE network_segments SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [segmentData, segmentId]);
  }
};