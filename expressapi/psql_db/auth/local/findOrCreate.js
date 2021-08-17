const db = require('../../../psql_db/init');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createOne = async (data) => {
	console.log('local data: ', data);
	try {
		const userres = await db.oneOrNone('select * from localusers where id = $1', [data.username]);
		const user = await userres;
		console.log('findOrCreate user: ', user);
		if (user === null || !user) {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			const newuserres = await db.one('insert into localusers(id,password,provider) values($1,$2,$3) returning id', [data.username, hashedPassword, data.provider]);
			const newUser = await newuserres;
			let token = jwt.sign({
				id: newUser.id,
				key: hashedPassword,
				provider: newUser.provider 
			}, process.env.KEY_PRIVATE, {expiresIn: 60*60*24*30});
			newUser.token = token;
			console.log('token: ', token);
			newUser.result = true;
			console.log('findOrCreate newUser: ', newUser);
			return newUser;
		}
		return {result: false, msg: 'user exists'} 
	} catch (err) {
		console.error(err);
		return null; 
	}
}

const findOne = async (data) => {
	try {
		const res = await db.oneOrNone('select * from localusers where id = $1', [data.username]);
		const user = await res;
		if (user === null || !user) {
			return false;
		} else {
			console.log('findOne data obj: ', data)
			let validToken;
			jwt.verify(data.token, process.env.KEY_PRIVATE, function(err, result) {
				console.log('verified token: ', result.key);
				if (result.key === user.password) {
					validToken = true;	
				}
			})
			user.token = data.token;
			user.result = bcrypt.compareSync(data.password, user.password);
			console.log('user.result: ', user.result);
			return user;
		}
	} catch (err) {
		console.error(err);
		return null;
	}
}

const findById = async (id) => {
	console.log(id)
	const res = await db.oneOrNone('select * from localusers where id = $1', [id]);
	const user = await res;
	console.log('findbyid: ', user)
	return user;
}

module.exports = {
	createOne: createOne,
	findOne: findOne,
	findById: findById
}