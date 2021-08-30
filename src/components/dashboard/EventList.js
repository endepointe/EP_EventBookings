import React from 'react';
import { useSelector } from 'react-redux';

export const EventList = () => {
  const events = useSelector(state => state.eventList);
  console.log("events: ", typeof events);
  let n = 0;
  const renderEvents = Object.entries(events).map(event => (
    <article key={parseInt(event.id)}>
      <h3>{events[event.name]}</h3>
      <p>{events[event.summary]}</p>
    </article> 
  )
);

  return (
    <section>
      <h2>Events</h2>
      {renderEvents}
    </section> 
  )
}