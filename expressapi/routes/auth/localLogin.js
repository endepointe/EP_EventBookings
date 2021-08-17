const express = require('express');
const router = express.Router();
const LocalUser = require('../../psql_db/auth/local/findOrCreate');

router.post('/login', async (req, res) => {
  let data = await LocalUser.findOne(req.body);
  console.log('/login data: ', data);
  res.send(data)
})

module.exports = router;