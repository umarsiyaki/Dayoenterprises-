const paymentController = {
  // ...

  async makePayment(req, res) {
    const amount = req.body.amount;
    const paymentIntent = await createPaymentIntent(amount);
    res.send({ clientSecret: paymentIntent });
  }
};
```