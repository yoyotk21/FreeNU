import React from 'react'

function SelectedEvent({ event }) {
    return (
        <div>
            {event != null ? (<div className="mt-3">
                <p className="mb-1"><strong>Name:</strong> {event.title} </p>
                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
                <p className="mb-1"><strong>Location:</strong> {event.location}</p>
            </div>) : <p>No event selected</p>}
        </div>
    )
}

export default SelectedEvent