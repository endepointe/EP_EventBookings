const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const LocalStrategy = require('passport-local').Strategy;
const LocalUser = require('../../psql_db/auth/local/findOrCreate');

// passport.use(new LocalStrategy(username, password, done) => {
// })

router.post('/create', async (req, res) => {
  console.log('req.body: ', req.body);
  let data = await LocalUser.findOrCreate(req.body);
  res.send(data)
})

module.exports = router;