import { getRandomInt, getRandomElement, getTimeForHour, getDayName, getDateString, getRandomTemperature } from "./utils";
import { apiRequest } from "./queryClient";
import { WeatherData, CurrentWeather, HourlyForecast, DailyForecast } from "@shared/schema";

// Locations for random selection
const locations = [
  "Vienna, Austria",
  "Paris, France",
  "London, UK",
  "Berlin, Germany",
  "Rome, Italy",
  "Madrid, Spain",
  "Amsterdam, Netherlands",
  "Zurich, Switzerland",
  "Brussels, Belgium",
  "Stockholm, Sweden"
];

// Weather conditions
const weatherConditions = [
  { name: "Sunny", icon: "sunny" },
  { name: "Partly Cloudy", icon: "partly-cloudy" },
  { name: "Cloudy", icon: "cloudy" },
  { name: "Rain", icon: "rain" },
  { name: "Thunderstorm", icon: "thunderstorm" },
  { name: "Snow", icon: "snow" },
  { name: "Fog", icon: "fog" },
  { name: "Clear Night", icon: "clear-night" }
];

// Function to generate random current weather
function generateRandomCurrentWeather(): CurrentWeather {
  const currentHour = new Date().getHours();
  const location = getRandomElement(locations);
  
  // Determine if it's day or night
  const isNight = currentHour < 6 || currentHour > 19;
  
  // Filter conditions based on time of day
  const availableConditions = weatherConditions.filter(c => {
    if (isNight) {
      return c.icon === "clear-night" || c.icon === "cloudy" || c.icon === "partly-cloudy" || c.icon === "rain";
    } else {
      return c.icon !== "clear-night";
    }
  });
  
  const condition = getRandomElement(availableConditions);
  const temperature = getRandomInt(isNight ? -5 : 10, isNight ? 15 : 35);
  const feelsLike = temperature + getRandomInt(-3, 3);
  
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const time = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return {
    location,
    date,
    time,
    temperature: `${temperature}°`,
    feelsLike: `Feels like: ${feelsLike}°`,
    condition: condition.name,
    humidity: `Humidity: ${getRandomInt(30, 90)}%`,
    pressure: `${getRandomInt(990, 1030)} hPa`,
    wind: `${getRandomInt(0, 30)} km/h`,
    precipitation: `${(Math.random() * 10).toFixed(1)} mm`,
    uvIndex: `${getRandomInt(0, 11)}`
  };
}

// Function to generate random hourly forecast
function generateRandomHourlyForecast(): HourlyForecast[] {
  const currentHour = new Date().getHours();
  const forecast: HourlyForecast[] = [];
  
  for (let i = 1; i <= 8; i++) {
    const hour = (currentHour + i) % 24;
    const isNight = hour < 6 || hour > 19;
    
    // Filter conditions based on time of day
    const availableConditions = weatherConditions.filter(c => {
      if (isNight) {
        return c.icon === "clear-night" || c.icon === "cloudy" || c.icon === "partly-cloudy" || c.icon === "rain";
      } else {
        return c.icon !== "clear-night";
      }
    });
    
    const condition = getRandomElement(availableConditions);
    const temp = getRandomTemperature(isNight ? 5 : 15, isNight ? 20 : 32);
    
    forecast.push({
      time: getTimeForHour(hour),
      temp,
      condition: condition.icon
    });
  }
  
  return forecast;
}

// Function to generate random daily forecast
function generateRandomDailyForecast(): DailyForecast[] {
  const forecast: DailyForecast[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const condition = getRandomElement(weatherConditions);
    const high = getRandomInt(20, 35);
    const low = getRandomInt(10, 19);
    
    forecast.push({
      day: getDayName(i),
      date: getDateString(i),
      high: `${high}°`,
      low: `${low}°`,
      condition: condition.icon,
      conditionText: condition.name
    });
  }
  
  return forecast;
}

// Function to get random weather data
export async function getRandomWeatherData(): Promise<WeatherData> {
  try {
    // First try to fetch from the server
    const response = await apiRequest('GET', '/api/weather', undefined);
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch from server, using client-side generation:', error);
    
    // If server fetch fails, generate data client-side
    return {
      current: generateRandomCurrentWeather(),
      hourly: generateRandomHourlyForecast(),
      forecast: generateRandomDailyForecast()
    };
  }
}
