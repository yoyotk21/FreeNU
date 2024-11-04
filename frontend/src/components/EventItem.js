import {React, useState} from 'react';

function EventItem({ event, incEvent, decEvent, isExpanded, toggleExpandEvent }) {
  let [show, setShow] = useState(toggleExpandEvent == null)
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
          {show ? (
            <div>
              <span>Is this event still here?</span>
            <button className="btn btn-sm btn-primary m-2" onClick={(e) => { e.stopPropagation(); incEvent(event.id); setShow(false); }}>Yes</button>
            <button className="btn btn-sm btn-primary " onClick={(e) => { e.stopPropagation(); decEvent(event.id);  setShow(false);}}>No</button>
        
            </div>
        ) : <div></div>}
          </div>
      )}
    </li>
  );
}

export default EventItem;