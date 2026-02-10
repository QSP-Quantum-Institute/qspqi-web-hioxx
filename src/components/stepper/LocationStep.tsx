import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../../stores";
import { StepTitle } from "../ui/StepTitle";
import { CountryStateCitySelect } from "../ui/CountryStateCitySelect";
import { LocationMap } from "../ui/LocationMap";
import { CoordinatesDisplay } from "../ui/CoordinatesDisplay";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { geocodeCity } from "../../services/geocoding";

export function LocationStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localCountry, setLocalCountry] = useState<string | null>(data.country);
  const [localState, setLocalState] = useState<string | null>(data.state);
  const [localCity, setLocalCity] = useState<string | null>(data.city);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  // Check if all location fields are selected
  const isLocationComplete = localCountry && localState && localCity;

  // Geocode when city is selected
  useEffect(() => {
    if (isLocationComplete && !isGeocoding) {
      // Defer setState calls to avoid cascading renders
      setTimeout(() => {
        setIsGeocoding(true);
        setGeocodingError(null);
      }, 0);

      geocodeCity(localCity!, localState!, localCountry!)
        .then((result) => {
          updateData("latitude", result.lat);
          updateData("longitude", result.lon);
          setTimeout(() => {
            setIsGeocoding(false);
          }, 0);
        })
        .catch((error) => {
          console.error("Geocoding failed:", error);
          setTimeout(() => {
            setGeocodingError("No se pudo obtener la ubicación exacta");
            setIsGeocoding(false);
          }, 0);
          // Still allow to continue without coordinates
        });
    }
  }, [
    isLocationComplete,
    localCountry,
    localState,
    localCity,
    isGeocoding,
    updateData,
  ]);

  const handleCountryChange = (value: string) => {
    setLocalCountry(value);
    updateData("country", value);
    setError("country", null);
    // Reset coordinates when country changes
    if (data.latitude !== null || data.longitude !== null) {
      updateData("latitude", null);
      updateData("longitude", null);
    }
  };

  const handleStateChange = (value: string) => {
    setLocalState(value);
    updateData("state", value);
    setError("state", null);
    // Reset coordinates when state changes
    if (data.latitude !== null || data.longitude !== null) {
      updateData("latitude", null);
      updateData("longitude", null);
    }
  };

  const handleCityChange = (value: string) => {
    setLocalCity(value);
    updateData("city", value);
    setError("city", null);
    // Reset coordinates when city changes
    if (data.latitude !== null || data.longitude !== null) {
      updateData("latitude", null);
      updateData("longitude", null);
    }
  };

  return (
    <div className="w-full space-y-8">
      <StepTitle color="gold">¿Dónde naciste?</StepTitle>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side - Selectors */}
        <div className="w-full">
          <CountryStateCitySelect
            country={localCountry}
            state={localState}
            city={localCity}
            onCountryChange={handleCountryChange}
            onStateChange={handleStateChange}
            onCityChange={handleCityChange}
            errors={{
              country: errors.country,
              state: errors.state,
              city: errors.city,
            }}
          />

          {isGeocoding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">Obteniendo ubicación...</p>
            </motion.div>
          )}

          {geocodingError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-sm text-yellow-600/70 text-center"
            >
              {geocodingError}
            </motion.p>
          )}
        </div>

        {/* Right side - Map */}
        <div className="w-full space-y-4">
          {isLocationComplete ? (
            <ErrorBoundary
              fallback={
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100/50 flex items-center justify-center border border-gray-200/30">
                  <p className="text-gray-400 text-center px-4">
                    No se pudo cargar el mapa. Por favor, intenta seleccionar la
                    ubicación nuevamente.
                  </p>
                </div>
              }
            >
              <LocationMap
                latitude={data.latitude}
                longitude={data.longitude}
                city={localCity}
                country={localCountry}
                state={localState}
              />
              {data.latitude !== null && data.longitude !== null && (
                <CoordinatesDisplay
                  latitude={data.latitude}
                  longitude={data.longitude}
                />
              )}
            </ErrorBoundary>
          ) : (
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100/50 flex items-center justify-center border border-gray-200/30">
              <p className="text-gray-400 text-center px-4">
                Selecciona país, estado y ciudad para ver el mapa
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
