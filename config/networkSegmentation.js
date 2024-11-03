const vlan = require('vlan');

const networkSegmentationConfig = {
  // ...
};

const createVlan = async (vlanData) => {
  const vlanId = await vlan.createVlan(vlanData);
  return vlanId;
};