const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const LocalStrategy =  require('passport-local').Strategy;
// const LocalUser = require('../../psql_db/auth/local/findOrCreate');

router.post('/login', async (req, res) => {
  res.send({msg: '/account/login'})
})

module.exports = router;