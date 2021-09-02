const express = require('express');
const router = express.Router();

const stripe = require('stripe')(`${process.env_STRIPE_SK_TEST}`);

router.post('/', async (req, res) => {
	const customer = await stripe.customers.create({
		email: 'test@email.com',
		discription: 'test customer create',
	})
	console.log('stripe customer created: ', customer);
	res.send({msg: '/stripe/customer/create'});
});

module.exports = router;