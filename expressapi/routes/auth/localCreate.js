const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const LocalUser = require('../../psql_db/auth/local/findOrCreate');

passport.use(new LocalStrategy(
  function(username, password, done) {
  //   LocalUser.findOne({ username: username }, function(err, user) {
  //     if (err) { return done(err); }
  //     if (!user) {
  //       return done(null, false, { message: 'Incorrect username.' });
  //     }
  //     if (!user.validPassword(password)) {
  //       return done(null, false, { message: 'Incorrect password.' });
  //     }
  //     return done(null, user);
  //   });
	// 	return done(null,{msg: 'created user'});
    return done(null);
  }
));

router.post('/create', (req, res) => {
  res.send({msg: "route: /account/create"})
});

router.get('/test',
  (req, res) => {
    console.log('route: /account/test');
    res.send({msg: "route: /account/test"});
  }
);

module.exports = router;