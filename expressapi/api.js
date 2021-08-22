require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const users = require('./routes/users/crud');
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

app.get('/', async (req,res) => {
	res.json({msg: 'api route: /'})
});

app.listen(port, () => {
	console.log(`api running on port ${port}`)
});