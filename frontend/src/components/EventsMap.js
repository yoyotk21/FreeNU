import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import EventItem from './EventItem'

// Fix default marker issue
let DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function EventsMap({ events, deleteEvent }) {
  return (
    <MapContainer center={[42.3398, -71.0892]} zoom={17} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event, index) => (
        <Marker key={index} position={[event.latitude, event.longitude]}>
         <Popup>
            <EventItem event={event} isExpanded={true} deleteEvent={deleteEvent} />
        </Popup>
  </Marker>
))}
    </MapContainer>
  );
}

export default EventsMap;