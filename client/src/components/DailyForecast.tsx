import { Card, CardContent } from "@/components/ui/card";
import { DailyForecast as DailyForecastType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";
import { CalendarDays } from "lucide-react";

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {
  return (
    <div className="fade-in">
      <div className="flex items-center mb-4">
        <CalendarDays className="mr-2 h-5 w-5 text-primary" />
        <h3 className="text-xl font-bold">5-Day Forecast</h3>
      </div>
      
      <Card className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border-none">
        <CardContent className="p-0">
          {forecast.map((day, index) => {
            // Check if this is today
            const isToday = index === 0;
            
            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-5 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                  isToday 
                    ? 'bg-primary/5 dark:bg-primary/10' 
                    : ''
                } ${
                  index < forecast.length - 1 
                    ? 'border-b border-neutral-200 dark:border-neutral-700' 
                    : ''
                }`}
              >
                <div className="w-1/4">
                  <p className={`font-bold ${isToday ? 'text-primary dark:text-primary-light' : ''}`}>
                    {day.day}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {day.date}
                  </p>
                </div>
                
                <div className="w-1/4 flex justify-center">
                  <div className={`rounded-full p-1 ${
                    isToday 
                      ? 'bg-white dark:bg-neutral-700 shadow-sm' 
                      : ''
                  }`}>
                    <WeatherIcon condition={day.condition} size={36} />
                  </div>
                </div>
                
                <div className="w-1/4 text-center">
                  <p className={`font-medium ${isToday ? 'text-primary dark:text-primary-light' : ''}`}>
                    {day.conditionText}
                  </p>
                </div>
                
                <div className="w-1/4 text-right flex items-center justify-end space-x-3">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="text-xs mr-1 text-red-500">High</span>
                      <span className={`font-mono text-base font-semibold ${
                        isToday ? 'text-primary dark:text-primary-light' : ''
                      }`}>
                        {day.high}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs mr-1 text-blue-500">Low</span>
                      <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                        {day.low}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
