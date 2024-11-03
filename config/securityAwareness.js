
const teachableMachine = require('teachable-machine');

const securityAwarenessConfig = {
// ...
};

const trainModel = async () => {
const model = await teachableMachine.train/security-awareness-model);
return model;
};