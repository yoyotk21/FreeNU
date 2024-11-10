import React, { useState } from 'react';
import AddEventForm from './AddEventForm.js'
import axios from 'axios';


function AddEventContainer({ fetchEvents }) {
    const [showAddEvent, setShowAddEvent] = useState(false);
    
    const addEvent = async (event) => {
        try {
          const response = await axios.post('http://127.0.0.1:5000/add_event', event);
          setShowAddEvent(false);
          fetchEvents();
        //   fetchEvents();
        } catch (error) {
          console.error("Error adding event", error);
        }
      };

    return (
    <div>
        <button className="btn btn-primary mt-4" onClick={() => setShowAddEvent(!showAddEvent)}> 
            {showAddEvent ? "Hide Add Event" : "Add Event"}
        </button>
            {showAddEvent && (
            <AddEventForm addEvent={addEvent} />
        )}
    </div>
    )
}

export default AddEventContainer