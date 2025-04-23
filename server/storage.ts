import { users, type User, type InsertUser, WeatherData, CurrentWeather, HourlyForecast, DailyForecast } from "@shared/schema";
import path from "path";
import fs from "fs/promises";

// Weather data storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getRandomWeather(): Promise<WeatherData>;
}

// Location data for random selection
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

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random integer
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get time for hour
function getTimeForHour(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper function to get day name
function getDayName(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Helper function to get date string
function getDateString(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRandomWeather(): Promise<WeatherData> {
    // Generate random current weather
    const currentWeather = this.generateRandomCurrentWeather();
    
    // Generate random hourly forecast
    const hourlyForecast = this.generateRandomHourlyForecast();
    
    // Generate random daily forecast
    const dailyForecast = this.generateRandomDailyForecast();
    
    return {
      current: currentWeather,
      hourly: hourlyForecast,
      forecast: dailyForecast
    };
  }

  private generateRandomCurrentWeather(): CurrentWeather {
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

  private generateRandomHourlyForecast(): HourlyForecast[] {
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
      const temp = `${getRandomInt(isNight ? 5 : 15, isNight ? 20 : 32)}°`;
      
      forecast.push({
        time: getTimeForHour(hour),
        temp,
        condition: condition.icon
      });
    }
    
    return forecast;
  }

  private generateRandomDailyForecast(): DailyForecast[] {
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
}

export const storage = new MemStorage();
