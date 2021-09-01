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
  let organizationResponse = await sdk.request('/users/me/organizations/');
  let organizationID = await organizationResponse.organizations[0].id;

  console.log('Organization id: ', organizationID); 
 
  // 2
  // array events
  let eventResponse = await sdk.request(`/organizations/${organizationID}/events/`);
  let data = await eventResponse;

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
    object end,
    string status,
    string inventory_type
  */

  // get the venue address with venue_id
  // https://www.eventbrite.com/platform/api#/reference/venue/retrieve-a-venue
  // let venueData = await sdk.request(`/venues/${venue_id}/`);
  // let venueAddress = await venueData.address.localized_address_display;
  // console.log(await venueAddress);
  console.log(data.events[24].venue_id)
  data.events.forEach(async event => {
    console.log(event.venue_id);
    // left off here
    ry {
      if (event.venue_id) {
        let venueData = await sdk.request(`/venues/${event.venue_id}/`);
        let venueAddress = await venueData.address.localized_address_display;
        console.log(venueAddress);
        event.address = venueAddress;
      }
    } catch (err) {
      console.error(err);
    }
  })

  const newEvent = (eventData) => {
    let {
      id, 
      name, 
      capacity, 
      description, 
      summary, 
      logo, 
      venue_id, 
      address,
      start, 
      end, 
      status, 
      inventory_type, 
    } = eventData;
    // todo: parse description text and create an object

    return {
      id, 
      name: name.text, 
      capacity, 
      description: description.text, 
      summary, 
      logo: logo.url, 
      venue_id, 
      address,
      start: {timezone: start.timezone, local: start.local, utc: start.utc}, 
      end: {timezone: end.timezone, local: end.local, utc: end.utc},
      status, 
      inventory_type
    };
  }

  let liveEvents = [];

  for (let i = 0; i < data.events.length; i++) {
    if (data.events[i].status === 'live') {
      liveEvents.push(newEvent(data.events[i]));
    }
  }

  res.json(liveEvents);
  
  } catch (err) {
    console.error(err); 
    res.send({msg: err});
  }
});

module.exports = router;