const express = require('express');
const router = express.Router();
const eventbrite = require('eventbrite').default;
const sdk = eventbrite({token: process.env.EVENTBRITE_PRIVATE_TOKEN});

// Getting Eventbrite event data:
// https://groups.google.com/g/eventbrite-api/c/5LjlFIi2umw?pli=1
// https://www.eventbrite.com/platform/api#/reference/event/list/list-events-by-organization

/*
  1. Retrieve a list of organizations
  2. Find all events listed with an organization id 
*/

router.get('/read', async (req, res) => {
  try {
  // 1
  // string response  
  let response = await sdk.request('/users/me/organizations/');
  let organizationID = await response.organizations[0].id;

  console.log('Organization id: ', organizationID); 
 
  // 2
  // array events
  let events = await sdk.request(`/organizations/${organizationID}/events/`);
  console.log('events: ', events);
  // Extract event data and send to client
  /*
    string id,
    object name,
    int capacity,
    object description, // deprecated?
    string summary,
    object logo,
    string venue_id,
    object start,
    ibject end,
    string status,
    string inventory_type
  */

  res.json(events);
  
  } catch (err) {
    console.error(err); 
    res.send({msg: err});
  }
});

module.exports = router;