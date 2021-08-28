const express = require('express');
const router = express.Router();
const eventbrite = require('eventbrite').default;
const sdk = eventbrite({token: process.env.EVENTBRITE_PRIVATE_TOKEN});
//164937122373
//https://www.eventbriteapi.com/v3/events
router.get('/read', (req, res) => {
  sdk.request('/events/164937122373').then(response => {
    console.log('eb response: ', response); 
  }).catch(err => console.error(err));
  res.send({msg: 'eb route'});
});

module.exports = router;