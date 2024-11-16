import React from 'react'

function SelectedEvent({ event }) {

  const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/update_counter/${eventId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {    
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin' : '*' ,
              'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept',
              'Access-Control-Allow-Methods' : 'DELETE',
               'mode'  : 'cors' 
              }, 
        });
        
        if (response.ok) {
            alert("Event deleted successfully");
        } else {
            console.error("Failed to delete event", response.status);
        }
    } catch (error) {
        console.error("Error deleting event", error);
    }
};

    return (
        <div className="shadow p-3 pt-0 border mt-3" style={{"max-height": "30vh", overflow: "auto"}}>
            {event != null ? (<div className="mt-3">
                <p className="mb-1"><strong>Name:</strong> {event.title} </p>
                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                <p className="mb-1"><strong>End Time:</strong> {event.end_time}</p>
                <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                {event != null ? (<div className="card">
                  Is this event still here?
                  <button className="btn btn-primary w-10 bg-success border-0" onClick={deleteEvent}>yes</button>
                  <button className="btn btn-primary w-10 bg-danger border-0" onClick={deleteEvent}>No</button>
                  </div>) : <div></div>}
            </div>) : <p className="mt-3">No event selected</p>}
        </div>
    )
}

export default SelectedEvent