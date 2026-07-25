import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Thermometer, CloudRain, Wind, Sun, TrendingUp } from 'lucide-react';
import { WeatherData, TempUnit, SpeedUnit } from '../types';
import { convertTemp, convertSpeed } from '../utils/weatherUtils';

interface WeatherChartsProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

type TabType = 'temperature' | 'precipitation' | 'wind' | 'uv';

export const WeatherCharts: React.FC<WeatherChartsProps> = ({
  weather,
  tempUnit,
  speedUnit,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('temperature');

  const hourly = weather.hourly;
  if (!hourly || !hourly.time || hourly.time.length === 0) return null;

  // Format 24-hour data points for recharts
  const chartData = hourly.time.slice(0, 24).map((timeStr, idx) => {
    const date = new Date(timeStr);
    const hourLabel = date.toLocaleTimeString([], { hour: 'numeric' });

    const rawTemp = hourly.temperature_2m[idx];
    const rawApparent = hourly.apparent_temperature[idx];
    const rawWind = hourly.wind_speed_10m[idx];
    const rainProb = hourly.precipitation_probability[idx] || 0;
    const precip = hourly.precipitation[idx] || 0;
    const uv = hourly.uv_index[idx] || 0;

    return {
      hour: hourLabel,
      time: timeStr,
      temp: convertTemp(rawTemp, tempUnit),
      feelsLike: convertTemp(rawApparent, tempUnit),
      rainProb,
      precipitation: parseFloat(precip.toFixed(2)),
      windSpeed: convertSpeed(rawWind, speedUnit),
      uvIndex: parseFloat(uv.toFixed(1)),
    };
  });

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl my-6 backdrop-blur-xl">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-slate-100">Hourly Weather Trends (24h)</h3>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80">
          <button
            id="tab-chart-temp"
            onClick={() => setActiveTab('temperature')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'temperature'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>

          <button
            id="tab-chart-rain"
            onClick={() => setActiveTab('precipitation')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'precipitation'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Precipitation</span>
          </button>

          <button
            id="tab-chart-wind"
            onClick={() => setActiveTab('wind')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'wind'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Wind Speed</span>
          </button>

          <button
            id="tab-chart-uv"
            onClick={() => setActiveTab('uv')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'uv'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>UV Index</span>
          </button>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'temperature' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit={`°${tempUnit === 'fahrenheit' ? 'F' : 'C'}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                name={`Temperature (°${tempUnit === 'fahrenheit' ? 'F' : 'C'})`}
                stroke="#38bdf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
              <Line
                type="monotone"
                dataKey="feelsLike"
                name={`Feels Like (°${tempUnit === 'fahrenheit' ? 'F' : 'C'})`}
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          ) : activeTab === 'precipitation' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="rainProb"
                name="Precipitation Probability (%)"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : activeTab === 'wind' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit={speedUnit === 'mph' ? ' mph' : ' km/h'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="windSpeed"
                name={`Wind Speed (${speedUnit})`}
                stroke="#14b8a6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#windGradient)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 12]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="uvIndex"
                name="UV Index"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#uvGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
