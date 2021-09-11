const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.post('/pay', async (req, res) => {
  console.log(req.body.payment_method_id, req.body.payment_amount)
  try {
    let intent;
    if (req.body.payment_method_id) {
      intent = await stripe.paymentIntents.create({
        payment_method: req.body.payment_method_id,
        amount: req.body.payment_amount,
        currency: 'usd',
        confirmation_method: 'manual',
        // customer: req.body.customer,
        setup_future_usage: 'off_session',
        confirm: true, 
        capture_method: 'manual',// authorize now, capture later (7days)
      });
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id
      );
    }
    res.send(_generateResponse(intent));
  } catch (err) {
    console.error(err); 
    return res.send({error: err.message});
  }
});

const _generateResponse = (intent) => {
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk' 
  ) {
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret 
    };
  } else if (intent.status === 'succeeded') {
    console.log('attach customer object to pi')
    return {
      success: true 
    } 
  } else {
    return {error: 'Invalid PaymentIntent status'} 
  }
}

module.exports = router;