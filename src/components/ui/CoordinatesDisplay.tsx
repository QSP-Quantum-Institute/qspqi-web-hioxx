import { formatDMS } from "../../utils/coordinates";

interface CoordinatesDisplayProps {
  latitude: number | null;
  longitude: number | null;
}

export function CoordinatesDisplay({
  latitude,
  longitude,
}: CoordinatesDisplayProps) {
  if (latitude === null || longitude === null) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2 p-4 bg-white/50 rounded-lg border border-gray-200/30">
      <div className="space-y-1">
        <p className="text-xs text-gray-500 font-light">Latitud</p>
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-700 font-light">
            {latitude.toFixed(6)}°
          </p>
          <p className="text-xs text-gray-500 font-light">
            {formatDMS(latitude, true)}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 font-light">Longitud</p>
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-700 font-light">
            {longitude.toFixed(6)}°
          </p>
          <p className="text-xs text-gray-500 font-light">
            {formatDMS(longitude, false)}
          </p>
        </div>
      </div>
    </div>
  );
}
