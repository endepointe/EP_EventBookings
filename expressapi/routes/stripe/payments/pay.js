const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);
const {v4: uuidv4} = require('uuid');
const {validate} = require('uuid');

router.post('/pay', async (req, res) => {
  let uniqueKey = uuidv4();
  while (!validate(uniqueKey)) {
    uniqueKey = uuidv4(); 
  }
  try {
    let intent;
    if (req.body.payment_method_id) {
      intent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        payment_method: req.body.payment_method_id,
        amount: req.body.payment_amount,
        currency: 'usd',
        confirmation_method: 'manual',
        customer: req.body.customer,
        setup_future_usage: 'off_session', // attach cx to pm
        confirm: true, 
        capture_method: 'manual',// authorize now, capture later (7days)
        description: req.body.description,
      }, {
        idempotencyKey: uniqueKey, 
      });
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id
      );
    }
    await stripe.paymentMethods.attach(
      intent.payment_method, {customer: intent.customer} 
    );
    res.send(_generateResponse(intent));
  } catch (err) {
    console.error(err); 
    return res.send({error: err.message});
  }
});

const _generateResponse = (intent) => {
  console.log('intent: ', intent);
  // console.log('intent.payment_method: ', intent.payment_method)
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk' 
  ) {
    console.log('pi requires action')
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret 
    };
  } else if (intent.status === 'succeeded') {
    console.log('pi succeeded')
    return {
      success: true 
    } 
  } else if (intent.status === 'requires_capture') {
    console.log('capture pi in stripe dashboard')
    return {
      success: true,
      msg: 'Thank you. Your payment will be processed after vendor review.',
    }
  } else {
    return {error: 'Invalid PaymentIntent status'} 
  }
}

module.exports = router;