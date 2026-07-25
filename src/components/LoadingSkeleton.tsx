import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Current Weather Card Skeleton */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-800 rounded-lg"></div>
            <div className="h-4 w-32 bg-slate-800/60 rounded-md"></div>
          </div>
          <div className="h-8 w-28 bg-slate-800 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-slate-800 rounded-2xl"></div>
            <div className="space-y-3">
              <div className="h-16 w-36 bg-slate-800 rounded-xl"></div>
              <div className="h-4 w-28 bg-slate-800/80 rounded-md"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-slate-800/60 rounded-xl"></div>
            <div className="h-16 bg-slate-800/60 rounded-xl"></div>
            <div className="h-16 bg-slate-800/60 rounded-xl col-span-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-slate-800">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-800/50 rounded-2xl p-4 space-y-2">
              <div className="h-3 w-16 bg-slate-700/60 rounded"></div>
              <div className="h-6 w-20 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast & Chart Skeletons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-4">
        <div className="h-6 w-48 bg-slate-800 rounded"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-800/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
