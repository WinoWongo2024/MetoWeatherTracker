import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs/promises";
import { WeatherData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API route
  app.get('/api/weather', async (req, res) => {
    try {
      const weatherData = await storage.getRandomWeather();
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Failed to fetch weather data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
