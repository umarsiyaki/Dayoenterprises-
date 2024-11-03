const cloudwatch = require('cloudwatch');

const cloudSecurityConfig = {
  // ...
};

const monitorCloudSecurity = async () => {
  const metrics = await cloudwatch.getMetrics(cloudSecurityConfig);
  return metrics;
};