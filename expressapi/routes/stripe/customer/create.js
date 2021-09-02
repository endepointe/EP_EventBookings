const express = require('express');
const router = express.Router();

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

router.post('/', async (req, res) => {
	console.log('stripe cx creation: ', req.body);
	try {
		const customer = await stripe.customers.create({
			email: 'test@email.com',
			description: 'test customer create',
		})
		console.log('stripe customer created: ', customer);
		res.send({msg: '/stripe/customer/create'});
	} catch (err) {
		console.error(err);	
		res.send({msg: err});
	}
});

module.exports = router;