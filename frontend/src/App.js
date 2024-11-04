import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';

// CHANGING THINGS

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
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/add_event', event);
      alert(response.data.message);
      setShowAddEvent(false);
      fetchEvents();
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

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
    <div className="container mt-5">
      <Navbar />
      <div className="card shadow p-4 mb-5 bg-white rounded">
        <h1 className="text-center mb-4">Welcome to FreeNU</h1>
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowAddEvent(!showAddEvent)}
        >
          {showAddEvent ? "Hide Add Event" : "Add Event"}
        </button>
        {showAddEvent && (
          <AddEventForm addEvent={addEvent} />
        )}
      </div>
      <EventList events={events} deleteEvent={deleteEvent} />
    </div>
  );
}

export default App;
