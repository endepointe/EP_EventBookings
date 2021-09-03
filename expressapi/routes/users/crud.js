const express = require('express');
const router = express.Router();
const User = require('../../psql_db/users/crud');

// host/users/find
router.post('/find', async (req, res) => {

  console.log('req.body in crud.js: ', req.body);

  let userEmail = await User.find(req.body.email);
  console.log('userEmail: ', userEmail);
  res.send(userEmail);
});

// host/users/create
router.post('/create', async (req, res) => {
  console.log(req.body);
  let userEmail = await User.create(req.body);
  res.send(userEmail);
})

module.exports = router;