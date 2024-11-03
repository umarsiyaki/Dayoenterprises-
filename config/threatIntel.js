const threatIntel = require('threatintelligence');

const threatIntelConfig = {
  // ...
};

const getThreatData = async () => {
  const data = await threatIntel.getThreatData(threatIntelConfig);
  return data;
};