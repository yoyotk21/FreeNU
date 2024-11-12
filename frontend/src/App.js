import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import InputButtonsContainer from './components/InputButtonsContainer';
import EventContainer from './components/EventContainer';

function App() {
  const [events, setEvents] = useState([]);

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
    <div className="container-fluid">
      <Navbar />
      <div className="card bg-transparent mt-5"></div>
      <div className="card bg-white shadow p-3">
        <EventContainer events={events} incEvent={incEvent} decEvent={decEvent}></EventContainer>
        <div className="mx-auto w-75 mt-4">
          <InputButtonsContainer fetchEvents={fetchEvents}/>
        </div>
      </div>
    </div>
  );
}

export default App;