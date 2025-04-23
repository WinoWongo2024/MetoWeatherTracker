import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import Footer from "@/components/Footer";
import { getRandomWeatherData } from "@/lib/weatherData";
import { WeatherData } from "@shared/schema";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const refreshWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRandomWeatherData();
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWeather();
    
    // Check for dark mode preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        refreshWeather();
      }, 30000); // Refresh every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshWeather]);

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!weatherData && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Header 
        autoRefresh={autoRefresh}
        toggleAutoRefresh={toggleAutoRefresh}
        refreshWeather={refreshWeather}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {weatherData && (
          <>
            <CurrentWeather current={weatherData.current} isLoading={isLoading} />
            <HourlyForecast hourly={weatherData.hourly} />
            <DailyForecast forecast={weatherData.forecast} />
          </>
        )}
      </main>
      
      <Footer lastUpdated={lastUpdated} />
    </>
  );
}
