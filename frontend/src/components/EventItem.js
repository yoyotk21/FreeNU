import {React, useState} from 'react';
import "./EventItem.css"

function EventItem({ event, setEvent, isHighlighted }) {
  return (
    <li className={isHighlighted ? "list-group-item border border-secondary selected": "list-group-item list-group-item-action"} style={{ cursor: 'pointer'}} onClick={() => setEvent(event)} >
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-1"> {event.title}</h5>
      </div>
    </li>
  );
}

export default EventItem;