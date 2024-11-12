import React, { useState } from 'react';
import AddEventForm from './AddEventForm.js'
import axios from 'axios';
import AddEmailForm from './AddEmailForm.js';


function InputButtonsContainer({ fetchEvents }) {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showAddEmail, setShowAddEmail] = useState(false);
    
    const addEvent = async (event) => {
        try {
          const response = await axios.post('http://127.0.0.1:5000/add_event', event);
          setShowAddEvent(false);
          fetchEvents();
        } catch (error) {
          console.error("Error adding event", error);
        }
      };
    
    const addEmail = async (email) => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/add_user', email);
        setShowAddEmail(false);
      } catch (error) {
        console.error("Error adding user", error);
      }
    }

    return (
      <div className="row">
        <div className="col">
          <button className="btn btn-primary w-100 border-0" onClick={() => setShowAddEvent(!showAddEvent)}> 
              {showAddEvent ? "Hide Add Event" : "Add Event"}
          </button>
              {showAddEvent && (
              <AddEventForm addEvent={addEvent} />
              )}
        </div>
        <div className="col">
          <button className="btn btn-primary w-100 bg-warning border-0" onClick={() => setShowAddEmail(!showAddEmail)}>
            {showAddEmail ? "Hide Email Box" : "Get Notified"}
          </button>
          {showAddEmail && (
            <AddEmailForm addEmail={addEmail} />
          )}
        </div>
      </div>
    )
}

export default InputButtonsContainer