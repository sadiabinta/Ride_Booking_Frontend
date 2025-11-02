import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type Coords = [number, number];

export const MapBoundsUpdater: React.FC<{ routeCoords: Coords[] }> = ({
  routeCoords,
}) => {
  const map = useMap();

  useEffect(() => {
    if (routeCoords.length > 0) {
      // Create a LatLngBounds object from the array of coordinates
      const bounds = L.latLngBounds(routeCoords);

      // Fit the map view to the calculated bounds with some padding (e.g., 50 pixels)
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routeCoords, map]);

  return null; // This component doesn't render anything visible
};
