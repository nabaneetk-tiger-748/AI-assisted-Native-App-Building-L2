import React from 'react';
import { CloudSun, Navigation, Thermometer, Bookmark, Star } from 'lucide-react';
import { TempUnit, SpeedUnit, GeoCity } from '../types';

interface HeaderProps {
  currentCity: GeoCity | null;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  onToggleTempUnit: () => void;
  onDetectLocation: () => void;
  isLocating: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  favoriteCitiesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  tempUnit,
  speedUnit,
  onToggleTempUnit,
  onDetectLocation,
  isLocating,
  isFavorite,
  onToggleFavorite,
  favoriteCitiesCount,
  onOpenFavorites,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl shadow-md shadow-sky-500/20 text-white flex items-center justify-center">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Weather Intelligence
            </h1>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Precision Forecasts & Smart Activity Planning
            </p>
          </div>
        </div>

        {/* Current City Pill & Quick Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          {currentCity && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <span className="font-semibold text-sky-400">{currentCity.name}</span>
              {currentCity.country && <span className="text-slate-400">({currentCity.country})</span>}
              <button
                id="header-favorite-btn"
                onClick={onToggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className={`p-1 rounded-md transition-colors ${
                  isFavorite ? 'text-amber-400 hover:text-amber-300' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
          )}

          {/* Auto-detect Location Button */}
          <button
            id="detect-location-btn"
            onClick={onDetectLocation}
            disabled={isLocating}
            title="Use Current Location"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-sky-400 hover:text-sky-300 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isLocating ? 'Locating...' : 'My Location'}</span>
          </button>

          {/* Favorite List Drawer Trigger */}
          <button
            id="open-favorites-btn"
            onClick={onOpenFavorites}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer"
            title="View saved favorites"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Favorites</span>
            {favoriteCitiesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 font-bold rounded-full border border-amber-500/30">
                {favoriteCitiesCount}
              </span>
            )}
          </button>

          {/* Unit Toggle Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              id="unit-celsius-btn"
              onClick={() => tempUnit !== 'celsius' && onToggleTempUnit()}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              onClick={() => tempUnit !== 'fahrenheit' && onToggleTempUnit()}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                tempUnit === 'fahrenheit'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
