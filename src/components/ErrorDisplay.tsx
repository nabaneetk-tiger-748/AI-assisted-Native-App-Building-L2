import React from 'react';
import { AlertCircle, Search, RefreshCw, MapPin } from 'lucide-react';
import { GeoCity } from '../types';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  onSelectPopularCity?: (city: GeoCity) => void;
}

const DEFAULT_POPULAR: GeoCity[] = [
  { id: 1850147, name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.6917 },
  { id: 2643743, name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { id: 5128581, name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 },
  { id: 2988507, name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
];

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onRetry,
  onSelectPopularCity,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 bg-slate-900/90 border border-rose-500/30 rounded-3xl p-8 text-center text-white shadow-2xl backdrop-blur-xl">
      <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">City Not Found or Weather Unavailable</h3>

      <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
        {message || 'We could not locate weather data for the specified search. Please check the spelling or search for another city.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>

      {onSelectPopularCity && (
        <div className="mt-8 pt-6 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium block mb-3">
            Or select one of these popular global destinations:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DEFAULT_POPULAR.map((pop) => (
              <button
                key={pop.name}
                onClick={() => onSelectPopularCity(pop)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{pop.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
