import React, { useState } from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  Snowflake,
  CloudLightning,
  Droplets,
  Wind,
  ShieldAlert,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { WeatherData, TempUnit, SpeedUnit } from '../types';
import { getWeatherInfo, formatTemp, formatSpeed } from '../utils/weatherUtils';

interface SevenDayForecastProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({
  weather,
  tempUnit,
  speedUnit,
}) => {
  const daily = weather.daily;
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  if (!daily || !daily.time || daily.time.length === 0) return null;

  // Global min and max across 7 days for temperature bar scaling
  const allMax = Math.max(...daily.temperature_2m_max);
  const allMin = Math.min(...daily.temperature_2m_min);
  const tempRange = Math.max(1, allMax - allMin);

  const renderWeatherIcon = (code: number, className: string = 'w-7 h-7') => {
    const info = getWeatherInfo(code);
    switch (info.icon) {
      case 'Sun':
        return <Sun className={`${className} text-amber-400`} />;
      case 'SunDim':
        return <SunDim className={`${className} text-amber-300`} />;
      case 'CloudSun':
        return <CloudSun className={`${className} text-sky-300`} />;
      case 'Cloud':
        return <Cloud className={`${className} text-slate-300`} />;
      case 'CloudFog':
        return <CloudFog className={`${className} text-slate-400`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-cyan-300`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'CloudRainWind':
        return <CloudRainWind className={`${className} text-indigo-300`} />;
      case 'CloudHail':
        return <CloudHail className={`${className} text-teal-300`} />;
      case 'Snowflake':
        return <Snowflake className={`${className} text-sky-200`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-amber-300`} />;
      default:
        return <Cloud className={`${className} text-slate-300`} />;
    }
  };

  const selectedDateStr = new Date(daily.time[selectedDayIndex]).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const selectedInfo = getWeatherInfo(daily.weather_code[selectedDayIndex]);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl my-6 backdrop-blur-xl">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-slate-100">7-Day Weather Outlook</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Click any day for detail breakdown</span>
      </div>

      {/* 7 Day Cards List */}
      <div className="mt-6 space-y-2.5">
        {daily.time.map((dateStr, idx) => {
          const date = new Date(dateStr);
          const isToday = idx === 0;
          const dayName = isToday
            ? 'Today'
            : date.toLocaleDateString(undefined, { weekday: 'short' });
          const formattedDate = date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });

          const maxTemp = daily.temperature_2m_max[idx];
          const minTemp = daily.temperature_2m_min[idx];
          const weatherCode = daily.weather_code[idx];
          const rainProb = daily.precipitation_probability_max?.[idx] || 0;
          const info = getWeatherInfo(weatherCode);

          // Temperature bar calculation
          const leftPercent = ((minTemp - allMin) / tempRange) * 100;
          const widthPercent = Math.max(10, ((maxTemp - minTemp) / tempRange) * 100);

          const isSelected = selectedDayIndex === idx;

          return (
            <button
              key={dateStr}
              id={`forecast-day-card-${idx}`}
              onClick={() => setSelectedDayIndex(idx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500/60 shadow-lg shadow-sky-500/5 ring-1 ring-sky-500/30'
                  : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-800'
              }`}
            >
              {/* Day & Date */}
              <div className="w-24 sm:w-32 flex-shrink-0">
                <div className={`font-semibold text-sm ${isToday ? 'text-sky-400 font-bold' : 'text-slate-100'}`}>
                  {dayName}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">{formattedDate}</div>
              </div>

              {/* Weather Icon & Label */}
              <div className="flex items-center space-x-3 w-36 sm:w-48 flex-shrink-0">
                <div className="p-1.5 bg-slate-900/50 rounded-xl">
                  {renderWeatherIcon(weatherCode)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">{info.label}</div>
                  {rainProb > 20 && (
                    <div className="text-[10px] text-sky-400 font-medium flex items-center space-x-1">
                      <Droplets className="w-3 h-3" />
                      <span>{rainProb}% rain</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Temperature Bar Graph */}
              <div className="flex-1 max-w-xs hidden md:flex items-center space-x-3 px-2">
                <span className="text-xs font-mono text-slate-400 w-10 text-right">
                  {formatTemp(minTemp, tempUnit)}
                </span>
                <div className="flex-1 h-2 bg-slate-950/80 rounded-full overflow-hidden relative border border-slate-800">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500"
                    style={{
                      left: `${Math.max(0, leftPercent)}%`,
                      width: `${Math.min(100, widthPercent)}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono font-semibold text-white w-10">
                  {formatTemp(maxTemp, tempUnit)}
                </span>
              </div>

              {/* Mobile Min / Max display */}
              <div className="md:hidden flex items-center space-x-2 text-xs font-mono">
                <span className="text-slate-400">{formatTemp(minTemp, tempUnit)}</span>
                <span className="text-slate-600">/</span>
                <span className="text-white font-bold">{formatTemp(maxTemp, tempUnit)}</span>
              </div>

              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-sky-400' : ''}`} />
            </button>
          );
        })}
      </div>

      {/* Selected Day Detail Breakdown Panel */}
      <div className="mt-6 p-5 bg-slate-800/60 border border-slate-700/60 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
              {renderWeatherIcon(daily.weather_code[selectedDayIndex], 'w-6 h-6')}
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">
                Detailed Metrics for {selectedDateStr}
              </h4>
              <p className="text-xs text-sky-400">{selectedInfo.label}</p>
            </div>
          </div>
          <div className="text-xs font-mono font-medium text-slate-300">
            High: <span className="text-amber-400 font-bold">{formatTemp(daily.temperature_2m_max[selectedDayIndex], tempUnit)}</span> • Low:{' '}
            <span className="text-sky-400 font-bold">{formatTemp(daily.temperature_2m_min[selectedDayIndex], tempUnit)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Precipitation Sum</span>
            <span className="text-sm font-bold text-white">
              {(daily.precipitation_sum?.[selectedDayIndex] || 0).toFixed(1)} mm
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Rain prob: {daily.precipitation_probability_max?.[selectedDayIndex] || 0}%
            </span>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Max Wind Speed</span>
            <span className="text-sm font-bold text-white">
              {formatSpeed(daily.wind_speed_10m_max[selectedDayIndex], speedUnit)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Gusts: {formatSpeed(daily.wind_gusts_10m_max?.[selectedDayIndex] || daily.wind_speed_10m_max[selectedDayIndex], speedUnit)}
            </span>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Max UV Index</span>
            <span className="text-sm font-bold text-amber-400">
              {(daily.uv_index_max?.[selectedDayIndex] || 0).toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Peak solar intensity</span>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Apparent High/Low</span>
            <span className="text-sm font-bold text-white">
              {formatTemp(daily.apparent_temperature_max[selectedDayIndex], tempUnit)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Min: {formatTemp(daily.apparent_temperature_min[selectedDayIndex], tempUnit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
