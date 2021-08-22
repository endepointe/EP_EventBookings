const db = require('../../psql_db/init');

const find = async (data) => {
  console.log(data)
  try {
    let res = await db.oneOrNone('select email from users where email = $1', [data.email])
    let user = await res;
    console.log(user); 
    if (user === null || !user) {
      let newUser = await db.one('insert into users(email) values($1) returning email', [data.email]);
      res.send(newUser);
    }
    res.send(user);
  } catch(err) {
    console.error(err); 
  }
};

module.exports = {
	find: find,
}