import React from 'react';
import { Bookmark, Star, MapPin, Trash2, X } from 'lucide-react';
import { GeoCity } from '../types';

interface RecentFavoritesProps {
  favorites: GeoCity[];
  recents: GeoCity[];
  onSelectCity: (city: GeoCity) => void;
  onRemoveFavorite: (cityId: number) => void;
  onClearRecents: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const RecentFavorites: React.FC<RecentFavoritesProps> = ({
  favorites,
  recents,
  onSelectCity,
  onRemoveFavorite,
  onClearRecents,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Saved Cities & Recent Searches</h3>
              <p className="text-xs text-slate-400">Quickly switch between your saved locations</p>
            </div>
          </div>
          <button
            id="close-favorites-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Favorites Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Favorites ({favorites.length})</span>
              </span>
            </div>

            {favorites.length === 0 ? (
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl text-center text-xs text-slate-400">
                No favorite cities bookmarked yet. Click the star icon next to any city to save it here!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {favorites.map((city) => (
                  <div
                    key={`fav-${city.id}-${city.latitude}`}
                    className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-between group transition-colors"
                  >
                    <button
                      onClick={() => {
                        onSelectCity(city);
                        onClose();
                      }}
                      className="flex items-center space-x-2.5 text-left flex-1 min-w-0"
                    >
                      <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                          {city.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {city.country || city.admin1 || 'Location'}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(city.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors ml-2"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recents Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Recent Searches ({recents.length})
              </span>
              {recents.length > 0 && (
                <button
                  onClick={onClearRecents}
                  className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Clear history
                </button>
              )}
            </div>

            {recents.length === 0 ? (
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl text-center text-xs text-slate-400">
                No recent searches.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recents.map((city) => (
                  <button
                    key={`rec-${city.id}-${city.latitude}`}
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-slate-800/80 hover:bg-sky-500/20 border border-slate-700 hover:border-sky-500/40 rounded-xl text-xs text-slate-200 hover:text-sky-300 transition-all flex items-center space-x-1.5"
                  >
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{city.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
