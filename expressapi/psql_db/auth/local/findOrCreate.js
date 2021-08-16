const db = require('../../../psql_db/init');
const bcrypt = require('bcryptjs');

const findOrCreate = async (data) => {
	console.log('local data: ', data);
	try {
		const userres = await db.oneOrNone('select * from localusers where id = $1', [data.username]);
		const user = await userres;
		console.log('findOrCreate user: ', user);
		if (user === null || !user) {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			const newuserres = await db.one('insert into localusers(id,password,provider) values($1,$2,$3) returning id', [data.username, hashedPassword, data.provider]);
			const newUser = await newuserres;
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
			console.log('start bcrypt with: ', data.password)
			bcrypt.compare(data.password, user.password, (err, res) => {
				if (err) throw err;
				console.log('do the passwords match? ', res);
				if (res === true) {
					user.result = true;
					console.log('user is now: ', user);
					return user;
				}
			})
			// return user;
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
	findOrCreate: findOrCreate,
	findOne: findOne,
	findById: findById
}