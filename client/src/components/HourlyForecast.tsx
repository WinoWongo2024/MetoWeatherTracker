import { Card, CardContent } from "@/components/ui/card";
import { HourlyForecast as HourlyForecastType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";
import { Clock } from "lucide-react";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  return (
    <div className="mb-8 fade-in">
      <div className="flex items-center mb-4">
        <Clock className="mr-2 h-5 w-5 text-primary" />
        <h3 className="text-xl font-bold">Hourly Forecast</h3>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {hourly.map((hour, index) => {
            // Determine if this is the current hour
            const isCurrentHour = index === 0;
            
            return (
              <Card 
                key={index}
                className={`weather-card border-none ${
                  isCurrentHour 
                    ? "bg-gradient-to-b from-primary/20 to-white dark:from-primary/30 dark:to-neutral-800" 
                    : "bg-white dark:bg-neutral-800"
                } rounded-xl shadow-md p-4 flex flex-col items-center w-28 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]`}
              >
                <CardContent className="p-0 flex flex-col items-center">
                  <p className={`text-sm font-medium mb-3 ${
                    isCurrentHour 
                      ? "text-primary dark:text-primary-light" 
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}>
                    {hour.time}
                  </p>
                  
                  <div className={`rounded-full p-2 mb-2 ${
                    isCurrentHour 
                      ? "bg-white/80 dark:bg-neutral-700/80"
                      : "bg-neutral-100 dark:bg-neutral-700"
                  }`}>
                    <WeatherIcon condition={hour.condition} size={36} />
                  </div>
                  
                  <p className={`text-lg font-semibold font-mono ${
                    isCurrentHour
                      ? "text-primary dark:text-primary-light"
                      : ""
                  }`}>
                    {hour.temp}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
