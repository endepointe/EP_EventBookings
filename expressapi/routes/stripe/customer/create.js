const express = require('express');
const router = express.Router();

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.post('/', async (req, res) => {
	try {
		const customer = await stripe.customers.create({
			email: req.body.email,
		})
		res.send(customer);
	} catch (err) {
		console.error(err);	
		res.send(null);
	}
});

module.exports = router;