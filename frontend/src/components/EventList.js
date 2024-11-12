import React, { useState } from 'react';
import EventItem from './EventItem';
import "./EventList.css"

function EventList({ events, onEventSelect, selectedEventId}) {

  return (
    <div className="card shadow p-4 bg-white rounded">
      <h2 className="text-center mb-4">Events</h2>
      {events.length > 0 ? (
        <ul className="list-group">
          <div class="list-item">
          {events.map((event) => (
            <EventItem
              isHighlighted={selectedEventId != null && event.id==selectedEventId}
              event={event}
              setEvent={onEventSelect}
            />
          ))}
          </div>
        </ul>
        
      ) : (
        <p className="text-center">No events available. Please add some events!</p>
      )}
    </div>
  );
}

export default EventList;