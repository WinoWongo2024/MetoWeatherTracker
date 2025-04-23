import { apiRequest } from "./queryClient";
import { WeatherData, CurrentWeather, HourlyForecast, DailyForecast } from "@shared/schema";

// Function that gets static JSON files for GitHub Pages or falls back to API for development
export async function getRandomWeatherData(): Promise<WeatherData> {
  try {
    // In production (GitHub Pages) or when testing static mode, fetch directly from JSON files
    if (import.meta.env.PROD || localStorage.getItem('useStaticData') === 'true') {
      return await getStaticWeatherData();
    }
    
    // Otherwise in development, fetch from the server API
    const response = await apiRequest('GET', '/api/weather', undefined);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Fallback to static data if API request fails
    return await getStaticWeatherData();
  }
}

// New function to fetch from static JSON files for GitHub Pages deployment
async function getStaticWeatherData(): Promise<WeatherData> {
  try {
    // Fetch each JSON file
    const [currentWeatherData, hourlyForecastData, dailyForecastData] = await Promise.all([
      fetch('/data/current-weather.json').then(res => res.json()),
      fetch('/data/hourly-forecast.json').then(res => res.json()),
      fetch('/data/daily-forecast.json').then(res => res.json())
    ]);

    // Process the data just like we do on the server
    const currentWeather = processCurrentWeather(currentWeatherData);
    const hourlyForecasts = processHourlyForecast(hourlyForecastData);
    const dailyForecast = dailyForecastData;

    return {
      current: currentWeather,
      hourly: hourlyForecasts,
      forecast: dailyForecast
    };
  } catch (error) {
    console.error('Failed to fetch static weather data:', error);
    throw error;
  }
}

// Process current weather data with EVST/CEST timezone
function processCurrentWeather(currentWeather: CurrentWeather): CurrentWeather {
  // Add dynamic date and time with EVST (EastVeil Summer Time) timezone - equivalent to CEST
  const currentDate = new Date();
  
  // Adjust to CEST/EVST (UTC+2)
  const cestTime = new Date(currentDate.getTime());
  const utcHours = currentDate.getUTCHours();
  cestTime.setUTCHours((utcHours + 2) % 24);
  
  const date = cestTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const time = cestTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) + ' EVST';

  return {
    ...currentWeather,
    date,
    time
  };
}

// Process hourly forecast with EVST/CEST timezone
function processHourlyForecast(allHourlyForecasts: HourlyForecast[]): HourlyForecast[] {
  // Get current hour in EVST/CEST timezone (UTC+2)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const cestHour = (utcHours + 2) % 24;
  
  const hourlyForecasts = [];
  
  for (let i = 0; i < 8; i++) {
    const hourIndex = (cestHour + i) % 24;
    hourlyForecasts.push(allHourlyForecasts[hourIndex]);
  }
  
  return hourlyForecasts;
}
