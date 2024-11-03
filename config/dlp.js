const dlp = require('dlp');

const dlpConfig = {
  // ...
};

const scanForSensitiveData = async () => {
  const scanResult = await dlp.scan(dlpConfig);
  return scanResult;
};