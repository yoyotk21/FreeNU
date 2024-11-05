import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';
import EventsMap from './components/EventsMap'

function App() {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_events');
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/add_event', event);
      setShowAddEvent(false);
      fetchEvents();
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  const incEvent = async (eventId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/update_counter/${eventId}`, 
        {action: "increase"});
      fetchEvents();
    } catch (error) {
      console.log("Error increase counter for event", error);
    }
  }

  const decEvent = async (eventId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/update_counter/${eventId}`, 
        {action: "decrease"});
      fetchEvents();
    } catch (error) {
      console.log("Error increase counter for event", error);
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete_event/${eventId}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <Navbar />
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow p-4 mb-5 bg-white rounded">
            <EventsMap events={events} incEvent={incEvent} decEvent={decEvent} />
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowAddEvent(!showAddEvent)}
            >
              {showAddEvent ? "Hide Add Event" : "Add Event"}
            </button>
            {showAddEvent && (
              <AddEventForm addEvent={addEvent} />
            )}
          </div>
        </div>
        <div className="col-lg-4 ">
          <EventList events={events} incEvent={incEvent} decEvent={decEvent} />
        </div>
      </div>
    </div>
  );
}

export default App;