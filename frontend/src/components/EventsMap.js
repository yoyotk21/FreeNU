import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import diddyPng from '../assets/diddy2.png';
import EventItem from './EventItem'
import MapCenter from './MapCenter';

// Fix default marker issue
let DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41]
});

let SelectedIcon = L.icon({
  iconUrl: diddyPng,  // Use a different URL for a custom icon color if available
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],
  iconSize: [25, 41], // You can adjust size or color to differentiate
  className: 'selected-marker'
});

let DefaultCenter = [42.3398, -71.0892]
let center = null;

L.Marker.prototype.options.icon = DefaultIcon;

function EventsMap({ events, incEvent, decEvent, selectedEventId, centerEventId }) {

  return (
    <MapContainer maxBounds={[[42.3198, -71.0692], [42.3498, -71.0992]]} center={DefaultCenter} maxZoom={18} minZoom={16} zoom={17} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter centerEventId={centerEventId} events={events} />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.latitude, event.longitude]}
          icon={event.id === selectedEventId ? SelectedIcon : DefaultIcon}
        >
          <Popup>
            <EventItem event={event} isExpanded={true} incEvent={incEvent} decEvent={decEvent} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default EventsMap;