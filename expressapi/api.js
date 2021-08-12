require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;
const db = require('./psql/db');

const corsOptions = {
	origin: 'http://localhost:8000'
}

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', async (req,res) => {
	console.log(db);
	let response = await db.any('select * from test;');
	let data = await response;
	console.log(data);
	res.json({msg: 'api route: /'})
});

app.listen(port, () => {
	console.log(`api running on port ${port}`)
});