import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type { Map } from "leaflet";
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
  const [mapKey, setMapKey] = useState<string>(() => {
    // Generate initial key only once
    return `map-${Math.random().toString(36).substring(2, 9)}`;
  });
  const [containerId] = useState<string>(() => {
    // Generate initial container ID only once
    return `map-container-${Math.random().toString(36).substring(2, 9)}`;
  });
  const [isMounted, setIsMounted] = useState(false);
  const previousCoordsRef = useRef<{ lat: number; lon: number } | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const isInitializingRef = useRef(false);

  // Handle coordinate changes - remount map if coordinates change significantly
  useEffect(() => {
    if (latitude === null || longitude === null) {
      if (isMounted) {
        setTimeout(() => {
          setIsMounted(false);
        }, 0);
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore errors during cleanup
        }
        mapInstanceRef.current = null;
      }
      isInitializingRef.current = false;
      return;
    }

    // Prevent multiple initializations
    if (isInitializingRef.current) {
      return;
    }

    const prev = previousCoordsRef.current;
    const coordsChanged =
      prev === null ||
      Math.abs(prev.lat - latitude) > 0.01 ||
      Math.abs(prev.lon - longitude) > 0.01;

    if (coordsChanged) {
      previousCoordsRef.current = { lat: latitude, lon: longitude };

      // Unmount existing map if it exists
      if (isMounted && mapInstanceRef.current) {
        isInitializingRef.current = true;
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore errors during cleanup
        }
        mapInstanceRef.current = null;
        setTimeout(() => {
          setIsMounted(false);
          isInitializingRef.current = false;
        }, 0);
      }

      // Remount with new key
      if (!isMounted) {
        isInitializingRef.current = true;
        const remountTimer = setTimeout(() => {
          const timestamp = Date.now();
          setTimeout(() => {
            setMapKey(`map-${timestamp}`);
            setTimeout(() => {
              setIsMounted(true);
              isInitializingRef.current = false;
            }, 0);
          }, 0);
        }, 100);

        return () => {
          clearTimeout(remountTimer);
          isInitializingRef.current = false;
        };
      }
    } else if (!isMounted && prev === null) {
      // Initial mount
      isInitializingRef.current = true;
      setTimeout(() => {
        setIsMounted(true);
        isInitializingRef.current = false;
      }, 0);
    }
  }, [latitude, longitude, isMounted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore errors during cleanup
        }
        mapInstanceRef.current = null;
      }
      isInitializingRef.current = false;
    };
  }, []);

  const handleMapReady = () => {
    // Map is ready
  };

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

  if (!isMounted) {
    return (
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100/50 flex items-center justify-center">
        <p className="text-gray-400 text-center px-4">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div
      id={containerId}
      key={`${containerId}-${mapKey}`}
      className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-200/50"
    >
      <MapContainer
        key={mapKey}
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ zIndex: 0 }}
        whenReady={handleMapReady}
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
