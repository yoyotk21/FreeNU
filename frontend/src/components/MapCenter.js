import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

function MapCenter({ centerEventId, events }) {
  const map = useMap();

  useEffect(() => {
    if (centerEventId !== null) {
      const centerEvent = events.find(event => event.id === centerEventId);
      if (centerEvent) {
        map.setView([centerEvent.latitude, centerEvent.longitude], map.getZoom(), { animate: true });
      }
    }
  }, [centerEventId, events, map]);

  return null; // This component does not render anything
}

export default MapCenter;
