import React from 'react';
import {
  Compass,
  Activity,
  Flame,
  Shirt,
  Umbrella,
  Car,
  Sun,
  Moon,
  Utensils,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
} from 'lucide-react';
import { WeatherData, PlanningRecommendation } from '../types';
import { generatePlanningRecommendations, findBestOutdoorWindow } from '../utils/weatherUtils';

interface PlanningRecommendationsProps {
  weather: WeatherData;
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({ weather }) => {
  const recommendations = generatePlanningRecommendations(weather);
  const bestSlot = findBestOutdoorWindow(weather);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-indigo-400" />;
      case 'Umbrella':
        return <Umbrella className="w-5 h-5 text-sky-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-teal-400" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-purple-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  const getStatusBadge = (status: PlanningRecommendation['status']) => {
    switch (status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Optimal Conditions</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Info className="w-3 h-3" />
            <span>Moderate Advice</span>
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-3 h-3" />
            <span>Caution Advisory</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">
            <span>General Tip</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl my-6 backdrop-blur-xl">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-slate-100">Smart Activity & Planning Intelligence</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Automated analysis from current weather</span>
      </div>

      {/* Best Outdoor Time Window Today Banner */}
      {bestSlot && (
        <div className="mt-6 p-4 bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl flex-shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Best Outdoor Time Window Today
                </span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                  Score {bestSlot.score}/100
                </span>
              </div>
              <p className="text-sm font-semibold text-white mt-0.5">
                {bestSlot.startHour} — {bestSlot.endHour}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Expected {bestSlot.temp}°C • {bestSlot.condition} • {bestSlot.rainProb}% rain probability
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800/80 rounded-2xl p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/50">
                  {getIcon(item.iconName)}
                </div>
                {getStatusBadge(item.status)}
              </div>

              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs font-semibold text-sky-400 mb-2">{item.summary}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.details}</p>
            </div>

            {item.tip && (
              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic">
                💡 <span className="text-slate-300 font-medium">Tip:</span> {item.tip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
