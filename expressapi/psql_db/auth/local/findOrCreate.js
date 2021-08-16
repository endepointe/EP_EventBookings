const db = require('../../../psql_db/init');

const findOrCreate = async (data) => {
	console.log('local data: ', data);
	try {
		const userres = await db.oneOrNone('select * from localusers where id = $1', [data.username]);
		const user = await userres;
		console.log('findOrCreate user: ', user);
		if (user === null || !user) {
			const newuserres = await db.one('insert into localusers(id,password,provider) values($1,$2,$3) returning id', [data.username, data.password, data.provider]);
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

const findById = async (id) => {
	console.log(id)
	const res = await db.oneOrNone('select * from localusers where id = $1', [id]);
	const user = await res;
	console.log('findbyid: ', user)
	return user;
}

module.exports = {
	findOrCreate: findOrCreate,
	findById: findById
}