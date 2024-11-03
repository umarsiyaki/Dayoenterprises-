const auditLogModel = {
  async logEvent(eventData) {
    const query = 'INSERT INTO audit_logs SET ?';
    await mysql.createConnection(dbConfig).execute(query, eventData);
    logger.info(eventData);
  }
};