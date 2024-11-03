const securityAwarenessRoutes = {
  // ...

  router.get('/train-model', securityAwarenessController.trainModel);
  router.post('/create-training-module', securityAwarenessController.createTrainingModule);
};