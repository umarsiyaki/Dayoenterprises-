const businessContinuityRoutes = {
  // ...

  router.post('/create-business-continuity-plan', businessContinuityController.createBusinessContinuityPlan);
  router.patch('/update-business-continuity-plan/:planId', businessContinuityController.updateBusinessContinuityPlan);
};