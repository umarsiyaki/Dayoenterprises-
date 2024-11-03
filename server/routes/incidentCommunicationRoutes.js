const incidentCommunicationRoutes = {
  // ...

  router.post('/create-communication-plan', incidentCommunicationController.createCommunicationPlan);
  router.patch('/update-communication-plan/:planId', incidentCommunicationController.updateCommunicationPlan);
};