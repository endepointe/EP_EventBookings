import React, {useEffect,useState} from 'react'
import {events} from './event_data/events';
import {navigate} from '@reach/router';

export default function VendorCheckout(props) {
  const [content, setContent] = useState({});

  useEffect(() => {
    console.log(props.location.state.event.id) 
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === 4321) {
        setContent(events[i]);
        break;
      } 
    }
    if (props.location.state === null) {
      navigate('dashboard'); 
    }
  }, [content]);
  console.log(content.content)
  return (
    <div>
      <h3>{props.location.state.event.summary}</h3> 
      <h1>{props.location.state.event.name}</h1>

      <p>{content?.id}</p>
      <ul>
        {/* {content?.content.map(c => (
          <li>{c}</li> 
        ))}  */}
      </ul>
      <p>This event is Free to attend, everyone is welcome to support local veteran entrepreneurs, shop quality goods and services.</p>

      <p>This event will showcase 30 of the best veteran, military & spouse-owned businesses under one roof.</p>

      <p>Jewelry | Woodworking | Health & Wellness | Home Improvement | Apparel | Food |Luxury Fragrances | Roasted to Order Coffee and More</p>

      <p>Get your tickets to Engage, Support, Grow... Free and open to the public.</p>

      <p>You don't have to be a Veteran to support Veteran Businesses. Get your FREE ticket to support the local veteran-owned businesses. Bring your family and share this event with a friend.</p>

      <h2>Vendors Reserve Your Space Now</h2>
      <h4>Vendor Qualification:</h4>
      <ul>
        <li>Must be a Veteran, Military Spouse, and Dependents (Must have ID)</li> 
        <li>Must sell a product (unfortunately no service vendors allowed at this event).</li>
      </ul>
    </div> 
  )
}