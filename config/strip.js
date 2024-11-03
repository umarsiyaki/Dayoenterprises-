const stripe = require('stripe')('your-stripe-secret-key');

const stripeConfig = {
  // ...
};

const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd'
  });
  return paymentIntent.client_secret;
};