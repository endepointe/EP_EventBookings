const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
// const GoogleUser = require('../../psql_db/auth/google/findOrCreate');

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
// 		return done(null,{msg: 'create user'});
//   }
// ));

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

router.post('/login', async (req, res) => {
  console.log(req.body);
  res.send({msg: '/account/login touched'})
})

module.exports = router;