const riskified = require('riskified');

const thirdPartyRiskConfig = {
  // ...
};

const assessThirdPartyRisk = async (vendorData) => {
  const riskAssessment = await riskified.assess(vendorData);
  return riskAssessment;
};