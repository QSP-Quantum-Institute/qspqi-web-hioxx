interface GeocodeResult {
  lat: number;
  lon: number;
}

const cache = new Map<string, GeocodeResult>();

export async function geocodeCity(
  city: string,
  state: string,
  country: string
): Promise<GeocodeResult> {
  const cacheKey = `${city}, ${state}, ${country}`;

  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const query = encodeURIComponent(`${city}, ${state}, ${country}`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "QSPQI-HIOXX/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No results found for the specified location");
    }

    const result: GeocodeResult = {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };

    // Cache the result
    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}
