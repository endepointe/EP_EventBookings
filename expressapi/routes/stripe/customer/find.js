const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.post('/', async (req, res) => {
  console.log('email: ',req.body.email)
  res.json(req.body.email)
});

module.exports = router;