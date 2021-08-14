const db = require('../../../psql_db/init');

const findOrCreate = async (data) => {
	console.log('local data: ', data);
	const user = {name: 'local user'}
	return user; 

	// try {
	// 	const userres = await db.oneOrNone('select * from localusers where id = $1', [data.id]);
	// 	const user = await userres;
	// 	console.log('findOrCreate user: ', user);
	// 	if (user === null || !user) {
	// 		const newuserres = await db.one('insert into localusers(id,name,avatar_url,provider) values($1,$2,$3,$4) returning id', [data.id, data.name, data.avatar_url, data.provider]);
	// 		const newUser = await newuserres;
	// 		console.log('findOrCreate newUser: ', newUser);
	// 		return newUser;
	// 	}
	// 	return user;
	// } catch (err) {
	// 	console.error(err);
	// 	return null; 
	// }
}

const findById = async (id) => {
	console.log(id)
	// const res = await db.oneOrNone('select * from googleusers where id = $1', [id]);
	// const user = await res;
	// console.log('findbyid: ', user)
	const user = null;
	return user;
}

module.exports = {
	findOrCreate: findOrCreate,
	findById: findById
}