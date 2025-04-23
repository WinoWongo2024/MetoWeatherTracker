// Méto ÖestVèl Weather - Static Version

// DOM Elements
const currentWeatherEl = document.getElementById('currentWeather');
const hourlyForecastEl = document.getElementById('hourlyForecast');
const dailyForecastEl = document.getElementById('dailyForecast');
const lastUpdatedEl = document.getElementById('lastUpdated');
const autoRefreshBtn = document.getElementById('autoRefreshBtn');
const refreshBtn = document.getElementById('refreshBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// State
let weatherData = null;
let autoRefreshInterval = null;
let autoRefreshEnabled = false;
const REFRESH_INTERVAL = 30000; // 30 seconds

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'true' || 
     (window.matchMedia('(prefers-color-scheme: dark)').matches && 
      localStorage.getItem('darkMode') === null)) {
    document.documentElement.classList.add('dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Load weather data
  loadWeatherData();
  
  // Set up event listeners
  setupEventListeners();
});

// Load weather data from JSON files
async function loadWeatherData() {
  try {
    // Fetch all data simultaneously
    const [currentWeatherData, hourlyForecastData, dailyForecastData] = await Promise.all([
      fetch('data/current-weather.json').then(res => res.json()),
      fetch('data/hourly-forecast.json').then(res => res.json()),
      fetch('data/daily-forecast.json').then(res => res.json())
    ]);
    
    // Process the data
    const currentWeather = processCurrentWeather(currentWeatherData);
    const hourlyForecasts = processHourlyForecast(hourlyForecastData);
    
    // Combine data
    weatherData = {
      current: currentWeather,
      hourly: hourlyForecasts,
      forecast: dailyForecastData
    };
    
    // Render the UI components
    renderCurrentWeather();
    renderHourlyForecast();
    renderDailyForecast();
    updateLastRefreshed();
    
  } catch (error) {
    console.error('Failed to load weather data:', error);
    showErrorMessage();
  }
}

// Process current weather with EVST timezone
function processCurrentWeather(currentWeather) {
  // Add dynamic date and time with EVST (EastVeil Summer Time) timezone - equivalent to CEST
  const currentDate = new Date();
  
  // Adjust to CEST/EVST (UTC+2)
  const cestTime = new Date(currentDate.getTime());
  const utcHours = currentDate.getUTCHours();
  cestTime.setUTCHours((utcHours + 2) % 24);
  
  const date = cestTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const time = cestTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) + ' EVST';

  return {
    ...currentWeather,
    date,
    time
  };
}

// Process hourly forecast with EVST timezone
function processHourlyForecast(allHourlyForecasts) {
  // Get current hour in EVST/CEST timezone (UTC+2)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const cestHour = (utcHours + 2) % 24;
  
  const hourlyForecasts = [];
  
  for (let i = 0; i < 8; i++) {
    const hourIndex = (cestHour + i) % 24;
    hourlyForecasts.push(allHourlyForecasts[hourIndex]);
  }
  
  return hourlyForecasts;
}

// Render current weather
function renderCurrentWeather() {
  if (!weatherData || !weatherData.current) return;
  
  const current = weatherData.current;
  
  // Create the HTML
  const html = `
    <div class="weather-card current-weather-card">
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div class="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div class="flex items-center mb-2">
            <h2 class="text-2xl font-bold mr-2">${current.location}</h2>
            <span class="text-sm font-medium bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full shadow-sm">
              ${current.time}
            </span>
          </div>
          <p class="text-gray-500 dark:text-gray-400 mb-6">${current.date}</p>
          
          <div class="flex items-center">
            <div class="mr-8">
              <span class="temp-display">${current.temperature}</span>
              <div class="flex mt-2">
                <span class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md mr-3">
                  ${current.feelsLike}
                </span>
                <div class="flex items-center text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <i class="fas fa-tint text-blue-500 mr-1"></i>
                  <span>${current.humidity}</span>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col items-center">
              <div class="rounded-full bg-white dark:bg-gray-800 p-4 shadow-sm mb-2">
                ${getWeatherIcon(current.condition, 80)}
              </div>
              <p class="text-center font-medium text-blue-600 dark:text-blue-400">${current.condition}</p>
            </div>
          </div>
        </div>
        
        <div class="weather-details">
          <div class="weather-detail-card">
            <div class="flex justify-center mb-2">
              <i class="fas fa-tachometer-alt text-2xl icon-pressure"></i>
            </div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Pressure</p>
            <p class="text-lg font-mono font-semibold">${current.pressure}</p>
          </div>
          
          <div class="weather-detail-card">
            <div class="flex justify-center mb-2">
              <i class="fas fa-wind text-2xl icon-wind"></i>
            </div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Wind</p>
            <p class="text-lg font-mono font-semibold">${current.wind}</p>
          </div>
          
          <div class="weather-detail-card">
            <div class="flex justify-center mb-2">
              <i class="fas fa-cloud-rain text-2xl icon-rain"></i>
            </div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Precipitation</p>
            <p class="text-lg font-mono font-semibold">${current.precipitation}</p>
          </div>
          
          <div class="weather-detail-card">
            <div class="flex justify-center mb-2">
              <i class="fas fa-sun text-2xl icon-uv"></i>
            </div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">UV Index</p>
            <p class="text-lg font-mono font-semibold">${current.uvIndex}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  currentWeatherEl.innerHTML = html;
}

// Render hourly forecast
function renderHourlyForecast() {
  if (!weatherData || !weatherData.hourly) return;
  
  // Create the HTML
  let html = `
    <div class="section-heading">
      <i class="fas fa-clock"></i>
      <h3>Hourly Forecast</h3>
    </div>
    
    <div class="hourly-scroll">
      <div class="flex space-x-4">
  `;
  
  // Add hourly cards
  weatherData.hourly.forEach((hour, index) => {
    const isCurrentHour = index === 0;
    
    html += `
      <div class="hourly-card ${isCurrentHour ? 'current-hour' : ''}">
        <p class="${isCurrentHour ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-400'} mb-2">
          ${hour.time}
        </p>
        
        <div class="flex justify-center">
          ${getWeatherIcon(hour.condition, 40)}
        </div>
        
        <p class="text-lg font-mono mt-2 ${isCurrentHour ? 'font-bold text-blue-600 dark:text-blue-400' : ''}">
          ${hour.temp}
        </p>
      </div>
    `;
  });
  
  html += `
      </div>
    </div>
  `;
  
  hourlyForecastEl.innerHTML = html;
}

// Render daily forecast
function renderDailyForecast() {
  if (!weatherData || !weatherData.forecast) return;
  
  // Create the HTML
  let html = `
    <div class="section-heading">
      <i class="fas fa-calendar-alt"></i>
      <h3>5-Day Forecast</h3>
    </div>
    
    <div class="weather-card">
  `;
  
  // Add daily rows
  weatherData.forecast.forEach((day, index) => {
    const isToday = index === 0;
    const hasBottomBorder = index < weatherData.forecast.length - 1;
    
    html += `
      <div class="daily-row ${isToday ? 'today' : ''} ${hasBottomBorder ? 'border-b' : ''}">
        <div class="w-1/4">
          <p class="font-bold ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}">
            ${day.day}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            ${day.date}
          </p>
        </div>
        
        <div class="w-1/4 flex justify-center">
          <div class="${isToday ? 'bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm' : ''}">
            ${getWeatherIcon(day.condition, 36)}
          </div>
        </div>
        
        <div class="w-1/4 text-center">
          <p class="font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}">
            ${day.conditionText}
          </p>
        </div>
        
        <div class="w-1/4 text-right flex flex-col items-end">
          <div class="flex items-center">
            <span class="text-xs mr-1 text-red-500">High</span>
            <span class="font-mono text-base font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}">
              ${day.high}
            </span>
          </div>
          <div class="flex items-center">
            <span class="text-xs mr-1 text-blue-500">Low</span>
            <span class="font-mono text-sm text-gray-600 dark:text-gray-400">
              ${day.low}
            </span>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
  `;
  
  dailyForecastEl.innerHTML = html;
}

// Update last refreshed time
function updateLastRefreshed() {
  const now = new Date();
  lastUpdatedEl.textContent = `Last updated: ${now.toLocaleTimeString()}`;
}

// Show error message
function showErrorMessage() {
  const errorHtml = `
    <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-8" role="alert">
      <p class="font-bold">Error</p>
      <p>Unable to load weather data. Please try again later.</p>
    </div>
  `;
  
  currentWeatherEl.innerHTML = errorHtml;
  hourlyForecastEl.innerHTML = '';
  dailyForecastEl.innerHTML = '';
}

// Set up event listeners
function setupEventListeners() {
  // Auto refresh toggle
  autoRefreshBtn.addEventListener('click', toggleAutoRefresh);
  
  // Manual refresh
  refreshBtn.addEventListener('click', () => {
    refreshBtn.classList.add('animate-spin');
    loadWeatherData().then(() => {
      setTimeout(() => {
        refreshBtn.classList.remove('animate-spin');
      }, 500);
    });
  });
  
  // Theme toggle
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Toggle auto refresh
function toggleAutoRefresh() {
  autoRefreshEnabled = !autoRefreshEnabled;
  
  if (autoRefreshEnabled) {
    autoRefreshBtn.innerHTML = '<span>Auto refresh: ON</span>';
    autoRefreshBtn.classList.add('bg-amber-500', 'text-white');
    autoRefreshBtn.classList.remove('bg-white/20');
    
    // Set up interval
    autoRefreshInterval = setInterval(() => {
      loadWeatherData();
    }, REFRESH_INTERVAL);
  } else {
    autoRefreshBtn.innerHTML = '<span>Auto refresh: OFF</span>';
    autoRefreshBtn.classList.remove('bg-amber-500', 'text-white');
    autoRefreshBtn.classList.add('bg-white/20');
    
    // Clear interval
    clearInterval(autoRefreshInterval);
  }
}

// Toggle theme
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update icon
  themeToggleBtn.innerHTML = isDarkMode 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Get appropriate weather icon based on condition
function getWeatherIcon(condition, size = 24) {
  // Normalize the condition string
  const normalizedCondition = condition.toLowerCase().replace(/\s+/g, '');
  
  // Icon mapping
  const iconMap = {
    sunny: `<i class="fas fa-sun icon-sun" style="font-size: ${size/16}rem;"></i>`,
    clear: `<i class="fas fa-sun icon-sun" style="font-size: ${size/16}rem;"></i>`,
    partlycloudy: `<i class="fas fa-cloud-sun icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    'partly-cloudy': `<i class="fas fa-cloud-sun icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    cloudy: `<i class="fas fa-cloud icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    overcast: `<i class="fas fa-cloud icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    rain: `<i class="fas fa-cloud-rain icon-rain" style="font-size: ${size/16}rem;"></i>`,
    rainy: `<i class="fas fa-cloud-rain icon-rain" style="font-size: ${size/16}rem;"></i>`,
    drizzle: `<i class="fas fa-cloud-rain icon-rain" style="font-size: ${size/16}rem;"></i>`,
    snow: `<i class="fas fa-snowflake icon-snow" style="font-size: ${size/16}rem;"></i>`,
    snowy: `<i class="fas fa-snowflake icon-snow" style="font-size: ${size/16}rem;"></i>`,
    fog: `<i class="fas fa-smog icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    foggy: `<i class="fas fa-smog icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    mist: `<i class="fas fa-smog icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    thunderstorm: `<i class="fas fa-bolt icon-rain" style="font-size: ${size/16}rem;"></i>`,
    thunder: `<i class="fas fa-bolt icon-rain" style="font-size: ${size/16}rem;"></i>`,
    'clear-night': `<i class="fas fa-moon icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    clearnight: `<i class="fas fa-moon icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    'partly-cloudy-night': `<i class="fas fa-cloud-moon icon-cloud" style="font-size: ${size/16}rem;"></i>`,
    partlycloudynight: `<i class="fas fa-cloud-moon icon-cloud" style="font-size: ${size/16}rem;"></i>`
  };
  
  // Return the appropriate icon or default to sun
  return iconMap[normalizedCondition] || iconMap.sunny;
}