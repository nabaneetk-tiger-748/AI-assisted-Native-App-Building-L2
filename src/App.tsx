import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { SevenDayForecast } from './components/SevenDayForecast';
import { WeatherCharts } from './components/WeatherCharts';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { RecentFavorites } from './components/RecentFavorites';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { GeoCity, WeatherData, TempUnit, SpeedUnit } from './types';
import { fetchWeatherData, reverseGeocodeCoords } from './services/weatherApi';

const DEFAULT_CITY: GeoCity = {
  id: 2643743,
  name: 'London',
  country: 'United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: 'Europe/London',
};

const STORAGE_KEYS = {
  TEMP_UNIT: 'weather_app_temp_unit',
  FAVORITES: 'weather_app_favorites',
  RECENTS: 'weather_app_recents',
};

export default function App() {
  const [currentCity, setCurrentCity] = useState<GeoCity | null>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Preference states
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEMP_UNIT);
    return saved === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  });

  const speedUnit: SpeedUnit = tempUnit === 'fahrenheit' ? 'mph' : 'kmh';

  // Favorites & Recents states
  const [favorites, setFavorites] = useState<GeoCity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recents, setRecents] = useState<GeoCity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // Save state helpers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEMP_UNIT, tempUnit);
  }, [tempUnit]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(recents));
  }, [recents]);

  // Load weather for a given city
  const loadCityWeather = useCallback(async (city: GeoCity) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
      setCurrentCity(data.cityInfo);

      // Add to recents
      setRecents((prev) => {
        const filtered = prev.filter((item) => item.id !== city.id && item.name !== city.name);
        return [city, ...filtered].slice(0, 8);
      });
    } catch (err) {
      console.error('Failed to load city weather:', err);
      setError(
        err instanceof Error
          ? err.message
          : `Unable to retrieve weather forecast for "${city.name}". Please try another city.`
      );
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadCityWeather(DEFAULT_CITY);
  }, [loadCityWeather]);

  // Handle Geolocation auto-detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const detectedCity = await reverseGeocodeCoords(lat, lon);
          await loadCityWeather(detectedCity);
        } catch (err) {
          console.error('Failed to resolve current location:', err);
          setError('Could not convert your current coordinates to weather data.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('Geolocation permission denied or timed out:', err);
        setIsLocating(false);
        alert('Could not access location. Please check browser permissions or search for your city manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Toggle favorite
  const isCurrentFavorite = currentCity
    ? favorites.some((f) => f.id === currentCity.id || f.name === currentCity.name)
    : false;

  const handleToggleFavorite = () => {
    if (!currentCity) return;
    if (isCurrentFavorite) {
      setFavorites((prev) => prev.filter((f) => f.id !== currentCity.id && f.name !== currentCity.name));
    } else {
      setFavorites((prev) => [currentCity, ...prev]);
    }
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== cityId));
  };

  const handleClearRecents = () => {
    setRecents([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* Top Navigation Header */}
      <Header
        currentCity={currentCity}
        tempUnit={tempUnit}
        speedUnit={speedUnit}
        onToggleTempUnit={() => setTempUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))}
        onDetectLocation={handleDetectLocation}
        isLocating={isLocating}
        isFavorite={isCurrentFavorite}
        onToggleFavorite={handleToggleFavorite}
        favoriteCitiesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <SearchBar onSelectCity={loadCityWeather} isLoading={isLoading} />

        {/* Content Area */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay
            message={error}
            onRetry={() => currentCity && loadCityWeather(currentCity)}
            onSelectPopularCity={loadCityWeather}
          />
        ) : weather ? (
          <div className="space-y-6 mt-4">
            {/* Current Weather Overview */}
            <CurrentWeatherCard weather={weather} tempUnit={tempUnit} speedUnit={speedUnit} />

            {/* Smart Automated Activity Planning Intelligence */}
            <PlanningRecommendations weather={weather} />

            {/* 7-Day Forecast */}
            <SevenDayForecast weather={weather} tempUnit={tempUnit} speedUnit={speedUnit} />

            {/* Hourly Weather Trends Chart */}
            <WeatherCharts weather={weather} tempUnit={tempUnit} speedUnit={speedUnit} />
          </div>
        ) : null}
      </main>

      {/* Saved Favorites & Recents Modal */}
      <RecentFavorites
        favorites={favorites}
        recents={recents}
        onSelectCity={loadCityWeather}
        onRemoveFavorite={handleRemoveFavorite}
        onClearRecents={handleClearRecents}
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Weather Intelligence Dashboard</span>
          <span>Powered by Open-Meteo Geocoding & Forecast APIs</span>
        </div>
      </footer>
    </div>
  );
}
