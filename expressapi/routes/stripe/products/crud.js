const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.get('/event-packages/all', async (req, res) => {
  const packageIDs = [
    'prod_K9SkSMJHQC3VM9',
    'prod_K9SgG0FUv3k5qg',
    'prod_K9Sd6RJdLFA4Rb',
  ]
  const products = await stripe.products.list({ids: packageIDs});
  res.send(products);
});

router.get('/all', async (req, res) => {
  const products = await stripe.products.list();
  res.send(products);
});

module.exports = router;