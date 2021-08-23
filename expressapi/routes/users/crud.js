const express = require('express');
const router = express.Router();
const User = require('../../psql_db/users/crud');

router.post('/find', async (req, res) => {
  console.log(req.body);
  let userEmail = await User.find(req.body);
  res.send(userEmail);
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  let userEmail = await User.create(req.body);
  res.send(userEmail);
})

module.exports = router;