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
  // First solution
  // Use the stripe api to combine products and prices based on unique
  // product id.
  // O(n) - check this. the awaits are still looping, just not using my
  //        resources.

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
  // end first solution
  /////////////////////

  //
  //
  //
  //
  //

  /*
  ////////////////// 
  // Second solution
  // Get all products and prices and compare, using my own server resources. 
  // O(n^2)
  const productList = [];

  const products = await stripe.products.list({
    ids: packageIDs,
  });

  const prices = await stripe.prices.list();

  async function combineProductPrice(products, prices, list) {
    for (let i = 0; i < prices.data.length; i++) {
      for (let j = 0; j < products.data.length; j++) {
        if (prices.data[i].product === products.data[j].id) {
          list.push({
            product: products.data[j],
            price: prices.data[i].unit_amount
          })
        }
      }
    }
    return productList;
  }

  try {
    combineProductPrice(products, prices, productList);
    res.send(productList);
  } catch (err) {
    console.error(err)
    res.send({msg: 'something went wrong, try again'})
  }
  // end Second solution
  //////////////////////
  */
});

module.exports = router;