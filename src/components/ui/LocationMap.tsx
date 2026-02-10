import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Vite/React
interface IconDefaultPrototype {
  _getIconUrl?: string;
}

const iconPrototype = L.Icon.Default.prototype as IconDefaultPrototype;
if (iconPrototype._getIconUrl !== undefined) {
  delete iconPrototype._getIconUrl;
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationMapProps {
  latitude: number | null;
  longitude: number | null;
  city?: string | null;
}

function MapUpdater({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude, map]);

  return null;
}

export function LocationMap({ latitude, longitude, city }: LocationMapProps) {
  // Create a stable key based on rounded coordinates to avoid unnecessary remounts
  // Round to 2 decimal places (~1km precision) to prevent remount on tiny coordinate changes
  const mapKey = useMemo(() => {
    if (latitude === null || longitude === null) {
      return "map-empty";
    }
    // Round to 2 decimal places to create stable keys
    const roundedLat = Math.round(latitude * 100) / 100;
    const roundedLon = Math.round(longitude * 100) / 100;
    return `map-${roundedLat}-${roundedLon}`;
  }, [latitude, longitude]);

  if (latitude === null || longitude === null) {
    return (
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100/50 flex items-center justify-center">
        <p className="text-gray-400 text-center px-4">
          {city
            ? "Selecciona una ciudad para ver su ubicación en el mapa"
            : "Selecciona tu ubicación para ver el mapa"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-200/50">
      <MapContainer
        key={mapKey}
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} />
        <MapUpdater latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
}
