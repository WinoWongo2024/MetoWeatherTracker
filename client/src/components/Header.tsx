import { Button } from "@/components/ui/button";
import { RefreshCw, Moon, Sun } from "lucide-react";

interface HeaderProps {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  refreshWeather: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({
  autoRefresh,
  toggleAutoRefresh,
  refreshWeather,
  isDarkMode,
  toggleTheme
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a5 5 0 0 0-10 0"></path>
            <line x1="12" y1="9" x2="12" y2="2"></line>
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
            <line x1="19.78" y1="10.22" x2="18.36" y2="11.64"></line>
            <line x1="1" y1="18" x2="3" y2="18"></line>
            <line x1="21" y1="18" x2="23" y2="18"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="19.78" y1="19.78" x2="18.36" y2="18.36"></line>
          </svg>
          <div>
            <h1 className="text-2xl font-bold">Méto ÖestVèl</h1>
            <p className="text-xs opacity-80">Your trusted weather source</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button 
              onClick={toggleAutoRefresh}
              variant="ghost" 
              className={`flex items-center px-3 py-1 ${autoRefresh ? 'bg-accent text-white' : 'bg-white/20'} rounded-full text-sm hover:bg-white/30`}
            >
              <span>Auto refresh: {autoRefresh ? 'ON' : 'OFF'}</span>
            </Button>
            <Button 
              onClick={refreshWeather}
              variant="ghost" 
              className="p-2 rounded-full hover:bg-white/20 transition-transform duration-500 hover:rotate-180"
              aria-label="Refresh weather data"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            onClick={toggleTheme}
            variant="ghost" 
            className="p-2 rounded-full hover:bg-white/20"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
