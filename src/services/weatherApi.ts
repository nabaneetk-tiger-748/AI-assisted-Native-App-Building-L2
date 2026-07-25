import { GeoCity, WeatherData } from '../types';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Search cities by name using Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<GeoCity[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(trimmed)}&count=8&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding API service error (${response.status})`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      return [];
    }

    return data.results as GeoCity[];
  } catch (error) {
    console.error('Error fetching city geocoding data:', error);
    throw error;
  }
}

/**
 * Fetch detailed current, hourly, and 7-day forecast data from Open-Meteo
 */
export async function fetchWeatherData(city: GeoCity): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'dew_point_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    timezone: city.timezone || 'auto',
  });

  const url = `${FORECAST_API_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast API service error (${response.status})`);
    }

    const data = await response.json();
    if (!data || !data.current || !data.daily) {
      throw new Error('Incomplete weather payload returned by forecast provider');
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      elevation: data.elevation,
      current: data.current,
      hourly: data.hourly,
      daily: data.daily,
      cityInfo: city,
    };
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

/**
 * Reverse geocode coordinates from browser geolocation
 */
export async function reverseGeocodeCoords(latitude: number, longitude: number): Promise<GeoCity> {
  // Use Open-Meteo reverse geocoding or bigdatacloud open API
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const cityName = data.city || data.locality || data.principalSubdivision || 'Current Location';
      const countryName = data.countryName || '';
      return {
        id: Math.round(latitude * 1000 + longitude),
        name: cityName,
        latitude,
        longitude,
        country: countryName,
        admin1: data.principalSubdivision || '',
      };
    }
  } catch (e) {
    console.warn('Reverse geocoding failed, falling back to coordinate city placeholder', e);
  }

  return {
    id: Math.round(latitude * 1000 + longitude),
    name: `Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
    latitude,
    longitude,
    country: '',
  };
}
