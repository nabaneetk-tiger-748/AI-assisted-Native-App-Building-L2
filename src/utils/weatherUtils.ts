import { WeatherCodeInfo, WeatherData, PlanningRecommendation, BestTimeSlot, TempUnit, SpeedUnit } from '../types';

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export const WMO_WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    icon: 'Sun',
    gradient: 'from-amber-400 to-orange-500',
    bgTone: 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100',
    category: 'clear',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    icon: 'SunDim',
    gradient: 'from-sky-400 to-blue-500',
    bgTone: 'bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-100',
    category: 'clear',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    icon: 'CloudSun',
    gradient: 'from-blue-400 to-indigo-500',
    bgTone: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
    category: 'cloudy',
  },
  3: {
    code: 3,
    label: 'Overcast',
    icon: 'Cloud',
    gradient: 'from-slate-400 to-slate-600',
    bgTone: 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100',
    category: 'cloudy',
  },
  45: {
    code: 45,
    label: 'Foggy',
    icon: 'CloudFog',
    gradient: 'from-zinc-400 to-slate-500',
    bgTone: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200',
    category: 'fog',
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    icon: 'CloudFog',
    gradient: 'from-zinc-400 to-slate-600',
    bgTone: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200',
    category: 'fog',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    icon: 'CloudDrizzle',
    gradient: 'from-cyan-400 to-blue-500',
    bgTone: 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-100',
    category: 'drizzle',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    icon: 'CloudDrizzle',
    gradient: 'from-cyan-500 to-blue-600',
    bgTone: 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-100',
    category: 'drizzle',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    icon: 'CloudDrizzle',
    gradient: 'from-blue-500 to-indigo-600',
    bgTone: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
    category: 'drizzle',
  },
  56: {
    code: 56,
    label: 'Freezing Light Drizzle',
    icon: 'CloudSnow',
    gradient: 'from-teal-400 to-cyan-600',
    bgTone: 'bg-teal-50 dark:bg-teal-950/20 text-teal-900 dark:text-teal-100',
    category: 'drizzle',
  },
  57: {
    code: 57,
    label: 'Freezing Dense Drizzle',
    icon: 'CloudSnow',
    gradient: 'from-teal-500 to-cyan-700',
    bgTone: 'bg-teal-50 dark:bg-teal-950/20 text-teal-900 dark:text-teal-100',
    category: 'drizzle',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    icon: 'CloudRain',
    gradient: 'from-blue-400 to-sky-600',
    bgTone: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
    category: 'rain',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    icon: 'CloudRain',
    gradient: 'from-blue-600 to-indigo-700',
    bgTone: 'bg-blue-100 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100',
    category: 'rain',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    icon: 'CloudRainWind',
    gradient: 'from-indigo-600 to-blue-900',
    bgTone: 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-100',
    category: 'rain',
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    icon: 'CloudHail',
    gradient: 'from-cyan-600 to-blue-800',
    bgTone: 'bg-cyan-100 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100',
    category: 'rain',
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    icon: 'CloudHail',
    gradient: 'from-cyan-700 to-indigo-900',
    bgTone: 'bg-cyan-100 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-100',
    category: 'rain',
  },
  71: {
    code: 71,
    label: 'Slight Snow Fall',
    icon: 'Snowflake',
    gradient: 'from-indigo-300 to-sky-500',
    bgTone: 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-100',
    category: 'snow',
  },
  73: {
    code: 73,
    label: 'Moderate Snow Fall',
    icon: 'Snowflake',
    gradient: 'from-sky-300 to-blue-600',
    bgTone: 'bg-sky-100 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100',
    category: 'snow',
  },
  75: {
    code: 75,
    label: 'Heavy Snow Fall',
    icon: 'Snowflake',
    gradient: 'from-blue-200 to-indigo-800',
    bgTone: 'bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100',
    category: 'snow',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    icon: 'Snowflake',
    gradient: 'from-slate-300 to-sky-600',
    bgTone: 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200',
    category: 'snow',
  },
  80: {
    code: 80,
    label: 'Slight Rain Showers',
    icon: 'CloudRain',
    gradient: 'from-sky-500 to-blue-600',
    bgTone: 'bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-100',
    category: 'rain',
  },
  81: {
    code: 81,
    label: 'Moderate Rain Showers',
    icon: 'CloudRain',
    gradient: 'from-blue-500 to-indigo-600',
    bgTone: 'bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100',
    category: 'rain',
  },
  82: {
    code: 82,
    label: 'Violent Rain Showers',
    icon: 'CloudRainWind',
    gradient: 'from-indigo-700 to-slate-900',
    bgTone: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100',
    category: 'rain',
  },
  85: {
    code: 85,
    label: 'Slight Snow Showers',
    icon: 'Snowflake',
    gradient: 'from-sky-300 to-indigo-500',
    bgTone: 'bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-100',
    category: 'snow',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    icon: 'Snowflake',
    gradient: 'from-sky-400 to-indigo-700',
    bgTone: 'bg-sky-100 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100',
    category: 'snow',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    icon: 'CloudLightning',
    gradient: 'from-amber-600 via-indigo-800 to-slate-900',
    bgTone: 'bg-amber-100 dark:bg-amber-950/50 text-amber-950 dark:text-amber-100',
    category: 'thunderstorm',
  },
  96: {
    code: 96,
    label: 'Thunderstorm with Slight Hail',
    icon: 'CloudLightning',
    gradient: 'from-purple-600 via-indigo-800 to-slate-900',
    bgTone: 'bg-purple-100 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100',
    category: 'thunderstorm',
  },
  99: {
    code: 99,
    label: 'Thunderstorm with Heavy Hail',
    icon: 'CloudLightning',
    gradient: 'from-rose-600 via-indigo-900 to-slate-950',
    bgTone: 'bg-rose-100 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100',
    category: 'thunderstorm',
  },
};

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return (
    WMO_WEATHER_CODES[code] || {
      code,
      label: 'Unknown Weather',
      icon: 'Cloud',
      gradient: 'from-slate-400 to-slate-600',
      bgTone: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
      category: 'cloudy',
    }
  );
}

export function convertTemp(celsius: number, unit: TempUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TempUnit): string {
  return `${convertTemp(celsius, unit)}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function convertSpeed(kmh: number, unit: SpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
}

export function formatSpeed(kmh: number, unit: SpeedUnit): string {
  return `${convertSpeed(kmh, unit)} ${unit === 'mph' ? 'mph' : 'km/h'}`;
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getUvInfo(uvIndex: number): { label: string; color: string; advice: string } {
  if (uvIndex <= 2) {
    return {
      label: 'Low',
      color: 'bg-emerald-500 text-white',
      advice: 'Minimal sun protection needed. Enjoy the outdoors safely.',
    };
  }
  if (uvIndex <= 5) {
    return {
      label: 'Moderate',
      color: 'bg-amber-500 text-white',
      advice: 'Wear sunglasses and SPF 30+ sunscreen if outdoors around midday.',
    };
  }
  if (uvIndex <= 7) {
    return {
      label: 'High',
      color: 'bg-orange-500 text-white',
      advice: 'Protection required. Seek shade during peak afternoon sun.',
    };
  }
  if (uvIndex <= 10) {
    return {
      label: 'Very High',
      color: 'bg-rose-500 text-white',
      advice: 'Extra protection essential. Avoid midday sun and wear a broad-brimmed hat.',
    };
  }
  return {
    label: 'Extreme',
    color: 'bg-purple-600 text-white',
    advice: 'Take full precautions. Unprotected skin can burn in minutes.',
  };
}

export function getHumidityDescription(humidity: number): string {
  if (humidity < 30) return 'Dry — keep hydrated and consider moisturizer';
  if (humidity <= 60) return 'Comfortable humidity level';
  if (humidity <= 80) return 'Humid — feels slightly muggy';
  return 'Very Humid — high moisture in the air';
}

export function getPressureTrend(pressureMsl: number): string {
  if (pressureMsl > 1020) return 'High Pressure (Clear, Stable Weather)';
  if (pressureMsl < 1005) return 'Low Pressure (Unstable / Potential Storm)';
  return 'Normal Atmospheric Pressure';
}

/**
 * Generates automated planning recommendations based on real weather data
 */
export function generatePlanningRecommendations(data: WeatherData): PlanningRecommendation[] {
  const recommendations: PlanningRecommendation[] = [];
  const current = data.current;
  const todayDaily = {
    tempMax: data.daily.temperature_2m_max[0],
    tempMin: data.daily.temperature_2m_min[0],
    rainProb: data.daily.precipitation_probability_max[0] || 0,
    rainSum: data.daily.precipitation_sum[0] || 0,
    uvMax: data.daily.uv_index_max[0] || 0,
    windMax: data.daily.wind_speed_10m_max[0] || 0,
    weatherCode: data.daily.weather_code[0],
  };

  const weatherCategory = getWeatherInfo(current.weather_code).category;

  // 1. Outdoor Sports & Running
  if (weatherCategory === 'rain' || weatherCategory === 'thunderstorm' || todayDaily.rainProb > 60) {
    recommendations.push({
      id: 'sports-rain',
      category: 'Outdoor',
      title: 'Outdoor Running & Fitness',
      status: 'caution',
      iconName: 'Activity',
      summary: 'High chance of precipitation today',
      details: `Precipitation chance is around ${todayDaily.rainProb}%. Consider indoor workouts or treadmill sessions.`,
      tip: 'If running outside, equip waterproof windbreakers and reflective gear.',
    });
  } else if (current.temperature_2m > 30) {
    recommendations.push({
      id: 'sports-heat',
      category: 'Outdoor',
      title: 'Outdoor Exercise Warning',
      status: 'moderate',
      iconName: 'Flame',
      summary: 'Hot temperatures during midday',
      details: `Peak temperatures reach ${Math.round(todayDaily.tempMax)}°C. Plan runs in early morning or late evening.`,
      tip: 'Stay hydrated with electrolytes and avoid high exertion in direct sun.',
    });
  } else if (current.temperature_2m < 5) {
    recommendations.push({
      id: 'sports-cold',
      category: 'Outdoor',
      title: 'Cold Weather Training',
      status: 'moderate',
      iconName: 'Activity',
      summary: 'Brisk conditions today',
      details: `Temperature is around ${Math.round(current.temperature_2m)}°C. Warm up thoroughly indoors prior to outdoor runs.`,
      tip: 'Wear breathable thermal layers, gloves, and a beanie.',
    });
  } else {
    recommendations.push({
      id: 'sports-optimal',
      category: 'Outdoor',
      title: 'Outdoor Running & Cycling',
      status: 'optimal',
      iconName: 'Activity',
      summary: 'Excellent conditions for outdoor sports',
      details: `Pleasant temperatures around ${Math.round(current.temperature_2m)}°C with low precipitation risk (${todayDaily.rainProb}%).`,
      tip: 'Great opportunity for outdoor parks, jogging trails, or recreational cycling.',
    });
  }

  // 2. Clothing & Outfit Recommendation
  let outfitStatus: 'optimal' | 'moderate' | 'caution' | 'unfavorable' = 'optimal';
  let outfitTitle = 'Daily Outfit Recommendation';
  let outfitSummary = '';
  let outfitDetails = '';
  let outfitTip = '';

  if (current.temperature_2m < 8) {
    outfitStatus = 'moderate';
    outfitSummary = 'Heavy Coat & Cold Weather Gear';
    outfitDetails = 'Cold temperatures require thermal insulation. Dress in heavy coat, scarf, sweater, and warm trousers.';
    outfitTip = 'Layering helps adapt to heated indoor spaces.';
  } else if (current.temperature_2m < 18) {
    outfitSummary = 'Light Jacket or Sweater';
    outfitDetails = `Moderate cool conditions (${Math.round(current.temperature_2m)}°C). A cardigan, hoodie, or denim jacket over trousers is ideal.`;
    outfitTip = 'Bring a collapsible umbrella if stepping out in the afternoon.';
  } else if (current.temperature_2m < 26) {
    outfitSummary = 'Comfortable Casual Wear';
    outfitDetails = `Comfortable climate (${Math.round(current.temperature_2m)}°C). T-shirts, light shirts, chinos, or skirts are suitable.`;
    outfitTip = 'Breathable cotton or linen fabrics work best.';
  } else {
    outfitSummary = 'Light Summer Apparel';
    outfitDetails = `Warm/hot conditions (${Math.round(current.temperature_2m)}°C). Wear light-colored, moisture-wicking clothes and open footwear if appropriate.`;
    outfitTip = 'Pair with sunglasses and a wide-brim hat.';
  }

  recommendations.push({
    id: 'attire-guidance',
    category: 'Attire',
    title: outfitTitle,
    status: outfitStatus,
    iconName: 'Shirt',
    summary: outfitSummary,
    details: outfitDetails,
    tip: outfitTip,
  });

  // 3. Rain & Umbrella Alert
  if (todayDaily.rainProb > 40 || weatherCategory === 'rain' || weatherCategory === 'drizzle') {
    recommendations.push({
      id: 'commute-umbrella',
      category: 'Commute',
      title: 'Umbrella & Rain Gear Advisory',
      status: 'caution',
      iconName: 'Umbrella',
      summary: 'Keep an umbrella or rain jacket handy',
      details: `Precipitation probability is elevated today at ${todayDaily.rainProb}% with projected total rain of ~${todayDaily.rainSum.toFixed(1)}mm.`,
      tip: 'Waterproof footwear or water-resistant bags recommended.',
    });
  } else {
    recommendations.push({
      id: 'commute-clear',
      category: 'Commute',
      title: 'Smooth Travel & Commute',
      status: 'optimal',
      iconName: 'Car',
      summary: 'Dry roads and clear driving conditions',
      details: `Minimal precipitation expected today (${todayDaily.rainProb}% max probability). Good visibility on roads.`,
      tip: 'Standard commute times expected with no rain delays.',
    });
  }

  // 4. UV Protection
  if (todayDaily.uvMax >= 6) {
    const uvInfo = getUvInfo(todayDaily.uvMax);
    recommendations.push({
      id: 'health-uv',
      category: 'Health',
      title: `High UV Index (${todayDaily.uvMax.toFixed(1)})`,
      status: 'caution',
      iconName: 'Sun',
      summary: `UV levels reach ${uvInfo.label} risk`,
      details: uvInfo.advice,
      tip: 'Apply broad-spectrum SPF 30+ sunscreen every 2 hours when outdoors.',
    });
  }

  // 5. Stargazing / Night sky
  const cloudCover = current.cloud_cover;
  if (current.is_day === 0) {
    if (cloudCover < 30 && weatherCategory === 'clear') {
      recommendations.push({
        id: 'events-stargazing',
        category: 'Stargazing',
        title: 'Stargazing & Night Sky',
        status: 'optimal',
        iconName: 'Moon',
        summary: 'Clear night sky conditions',
        details: `Cloud cover is only ${cloudCover}%. Excellent clarity for observing stars, constellations, and astronomical events.`,
        tip: 'Head to an open space away from urban light pollution.',
      });
    }
  }

  // 6. Outdoor Events & Patio Dining
  if (todayDaily.rainProb < 20 && todayDaily.tempMax >= 18 && todayDaily.tempMax <= 30 && todayDaily.windMax < 25) {
    recommendations.push({
      id: 'events-dining',
      category: 'Events',
      title: 'Outdoor Dining & Picnics',
      status: 'optimal',
      iconName: 'Utensils',
      summary: 'Ideal weather for outdoor social plans',
      details: `Warm highs around ${Math.round(todayDaily.tempMax)}°C, light wind (${Math.round(todayDaily.windMax)} km/h), and clear skies.`,
      tip: 'Great day for outdoor terraces, rooftop gatherings, or park picnics.',
    });
  }

  return recommendations;
}

/**
 * Finds the optimal 3-hour outdoor window during today's forecast
 */
export function findBestOutdoorWindow(data: WeatherData): BestTimeSlot | null {
  if (!data.hourly || !data.hourly.time || data.hourly.time.length < 24) return null;

  const nowIndex = 0; // Examine the first 24 hours
  let bestScore = -1;
  let bestSlot: BestTimeSlot | null = null;

  for (let i = nowIndex; i <= Math.min(nowIndex + 18, data.hourly.time.length - 3); i++) {
    const temp = data.hourly.temperature_2m[i];
    const rainProb = data.hourly.precipitation_probability[i] || 0;
    const wind = data.hourly.wind_speed_10m[i] || 0;
    const code = data.hourly.weather_code[i];

    // Score calculation (0 - 100)
    let score = 100;
    // Rain penalty
    score -= rainProb * 0.8;
    // Wind penalty
    if (wind > 20) score -= (wind - 20) * 1.5;
    // Temperature sweet spot (18-24°C ideal)
    if (temp >= 18 && temp <= 25) {
      score += 10;
    } else if (temp < 10) {
      score -= (10 - temp) * 2;
    } else if (temp > 30) {
      score -= (temp - 30) * 3;
    }

    if (code > 50) score -= 30; // precipitation code

    if (score > bestScore) {
      bestScore = score;
      const startTime = new Date(data.hourly.time[i]);
      const endTime = new Date(data.hourly.time[i + 3] || data.hourly.time[i]);

      bestSlot = {
        startHour: startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        endHour: endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        temp: Math.round(temp),
        condition: getWeatherInfo(code).label,
        rainProb: Math.round(rainProb),
        score: Math.max(0, Math.min(100, Math.round(score))),
      };
    }
  }

  return bestSlot;
}
