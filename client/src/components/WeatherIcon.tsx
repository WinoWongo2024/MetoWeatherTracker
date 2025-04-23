import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudDrizzle, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Moon, 
  CloudMoon 
} from "lucide-react";

interface WeatherIconProps {
  condition: string;
  size?: number;
}

export default function WeatherIcon({ condition, size = 24 }: WeatherIconProps) {
  // Normalize the condition string to lowercase and remove spaces
  const normalizedCondition = condition.toLowerCase().replace(/\s+/g, '');
  
  // Customized styling for each weather icon type
  const iconStyles = {
    sun: "text-yellow-500 dark:text-yellow-300",
    partlyCloudy: "text-gray-700 dark:text-gray-300",
    cloud: "text-gray-500 dark:text-gray-400",
    rain: "text-blue-600 dark:text-blue-400",
    snow: "text-sky-300 dark:text-sky-200",
    fog: "text-slate-400 dark:text-slate-300",
    thunder: "text-purple-600 dark:text-purple-400",
    moon: "text-indigo-300 dark:text-indigo-200"
  };
  
  switch (normalizedCondition) {
    case 'sunny':
    case 'clear':
      return (
        <div className="relative">
          <Sun 
            size={size} 
            className={`${iconStyles.sun} drop-shadow-md`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'partlycloudy':
    case 'partly-cloudy':
      return (
        <div className="relative">
          <CloudSun 
            size={size} 
            className={`${iconStyles.partlyCloudy} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'cloudy':
    case 'overcast':
      return (
        <div className="relative">
          <Cloud 
            size={size} 
            className={`${iconStyles.cloud} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'rain':
    case 'rainy':
      return (
        <div className="relative">
          <CloudRain 
            size={size} 
            className={`${iconStyles.rain} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'drizzle':
      return (
        <div className="relative">
          <CloudDrizzle 
            size={size} 
            className={`${iconStyles.rain} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'snow':
    case 'snowy':
      return (
        <div className="relative">
          <CloudSnow 
            size={size} 
            className={`${iconStyles.snow} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'fog':
    case 'foggy':
    case 'mist':
      return (
        <div className="relative">
          <CloudFog 
            size={size} 
            className={`${iconStyles.fog} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'thunderstorm':
    case 'thunder':
      return (
        <div className="relative">
          <CloudLightning 
            size={size} 
            className={`${iconStyles.thunder} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'clear-night':
    case 'clearnight':
      return (
        <div className="relative">
          <Moon 
            size={size} 
            className={`${iconStyles.moon} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    case 'partly-cloudy-night':
    case 'partlycloudynight':
      return (
        <div className="relative">
          <CloudMoon 
            size={size} 
            className={`${iconStyles.moon} drop-shadow-sm`} 
            strokeWidth={1.5} 
          />
        </div>
      );
    
    default:
      return (
        <div className="relative">
          <Sun 
            size={size} 
            className={`${iconStyles.sun} drop-shadow-md`} 
            strokeWidth={1.5} 
          />
        </div>
      );
  }
}
