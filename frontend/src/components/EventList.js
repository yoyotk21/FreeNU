import React, { useState } from 'react';
import EventItem from './EventItem';

function EventList({ events, onEventSelect }) {


  return (
    <div className="card shadow p-4 bg-white rounded">
      <h2 className="text-center mb-4">Events</h2>
      {events.length > 0 ? (
        <ul className="list-group">
          {events.map((event) => (
            <EventItem
              event={event}
              setEvent={onEventSelect}
            />
          ))}
        </ul>
        
      ) : (
        <p className="text-center">No events available. Please add some events!</p>
      )}
    </div>
  );
}

export default EventList;