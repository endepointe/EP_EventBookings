require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const users = require('./routes/users/crud');
const hubspot = require('./routes/hubspot/crud');
const eventbrite = require('./routes/eventbrite/crud');
const createStripeCustomer = require('./routes/stripe/customer/create');
const findStripeCustomer = require('./routes/stripe/customer/find');
const stripeProducts = require('./routes/stripe/products/crud');
const app = express();
const port = 8001;

const corsOptions = {
	origin: 'http://localhost:8000',
	credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/users', users);
app.use('/hubspot', hubspot);
app.use('/eventbrite', eventbrite);
app.use('/stripe/customer/find', findStripeCustomer);
app.use('/stripe/customer/create', createStripeCustomer);
app.use('/stripe/products/', stripeProducts);

app.get('/', async (req,res) => {
	res.json({msg:'api route: /'})
});

app.listen(port, () => {
	console.log(`api running on port ${port}`)
});