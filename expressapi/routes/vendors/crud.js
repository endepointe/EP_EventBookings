const express = require('express');
const router = express.Router();
const Vendor = require('../../psql_db/vendors/crud');

// host/users/find
router.post('/find', async (req, res) => {

  console.log('req.body in crud.js: ', req.body);

  let vendor = await User.find(req.body.vendor_id);
  console.log('vendor: ', vendor);
  res.send(vendor);
});

// host/users/create
router.post('/create', async (req, res) => {
  console.log(req.body);
  let vendor = await User.create(req.body);
  res.send(userEmail);
})

module.exports = router;