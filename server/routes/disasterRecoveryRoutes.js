const disasterRecoveryRoutes = {
  // ...

  router.post('/create-disaster-recovery-plan', disasterRecoveryController.createDisasterRecoveryPlan);
  router.patch('/update-disaster-recovery-plan/:planId', disasterRecoveryController.updateDisasterRecoveryPlan);
};