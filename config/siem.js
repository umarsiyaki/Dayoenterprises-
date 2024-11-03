const splunk = require('splunk');

const siemConfig = {
  // ...
};

const sendLogsToSiem = async (logData) => {
  await splunk.sendLogs(siemConfig, logData);
};