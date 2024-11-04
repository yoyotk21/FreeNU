import React from 'react';

function EventItem({ event, deleteEvent, isExpanded, toggleExpandEvent }) {
  return (
    <li className="list-group-item" style={{ cursor: 'pointer' }} onClick={toggleExpandEvent}>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-1">{event.title}</h5>
      </div>
      {isExpanded && (
        <div className="mt-3">
          <p className="mb-1"><strong>Description:</strong> {event.description}</p>
          <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
          <p className="mb-1"><strong>Location:</strong> {event.location}</p>
          <button className="btn btn-danger mt-2" onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }}>Delete Event</button>
        </div>
      )}
    </li>
  );
}

export default EventItem;