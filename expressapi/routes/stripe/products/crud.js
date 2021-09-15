const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.get('/event-packages/all', async (req, res) => {
  const packageIDs = [
    'prod_K9SkSMJHQC3VM9',
    'prod_K9SgG0FUv3k5qg',
    'prod_K9Sd6RJdLFA4Rb',
  ]

  ///*
  /////////////////
  // Use the stripe api to combine products and prices based on unique
  // product id.

  async function s() {
    const list = []
    for (let i = 0; i < packageIDs.length; i++) {
      try {
        let price_with_product = await stripe.prices.list({
          product: packageIDs[i],
          expand: ['data.product'],
        })
        list.push({
          product: price_with_product.data[0].product, 
          price: price_with_product.data[0].unit_amount
        });
      } catch (err) {
        console.error(err);
      }
    }
    return list; 
  }
  try {
    const productList = await s()
    res.send(productList);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;