const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.post('/', async (req, res) => {
  console.log('email: ',req.body.email)
  try {
    const customers = await stripe.customers.list({email: req.body.email.toLowerCase()});
    console.log('find cx req: ',customers);
    res.send(customers)
  } catch (err) {
    console.error(err);
    res.send(null)
  }
});

module.exports = router;