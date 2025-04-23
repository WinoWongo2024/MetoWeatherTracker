import { Card, CardContent } from "@/components/ui/card";
import { DailyForecast as DailyForecastType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {
  return (
    <div className="fade-in">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <Card className="bg-white dark:bg-neutral-800 rounded-xl shadow overflow-hidden">
        <CardContent className="p-0">
          {forecast.map((day, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 ${
                index < forecast.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700' : ''
              }`}
            >
              <div className="w-1/4">
                <p className="font-medium">{day.day}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{day.date}</p>
              </div>
              <div className="w-1/4 flex justify-center">
                <WeatherIcon condition={day.condition} size={32} />
              </div>
              <div className="w-1/4 text-center">
                <p className="font-medium">{day.conditionText}</p>
              </div>
              <div className="w-1/4 text-right">
                <span className="font-mono text-lg">{day.high} <span className="text-neutral-500 dark:text-neutral-400 text-sm">{day.low}</span></span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
