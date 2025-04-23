import { Card, CardContent } from "@/components/ui/card";
import { CurrentWeather as CurrentWeatherType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";
import { Droplets, Wind, Gauge, Sun } from "lucide-react";

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  isLoading: boolean;
}

export default function CurrentWeather({ current, isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-8 h-64"></div>
    );
  }

  return (
    <div className="fade-in">
      <Card className="overflow-hidden bg-white dark:bg-neutral-800 rounded-2xl shadow-lg mb-8 border-none">
        <div className="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-6">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <h2 className="text-2xl font-bold mr-2">{current.location}</h2>
                  <span className="text-sm font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-white px-3 py-1 rounded-full shadow-sm">
                    {current.time}
                  </span>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">{current.date}</p>
                
                <div className="flex items-center">
                  <div className="mr-8">
                    <span className="text-7xl font-bold font-mono tracking-tighter temp-change bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent bg-clip-text text-transparent">
                      {current.temperature}
                    </span>
                    <div className="flex mt-2">
                      <span className="text-sm px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-md mr-3">
                        {current.feelsLike}
                      </span>
                      <div className="flex items-center text-sm px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                        <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{current.humidity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-white dark:bg-neutral-700 p-4 shadow-sm mb-2">
                      <WeatherIcon condition={current.condition} size={80} />
                    </div>
                    <p className="text-center font-medium text-primary dark:text-primary-light">{current.condition}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Gauge className="h-6 w-6 text-indigo-500 dark:text-indigo-300" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Pressure</p>
                  <p className="text-lg font-mono font-semibold">{current.pressure}</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Wind className="h-6 w-6 text-teal-500 dark:text-teal-300" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Wind</p>
                  <p className="text-lg font-mono font-semibold">{current.wind}</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Droplets className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Precipitation</p>
                  <p className="text-lg font-mono font-semibold">{current.precipitation}</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-2">
                    <Sun className="h-6 w-6 text-amber-500 dark:text-amber-300" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">UV Index</p>
                  <p className="text-lg font-mono font-semibold">{current.uvIndex}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
