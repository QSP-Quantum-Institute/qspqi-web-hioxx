import { useEffect, useRef, useState } from "react";
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
  country?: string | null;
  state?: string | null;
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

export function LocationMap({
  latitude,
  longitude,
  city,
  country,
  state,
}: LocationMapProps) {
  const [isReady, setIsReady] = useState(false);
  const [mapKey, setMapKey] = useState<string>("");
  const previousCoordsRef = useRef<string>("");
  const initializationAttemptedRef = useRef(false);

  // Only render map if all location data is available
  const shouldRenderMap =
    country !== null &&
    state !== null &&
    city !== null &&
    latitude !== null &&
    longitude !== null;

  // Create a unique key based on coordinates
  const coordsKey = shouldRenderMap
    ? `${latitude!.toFixed(4)}-${longitude!.toFixed(4)}`
    : "";

  // Handle map initialization
  useEffect(() => {
    if (!shouldRenderMap) {
      setTimeout(() => {
        setIsReady(false);
      }, 0);
      initializationAttemptedRef.current = false;
      previousCoordsRef.current = "";
      return;
    }

    // Only initialize if coordinates changed
    if (coordsKey === previousCoordsRef.current && isReady) {
      return;
    }

    // Prevent multiple initialization attempts
    if (initializationAttemptedRef.current && coordsKey === previousCoordsRef.current) {
      return;
    }

    previousCoordsRef.current = coordsKey;
    initializationAttemptedRef.current = true;

    // Generate new key and mark as ready
    setTimeout(() => {
      setMapKey(`map-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
      setTimeout(() => {
        setIsReady(true);
      }, 0);
    }, 0);
  }, [shouldRenderMap, coordsKey, isReady]);

  // Don't render if location is incomplete
  if (!shouldRenderMap || !isReady) {
    return null;
  }

  if (!mapKey) {
    return null;
  }

  return (
    <div
      key={mapKey}
      className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gold/20 shadow-sm bg-white/50"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <MapContainer
        key={mapKey}
        center={[latitude!, longitude!]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full rounded-lg"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude!, longitude!]} />
        <MapUpdater latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
}
