const express = require('express');
const router = express.Router();
const User = require('../../psql_db/users/crud');

router.post('/find', async (req, res) => {
  console.log(req.body);
  console.trace();
  let response = await User.find(req.body);
  res.send(response);
});

module.exports = router;