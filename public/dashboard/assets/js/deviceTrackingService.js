const trackedDevices = {}; // Store registered devices

function checkDevice(userId, ip, device) {
  if (trackedDevices[userId] && trackedDevices[userId].ip === ip && trackedDevices[userId].device === device) {
    return true;
  }
  return false;
}

function registerDevice(userId, ip, device) {
  trackedDevices[userId] = { ip, device };
}

module.exports = { checkDevice, registerDevice };