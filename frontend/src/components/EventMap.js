import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker issue
let DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41]
});


L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
    },
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true} 
      eventHandlers={{
        dragend: (event) => {
          const { lat, lng } = event.target.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    >
      <Popup>Drag me or click elsewhere on the map to move me!</Popup>
    </Marker>
  );
}

function EventMap({position, setPosition}) {
  
  return (
    <MapContainer maxBounds={[[42.3198, -71.0692], [42.3498, -71.0992]]} center={position} maxZoom={18} minZoom={16} zoom={17} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker 
        position={position}
        setPosition={setPosition}
      >
        <Popup>Northeastern University</Popup>
      </LocationMarker>
    </MapContainer>
  );
}

export default EventMap;
