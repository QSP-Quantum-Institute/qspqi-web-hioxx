import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../../stores";
import { StepTitle } from "../ui/StepTitle";
import { CountryStateCitySelect } from "../ui/CountryStateCitySelect";
import { LocationMap } from "../ui/LocationMap";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { geocodeCity } from "../../services/geocoding";

export function LocationStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localCountry, setLocalCountry] = useState<string | null>(data.country);
  const [localState, setLocalState] = useState<string | null>(data.state);
  const [localCity, setLocalCity] = useState<string | null>(data.city);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  // Geocode when city is selected
  useEffect(() => {
    if (localCountry && localState && localCity && !isGeocoding) {
      // Defer setState calls to avoid cascading renders
      setTimeout(() => {
        setIsGeocoding(true);
        setGeocodingError(null);
      }, 0);

      geocodeCity(localCity, localState, localCountry)
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
  }, [localCountry, localState, localCity, isGeocoding, updateData]);

  const handleCountryChange = (value: string) => {
    setLocalCountry(value);
    updateData("country", value);
    setError("country", null);
  };

  const handleStateChange = (value: string) => {
    setLocalState(value);
    updateData("state", value);
    setError("state", null);
  };

  const handleCityChange = (value: string) => {
    setLocalCity(value);
    updateData("city", value);
    setError("city", null);
  };

  return (
    <div className="w-full space-y-8">
      <StepTitle color="gold">¿Dónde naciste?</StepTitle>

      <div className="w-full max-w-2xl mx-auto">
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
      </div>

      {isGeocoding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500">Obteniendo ubicación...</p>
        </motion.div>
      )}

      {geocodingError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-yellow-600/70 text-center"
        >
          {geocodingError}
        </motion.p>
      )}

      <div className="w-full max-w-4xl mx-auto">
        <ErrorBoundary
          fallback={
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100/50 flex items-center justify-center">
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
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
