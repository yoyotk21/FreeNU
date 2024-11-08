import React, { useState } from 'react';
import EventsMap from './EventsMap';
import EventList from './EventList';

function EventContainer({ events, incEvent, decEvent }) {
  const [selectedEventId, setSelectedEventId, mapCenterEvent, setMapCenterEvent] = useState(null);
  const [centerEventId, setCenterEventId] = useState(null);

  const handleEventSelect = (eventId) => {
    const isSameEvent = eventId === selectedEventId;
    setSelectedEventId(isSameEvent ? null : eventId);
    setCenterEventId(isSameEvent ? null : eventId);
  };

  return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <EventsMap 
                        events={events} 
                        incEvent={incEvent} 
                        decEvent={decEvent}
                        selectedEventId={selectedEventId}
                        centerEventId={centerEventId}
                    />
                </div>
                <div className="col-lg-4">
                    <EventList 
                            events={events} 
                            incEvent={incEvent} 
                            decEvent={decEvent} 
                            selectedEventId={selectedEventId} 
                            onEventSelect={handleEventSelect}
                        />
                </div>
            </div>
        </div>
  );
}

export default EventContainer;