const securityPolicyRoutes = {
  // ...

  router.post('/create-policy', securityPolicyController.createPolicy);
  router.patch('/update-policy/:policyId', securityPolicyController.updatePolicy);
};