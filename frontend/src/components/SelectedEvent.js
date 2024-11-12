import React from 'react'
import axios from 'axios'

function SelectedEvent({ event }) {

    const deleteEvent = async (eventId) => {
        try {
          await axios.delete(`http://127.0.0.1:5000/delete_event/${eventId}`);
          alert("Event deleted successfully");
        } catch (error) {
          console.error("Error deleting event", error);
        }
      };

    return (
        <div className="shadow p-3 pt-0 border mt-3" style={{"max-height": "20vh", overflow: "auto"}}>
            {event != null ? (<div className="mt-3">
                <p className="mb-1"><strong>Name:</strong> {event.title} </p>
                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
                <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                <button className="btn btn-primary w-33 bg-danger border-0" onClick={deleteEvent}>delete event</button>
            </div>) : <p className="mt-3">No event selected</p>}
        </div>
    )
}

export default SelectedEvent