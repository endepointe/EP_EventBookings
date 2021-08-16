const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const LocalStrategy =  require('passport-local').Strategy;
const LocalUser = require('../../psql_db/auth/local/findOrCreate');

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     LocalUser.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

router.post('/login', async (req, res) => {
  let data = await LocalUser.findOne(req.body);
  console.log('/login data: ', data);
  res.send({data})
})

module.exports = router;