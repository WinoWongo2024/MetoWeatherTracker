import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Current Weather Type
export interface CurrentWeather {
  location: string;
  date: string;
  time: string;
  temperature: string;
  feelsLike: string;
  condition: string;
  humidity: string;
  pressure: string;
  wind: string;
  precipitation: string;
  uvIndex: string;
}

// Hourly Forecast Type
export interface HourlyForecast {
  time: string;
  temp: string;
  condition: string;
}

// Daily Forecast Type
export interface DailyForecast {
  day: string;
  date: string;
  high: string;
  low: string;
  condition: string;
  conditionText: string;
}

// Complete Weather Data Type
export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  forecast: DailyForecast[];
}

// Database schema for users (required by the template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
