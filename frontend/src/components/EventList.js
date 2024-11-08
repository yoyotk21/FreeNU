import React, { useState } from 'react';
import EventItem from './EventItem';

function EventList({ events, incEvent, decEvent, selectedEventId, onEventSelect }) {
  const [expandedEventId, setExpandedEventId] = useState(null);

  const toggleExpandEvent = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
    onEventSelect(eventId);  // Call the selection function
  };

  return (
    <div className="card shadow p-4 bg-white rounded">
      <h2 className="text-center mb-4">Events</h2>
      {events.length > 0 ? (
        <ul className="list-group">
          {events.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              incEvent={incEvent}
              decEvent={decEvent}
              isExpanded={expandedEventId === event.id}
              toggleExpandEvent={() => toggleExpandEvent(event.id)}
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