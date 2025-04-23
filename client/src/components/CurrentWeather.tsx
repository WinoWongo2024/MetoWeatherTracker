import { Card, CardContent } from "@/components/ui/card";
import { CurrentWeather as CurrentWeatherType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";

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
      <Card className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-8">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-medium mr-2">{current.location}</h2>
                <span className="text-sm bg-primary/10 text-primary dark:bg-primary/20 px-2 py-0.5 rounded-full">{current.time}</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{current.date}</p>
              
              <div className="flex items-center">
                <div className="mr-6">
                  <span className="text-6xl font-medium font-mono tracking-tighter temp-change">{current.temperature}</span>
                  <div className="flex mt-1">
                    <span className="text-sm mr-3">{current.feelsLike}</span>
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                      </svg>
                      <span>{current.humidity}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-center">
                    <WeatherIcon condition={current.condition} size={80} />
                  </div>
                  <p className="text-center mt-1 font-medium">{current.condition}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="flex justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v8m0 8v4m4-2V4M8 4v16"></path>
                  </svg>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Pressure</p>
                <p className="text-lg font-mono">{current.pressure}</p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="flex justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                  </svg>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Wind</p>
                <p className="text-lg font-mono">{current.wind}</p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="flex justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                  </svg>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Precipitation</p>
                <p className="text-lg font-mono">{current.precipitation}</p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-lg">
                <div className="flex justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5"></path>
                    <path d="M5 12l7-7 7 7"></path>
                  </svg>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">UV Index</p>
                <p className="text-lg font-mono">{current.uvIndex}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
