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
    try {
      // Load current weather from JSON file
      const currentWeatherData = await fs.readFile(path.join(process.cwd(), 'data/current-weather.json'), 'utf8');
      const currentWeather = JSON.parse(currentWeatherData);

      // Add dynamic date and time with EVST (EastVeil Summer Time) timezone - equivalent to CEST
      const currentDate = new Date();
      // Adjust to CEST/EVST (UTC+2)
      const cestTime = new Date(currentDate.getTime());
      // Get UTC time
      const utcHoursForCurrent = currentDate.getUTCHours();
      // Set to CEST/EVST (UTC+2)
      cestTime.setUTCHours((utcHoursForCurrent + 2) % 24);
      
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

      currentWeather.date = date;
      currentWeather.time = time;

      // Load hourly forecast from JSON file
      const hourlyForecastData = await fs.readFile(path.join(process.cwd(), 'data/hourly-forecast.json'), 'utf8');
      const allHourlyForecasts = JSON.parse(hourlyForecastData);

      // Filter hourly forecasts starting from current hour in EVST/CEST and take next 8 hours
      // Get current hour in EVST/CEST timezone (UTC+2)
      const nowForHourly = new Date();
      const utcHoursForHourly = nowForHourly.getUTCHours();
      const cestHour = (utcHoursForHourly + 2) % 24;
      
      const hourlyForecasts = [];
      
      for (let i = 0; i < 8; i++) {
        const hourIndex = (cestHour + i) % 24;
        hourlyForecasts.push(allHourlyForecasts[hourIndex]);
      }

      // Load daily forecast from JSON file
      const dailyForecastData = await fs.readFile(path.join(process.cwd(), 'data/daily-forecast.json'), 'utf8');
      const dailyForecast = JSON.parse(dailyForecastData);

      return {
        current: currentWeather,
        hourly: hourlyForecasts,
        forecast: dailyForecast
      };
    } catch (error) {
      console.error('Error reading weather data from JSON files:', error);
      throw new Error('Failed to load weather data');
    }
  }
}

export const storage = new MemStorage();
