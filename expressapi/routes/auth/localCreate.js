const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const LocalUser = require('../../psql_db/auth/local/findOrCreate');


router.post('/create', async (req, res) => {
  console.log(req.body);
  let response = await LocalUser.findOrCreate(req.body);
  let data = await response;
  res.send(data);
})

module.exports = router;