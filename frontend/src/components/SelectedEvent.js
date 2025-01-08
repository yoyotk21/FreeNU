import React from 'react';

function SelectedEvent({ event }) {
  const deleteEvent = async (eventId, isStillHere) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update_counter/${eventId}`, {
        method: 'POST', // Use POST for your request
        headers: {
          'Content-Type': 'application/json', // Set appropriate headers
        },
        body: JSON.stringify({ isStillHere }), // Send payload as JSON
      });

      if (response.ok) {
        alert('Event status updated successfully');
      } else {
        console.error('Failed to update event', response.status);
      }
    } catch (error) {
      console.error('Error updating event', error);
    }
  };

  return (
    <div className="shadow p-3 pt-0 border mt-3" style={{ maxHeight: '30vh', overflow: 'auto' }}>
      {event ? (
        <div className="mt-3">
          <p className="mb-1">
            <strong>Name:</strong> {event.title}
          </p>
          <p className="mb-1">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="mb-1">
            <strong>End Time:</strong> {event.end_time}
          </p>
          <p className="mb-1">
            <strong>Location:</strong> {event.location}
          </p>
          <div className="card">
            <p>Is this event still here?</p>
            <button
              className="btn btn-primary w-10 bg-success border-0"
              onClick={() => deleteEvent(event.id, true)} // Pass eventId and status
            >
              Yes
            </button>
            <button
              className="btn btn-primary w-10 bg-danger border-0"
              onClick={() => deleteEvent(event.id, false)} // Pass eventId and status
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3">No event selected</p>
      )}
    </div>
  );
}

export default SelectedEvent;
