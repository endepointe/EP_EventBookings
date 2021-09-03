const db = require('../../psql_db/init');

// before going into production, tokenize all user data before saving
// it to the db.

const find = async (email) => {

  try {
    console.log('db/users/find: ', email);
    let res = await db.oneOrNone('select email from users where email = $1', [email])
    let user = await res;
    console.log('found user: ', user);
    return user;
  } catch(err) {
    user.error = err.name;
    return user;
  }
};

const create = async (data) => {

  console.log('db/users/create/: ', data);

  try {
    let newUser = await db.one('insert into users(email) values($1) returning email', [data.email]);
    newUser.error = false;
    return newUser;
  } catch(err) {
    console.error(err); 
    newUser.error = true;
    return newUser;
  }
}

module.exports = {
	find: find,
  create: create,
}