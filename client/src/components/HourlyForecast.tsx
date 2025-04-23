import { Card, CardContent } from "@/components/ui/card";
import { HourlyForecast as HourlyForecastType } from "@shared/schema";
import WeatherIcon from "./WeatherIcon";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  return (
    <div className="mb-8 fade-in">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {hourly.map((hour, index) => (
            <Card 
              key={index}
              className="weather-card bg-white dark:bg-neutral-800 rounded-xl shadow p-4 flex flex-col items-center w-24 transition-transform hover:translate-y-[-4px]"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <p className="text-sm mb-2">{hour.time}</p>
                <WeatherIcon condition={hour.condition} size={32} />
                <p className="text-lg font-medium font-mono">{hour.temp}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
