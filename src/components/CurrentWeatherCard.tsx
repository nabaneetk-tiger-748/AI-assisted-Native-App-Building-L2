import React from 'react';
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
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { WeatherData, TempUnit, SpeedUnit } from '../types';
import {
  getWeatherInfo,
  formatTemp,
  formatSpeed,
  getWindDirection,
  getUvInfo,
  getHumidityDescription,
} from '../utils/weatherUtils';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  tempUnit,
  speedUnit,
}) => {
  const current = weather.current;
  const city = weather.cityInfo;
  const weatherInfo = getWeatherInfo(current.weather_code);
  const todayDaily = weather.daily;

  // Icon mapping
  const renderWeatherIcon = (iconName: string, className: string = 'w-16 h-16') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={`${className} text-amber-400 animate-pulse`} />;
      case 'SunDim':
        return <SunDim className={`${className} text-amber-300`} />;
      case 'CloudSun':
        return <CloudSun className={`${className} text-sky-300`} />;
      case 'Cloud':
        return <Cloud className={`${className} text-slate-300`} />;
      case 'CloudFog':
        return <CloudFog className={`${className} text-slate-300`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-cyan-300`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'CloudRainWind':
        return <CloudRainWind className={`${className} text-indigo-300`} />;
      case 'CloudHail':
        return <CloudHail className={`${className} text-teal-300`} />;
      case 'Snowflake':
        return <Snowflake className={`${className} text-sky-200 animate-spin-slow`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-amber-300`} />;
      default:
        return <Cloud className={`${className} text-slate-300`} />;
    }
  };

  const uvMax = todayDaily.uv_index_max?.[0] || 0;
  const uvInfo = getUvInfo(uvMax);

  // Formatting sunrise & sunset
  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  const sunriseStr = formatTime(todayDaily.sunrise?.[0]);
  const sunsetStr = formatTime(todayDaily.sunset?.[0]);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background Decorative Gradient Aura */}
      <div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${weatherInfo.gradient} opacity-20 blur-3xl pointer-events-none`}
      />

      {/* Top Banner: City & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-800/80">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>{city.name}</span>
            {city.country && (
              <span className="text-slate-400 text-lg font-normal">, {city.country}</span>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {new Date(current.time).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            • Local Time
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/10 ${weatherInfo.bgTone}`}
          >
            {weatherInfo.label}
          </span>
        </div>
      </div>

      {/* Main Temperature & Weather Visual Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        {/* Left: Huge Temp & Icon */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="p-4 bg-slate-800/60 rounded-3xl border border-slate-700/50 shadow-inner flex items-center justify-center">
            {renderWeatherIcon(weatherInfo.icon, 'w-24 h-24 sm:w-28 sm:h-28')}
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white">
                {formatTemp(current.temperature_2m, tempUnit)}
              </span>
            </div>
            <div className="mt-2 space-y-1 text-sm text-slate-300">
              <p className="flex items-center space-x-1.5">
                <Thermometer className="w-4 h-4 text-sky-400" />
                <span>
                  Feels like{' '}
                  <strong className="text-white font-semibold">
                    {formatTemp(current.apparent_temperature, tempUnit)}
                  </strong>
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Today High:{' '}
                <strong className="text-amber-400">
                  {formatTemp(todayDaily.temperature_2m_max[0], tempUnit)}
                </strong>{' '}
                • Low:{' '}
                <strong className="text-sky-400">
                  {formatTemp(todayDaily.temperature_2m_min[0], tempUnit)}
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Sun & Wind Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">
              <Sunrise className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Sunrise</div>
              <div className="text-sm font-bold text-slate-100">{sunriseStr}</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Sunset className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Sunset</div>
              <div className="text-sm font-bold text-slate-100">{sunsetStr}</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3 col-span-2">
            <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">Max UV Index</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${uvInfo.color}`}>
                  {uvInfo.label} ({uvMax.toFixed(1)})
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{uvInfo.advice}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Weather Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-slate-800/80">
        {/* Humidity */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Humidity</span>
            <Droplets className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold text-white">{current.relative_humidity_2m}%</div>
          <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
            {getHumidityDescription(current.relative_humidity_2m)}
          </div>
        </div>

        {/* Wind */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Wind</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {formatSpeed(current.wind_speed_10m, speedUnit)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
            <Compass className="w-3 h-3 text-teal-400" />
            <span>Direction: {getWindDirection(current.wind_direction_10m)}</span>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Pressure</span>
            <Gauge className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white">{Math.round(current.pressure_msl)} hPa</div>
          <div className="text-[10px] text-slate-400 mt-1">MSL Pressure</div>
        </div>

        {/* Cloud Cover */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Cloudiness</span>
            <Cloud className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-xl font-bold text-white">{current.cloud_cover}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Total Cloud Cover</div>
        </div>

        {/* Wind Gusts */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Wind Gusts</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {formatSpeed(current.wind_gusts_10m || current.wind_speed_10m, speedUnit)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Peak Gust Speed</div>
        </div>

        {/* Rain Probability Today */}
        <div className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-2xl p-4 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Rain Risk</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {todayDaily.precipitation_probability_max[0] || 0}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Max Probability Today</div>
        </div>
      </div>
    </div>
  );
};
