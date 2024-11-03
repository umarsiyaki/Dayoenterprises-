const osquery = require('osquery');

const endpointSecurityConfig = {
  // ...
};

const monitorEndpoints = async () => {
  const devices = await osquery.getDevices(endpointSecurityConfig);
  return devices;
};