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
  const iconSize = size.toString();
  const className = `h-${iconSize} w-${iconSize}`;
  
  // Normalize the condition string to lowercase and remove spaces
  const normalizedCondition = condition.toLowerCase().replace(/\s+/g, '');
  
  switch (normalizedCondition) {
    case 'sunny':
      return <Sun className={`text-accent ${className}`} size={size} />;
    case 'clear':
      return <Sun className={`text-accent ${className}`} size={size} />;
    case 'partlycloudy':
    case 'partly-cloudy':
      return <CloudSun className={`text-primary ${className}`} size={size} />;
    case 'cloudy':
      return <Cloud className={`text-primary ${className}`} size={size} />;
    case 'overcast':
      return <Cloud className={`text-neutral-500 ${className}`} size={size} />;
    case 'rain':
    case 'rainy':
      return <CloudRain className={`text-primary ${className}`} size={size} />;
    case 'drizzle':
      return <CloudDrizzle className={`text-primary ${className}`} size={size} />;
    case 'snow':
    case 'snowy':
      return <CloudSnow className={`text-primary ${className}`} size={size} />;
    case 'fog':
    case 'foggy':
    case 'mist':
      return <CloudFog className={`text-neutral-500 ${className}`} size={size} />;
    case 'thunderstorm':
    case 'thunder':
      return <CloudLightning className={`text-primary ${className}`} size={size} />;
    case 'clear-night':
    case 'clearnight':
      return <Moon className={`text-neutral-500 ${className}`} size={size} />;
    case 'partly-cloudy-night':
    case 'partlycloudynight':
      return <CloudMoon className={`text-neutral-500 ${className}`} size={size} />;
    default:
      return <Sun className={`text-accent ${className}`} size={size} />;
  }
}
