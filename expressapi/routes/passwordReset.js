const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const LocalUser = require('../psql_db/auth/local/findOrCreate');
// consider adding a token table
//https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m

router.post('/', async (req, res) => {
  try {
    let response = await LocalUser.findById(req.body.email);
    let user = await response;
    console.log('reset password for user: ', user);
    // instead of sending the id to the user,
    // create a token and email it to the user.
    res.send(user.id);
  } catch(err) {
    console.error(err); 
    res.send(null);
  }
})

module.exports = router;