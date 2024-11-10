import React, { useState } from 'react';
import EventsMap from './EventsMap';
import EventList from './EventList';
import SelectedEvent from './SelectedEvent'

function EventContainer({ events, incEvent, decEvent,  }) {
  const [centerEventId, setCenterEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    if (event != null) {
      const isSameEvent = event === selectedEvent;
      setSelectedEvent(isSameEvent ? null : event);
      setCenterEventId(isSameEvent ? null : event.id);
    }
  };

  return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                  <div className="card shadow p-2 bg-white rounded">
                    <EventsMap 
                        events={events} 
                        incEvent={incEvent} 
                        decEvent={decEvent}
                        selectedEventId={selectedEvent == null? null : selectedEvent.id}
                        centerEventId={centerEventId}
                        onClick= {handleEventSelect}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                    <EventList 
                            events={events} 
                            incEvent={incEvent} 
                            decEvent={decEvent} 
                            selectedEventId={selectedEvent == null? null : selectedEvent.id} 
                            onEventSelect={handleEventSelect}
                        />
                    <SelectedEvent event={selectedEvent == null? null : selectedEvent} />
                </div>
            </div>
        </div>
  );
}

export default EventContainer;