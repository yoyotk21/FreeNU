import {React, useState} from 'react';

function EventItem({ event, setEvent }) {
  return (
    <li className="list-group-item" style={{ cursor: 'pointer' }} onClick={() => setEvent(event)} >
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-1">{event.title}</h5>
      </div>
    </li>
  );
}

export default EventItem;