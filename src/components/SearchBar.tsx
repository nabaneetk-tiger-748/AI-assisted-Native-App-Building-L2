import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Sparkles } from 'lucide-react';
import { GeoCity } from '../types';
import { searchCities } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: GeoCity) => void;
  isLoading: boolean;
}

const POPULAR_CITIES: { name: string; country: string; lat: number; lon: number; admin1?: string }[] = [
  { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.006 },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity, isLoading }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoCity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const cities = await searchCities(query);
        setResults(cities);
        if (cities.length === 0) {
          setSearchError(`No matching cities found for "${query}"`);
        }
      } catch (err) {
        setSearchError('Unable to connect to city search service. Please check your connection.');
        setResults([]);
      } finally {
        setIsSearching(false);
        setIsOpen(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: GeoCity) => {
    setQuery(`${city.name}${city.country ? `, ${city.country}` : ''}`);
    setIsOpen(false);
    onSelectCity(city);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSearchError(null);
  };

  const handlePopularClick = (popular: typeof POPULAR_CITIES[0]) => {
    const cityObj: GeoCity = {
      id: Math.round(popular.lat * 1000 + popular.lon),
      name: popular.name,
      latitude: popular.lat,
      longitude: popular.lon,
      country: popular.country,
      admin1: popular.admin1,
    };
    handleSelect(cityObj);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 px-4">
      <div className="relative" ref={dropdownRef}>
        {/* Input Wrapper */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            {isSearching || isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search city name (e.g., Tokyo, London, San Francisco, Mumbai)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-100 placeholder-slate-400 text-sm md:text-base rounded-2xl border border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 outline-none transition-all shadow-inner"
          />
          {query && (
            <button
              id="clear-search-btn"
              onClick={handleClear}
              className="absolute right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {isOpen && (results.length > 0 || searchError || isSearching) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-700/50 max-h-80 overflow-y-auto">
            {isSearching && (
              <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                <span>Searching global city database...</span>
              </div>
            )}

            {!isSearching && searchError && (
              <div className="p-4 text-center text-xs text-amber-400/90 font-medium bg-amber-500/5">
                {searchError}
              </div>
            )}

            {!isSearching &&
              results.map((city) => (
                <button
                  key={`${city.id}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelect(city)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-sky-500/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-700/60 group-hover:bg-sky-500/20 text-slate-400 group-hover:text-sky-400 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 text-sm group-hover:text-sky-300">
                        {city.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                    {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Popular City Quick Chips */}
      <div className="mt-3 flex items-center flex-wrap gap-1.5 text-xs">
        <span className="text-slate-400 flex items-center space-x-1 font-medium mr-1 text-[11px]">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Popular:</span>
        </span>
        {POPULAR_CITIES.map((pop) => (
          <button
            key={pop.name}
            onClick={() => handlePopularClick(pop)}
            className="px-2.5 py-1 bg-slate-800/70 hover:bg-sky-500/20 border border-slate-700/70 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 rounded-full transition-all text-[11px] font-medium cursor-pointer"
          >
            {pop.name}
          </button>
        ))}
      </div>
    </div>
  );
};
