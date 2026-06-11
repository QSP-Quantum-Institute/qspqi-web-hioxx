import { useState, useEffect, useMemo, useRef } from "react";
import { Country, State, City } from "country-state-city";
import type { ICountry, IState, ICity } from "country-state-city";
import { Select } from "./Select";

interface CountryStateCitySelectProps {
  country: string | null;
  state: string | null;
  city: string | null;
  onCountryChange: (isoCode: string, name: string) => void;
  onStateChange: (isoCode: string, name: string) => void;
  onCityChange: (city: string) => void;
  errors?: {
    country?: string;
    state?: string;
    city?: string;
  };
}

export function CountryStateCitySelect({
  country,
  state,
  city,
  onCountryChange,
  onStateChange,
  onCityChange,
  errors,
}: CountryStateCitySelectProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  // Track previous values to detect actual changes
  const previousCountryRef = useRef<string | null>(country);
  const previousStateRef = useRef<string | null>(state);

  // Load countries on mount
  useEffect(() => {
    const loadCountries = () => {
      const allCountries = Country.getAllCountries();
      setCountries(allCountries);
    };
    loadCountries();
  }, []);

  // Load states when country changes (only when country actually changes)
  useEffect(() => {
    const previousCountry = previousCountryRef.current;
    previousCountryRef.current = country;

    // Only reset if country actually changed
    if (previousCountry !== country) {
      if (country) {
        const countryStates = State.getStatesOfCountry(country);
        // Defer setState to avoid cascading renders
        setTimeout(() => {
          setStates(countryStates);
        }, 0);
        // Reset state and city only when country changes
        if (previousCountry !== null) {
          onStateChange("", "");
          onCityChange("");
        }
      } else {
        setTimeout(() => {
          setStates([]);
        }, 0);
        if (previousCountry !== null) {
          onStateChange("", "");
          onCityChange("");
        }
      }
    }
  }, [country, onStateChange, onCityChange]);

  // Load cities when state changes (only when state actually changes)
  useEffect(() => {
    const previousState = previousStateRef.current;
    previousStateRef.current = state;

    // Only reset if state actually changed
    if (previousState !== state) {
      if (country && state) {
        const stateCities = City.getCitiesOfState(country, state);
        // Defer setState to avoid cascading renders
        setTimeout(() => {
          setCities(stateCities);
        }, 0);
        // Reset city only when state changes
        if (previousState !== null) {
          onCityChange("");
        }
      } else {
        setTimeout(() => {
          setCities([]);
        }, 0);
        if (previousState !== null) {
          onCityChange("");
        }
      }
    }
  }, [country, state, onCityChange]);

  const countryOptions = useMemo(
    () =>
      countries.map((c) => ({
        value: c.isoCode,
        label: c.name,
      })),
    [countries]
  );

  const stateOptions = useMemo(
    () =>
      states.map((s) => ({
        value: s.isoCode,
        label: s.name,
      })),
    [states]
  );

  const cityOptions = useMemo(
    () =>
      cities.map((c) => ({
        value: c.name,
        label: c.name,
      })),
    [cities]
  );

  const handleCountryChange = (isoCode: string) => {
    const selected = countryOptions.find((o) => o.value === isoCode);
    onCountryChange(isoCode, selected?.label ?? isoCode);
  };

  const handleStateChange = (isoCode: string) => {
    const selected = stateOptions.find((o) => o.value === isoCode);
    onStateChange(isoCode, selected?.label ?? isoCode);
  };

  return (
    <div className="w-full space-y-6">
      {/* Country */}
      <div className="w-full">
        <Select
          value={country || ""}
          onValueChange={handleCountryChange}
          options={countryOptions}
          placeholder="País"
          error={!!errors?.country}
          searchable={true}
        />
        {errors?.country && (
          <p className="mt-2 text-sm text-red-200/70 text-center">
            {errors.country}
          </p>
        )}
      </div>

      {/* State */}
      {country && (
        <div className="w-full">
          <Select
            value={state || ""}
            onValueChange={handleStateChange}
            options={stateOptions}
            placeholder="Estado/Departamento"
            error={!!errors?.state}
            searchable={true}
          />
          {errors?.state && (
            <p className="mt-2 text-sm text-red-200/70 text-center">
              {errors.state}
            </p>
          )}
        </div>
      )}

      {/* City */}
      {country && state && (
        <div className="w-full">
          <Select
            value={city || ""}
            onValueChange={onCityChange}
            options={cityOptions}
            placeholder="Ciudad"
            error={!!errors?.city}
            searchable={true}
          />
          {errors?.city && (
            <p className="mt-2 text-sm text-red-200/70 text-center">
              {errors.city}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
