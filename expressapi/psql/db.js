const pgp = require('pg-promise')();

const cn = {
	host: process.env.EB_HOST,
	port: 5432,
	database: process.env.EB_DATABASE,
	user: process.env.EB_USERNAME,
	password: process.env.EB_PASSWORD,
	ssl: {rejectUnauthorized: false},
	max: 30 // use up to 30 connections
};

const db = pgp(cn);

module.exports = db;