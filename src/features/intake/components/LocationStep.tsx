import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../store/stepperStore";
import { StepTitle } from "../../../components/ui/StepTitle";
import { CountryStateCitySelect } from "../../../components/ui/CountryStateCitySelect";
import { LocationMap } from "../../../components/ui/LocationMap";
import { CoordinatesDisplay } from "../../../components/ui/CoordinatesDisplay";
import { ErrorBoundary } from "../../../components/common/ErrorBoundary";
import { geocodeCity } from "../../../services/geocoding";

export function LocationStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localCountry, setLocalCountry] = useState<string | null>(data.country);
  const [localState, setLocalState] = useState<string | null>(data.state);
  const [localCity, setLocalCity] = useState<string | null>(data.city);
  const [localCountryName, setLocalCountryName] = useState<string | null>(
    data.countryName
  );
  const [localStateName, setLocalStateName] = useState<string | null>(
    data.stateName
  );
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  const isLocationComplete = localCountry && localState && localCity;

  useEffect(() => {
    if (isLocationComplete && !isGeocoding) {
      setTimeout(() => {
        setIsGeocoding(true);
        setGeocodingError(null);
      }, 0);

      geocodeCity(
        localCity!,
        localStateName || localState!,
        localCountryName || localCountry!
      )
        .then((result) => {
          updateData("latitude", result.lat);
          updateData("longitude", result.lon);
          setTimeout(() => setIsGeocoding(false), 0);
        })
        .catch((error) => {
          console.error("Geocoding failed:", error);
          setTimeout(() => {
            setGeocodingError("No se pudo obtener la ubicación exacta");
            setIsGeocoding(false);
          }, 0);
        });
    }
  }, [
    isLocationComplete,
    localCountry,
    localState,
    localCity,
    localCountryName,
    localStateName,
    isGeocoding,
    updateData,
  ]);

  const resetCoordinates = () => {
    updateData("latitude", null);
    updateData("longitude", null);
  };

  const handleCountryChange = (isoCode: string, name: string) => {
    setLocalCountry(isoCode);
    setLocalCountryName(name);
    updateData("country", isoCode);
    updateData("countryName", name);
    setError("country", null);
    resetCoordinates();
  };

  const handleStateChange = (isoCode: string, name: string) => {
    setLocalState(isoCode);
    setLocalStateName(name);
    updateData("state", isoCode);
    updateData("stateName", name);
    setError("state", null);
    resetCoordinates();
  };

  const handleCityChange = (city: string) => {
    setLocalCity(city);
    updateData("city", city);
    setError("city", null);
    resetCoordinates();
  };

  return (
    <div className="w-full space-y-8">
      <StepTitle color="gold">¿Dónde naciste?</StepTitle>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                country={localCountryName || localCountry}
                state={localStateName || localState}
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
