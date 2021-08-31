import React from 'react';
import { useSelector } from 'react-redux';

export const EventList = () => {
  const events = useSelector(state => state.eventList);
  console.log("events: ", typeof events);
  let n = 0;
  const renderEvents = Object.entries(events).map(event => (
    // console.log(event[0], event[1])
    <article key={event[0]}>
      <h3>{event[1].name}</h3>
      <p>{event[1].description}</p>
      <p>{event[1].summary}</p>
      <p>{event[1].start.utc}</p>
    </article>
  )); 

 

  return (
    <section>
      <h2>Events</h2>
      {renderEvents}
    </section> 
  )
}