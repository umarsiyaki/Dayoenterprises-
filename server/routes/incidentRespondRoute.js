const incidentResponseRoutes = {
  // ...

router.post('/create-incident-response-plan', incidentResponseController.createIncidentResponsePlan);
router.patch('/update-incident-response-plan/:planId', incidentResponseController.updateIncidentResponsePlan);
};