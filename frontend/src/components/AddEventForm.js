import React, { useState } from 'react';
import EventMap from './EventMap'

function AddEventForm({ addEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState([
    42.33710927223315, 
    -71.09044790267946])

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ title, description, end_time: endTime, location, latitude: position[0], longitude: position[1] });
    setTitle("");
    setDescription("");
    setEndTime("");
    setLocation("");
  };

  return (
    <div className="card p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <EventMap position={position} setPosition={setPosition} />
        <button className="btn btn-success w-100" type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEventForm;
