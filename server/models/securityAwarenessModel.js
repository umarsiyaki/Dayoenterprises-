const securityAwarenessModel = {
  async createTrainingModule(moduleData) {
    const query = 'INSERT INTO security_awareness_modules SET ?';
    await mysql.createConnection(dbConfig).execute(query, moduleData);
  },

  async updateTrainingModule(moduleId, moduleData) {
    const query = 'UPDATE security_awareness_modules SET ? WHERE id = ?';
    await mysql.createConnection(dbConfig).execute(query, [moduleData, moduleId]);
  }
};