import { apiRequest } from "./queryClient";
import { WeatherData } from "@shared/schema";

// Function to get weather data from the API
export async function getRandomWeatherData(): Promise<WeatherData> {
  try {
    // Fetch from the server
    const response = await apiRequest('GET', '/api/weather', undefined);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch weather data from server:', error);
    throw error;
  }
}
