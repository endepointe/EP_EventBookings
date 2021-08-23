const db = require('../../psql_db/init');

const find = async (data) => {
  console.log(data)
  try {
    let res = await db.oneOrNone('select email from users where email = $1', [data.email])
    let user = await res;
    return user;
  } catch(err) {
    user.error = err.name;
    return user;
  }
};

const create = async (data) => {
  try {
    let newUser = await db.one('insert into users(email) values($1) returning email', [data.email]);
    return newUser;
  } catch(err) {
    console.error(err); 
    newUser.error = err.name;
    return newUser;
  }
}

module.exports = {
	find: find,
  create: create,
}