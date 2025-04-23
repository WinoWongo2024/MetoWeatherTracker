# Méto ÖestVèl Weather Website

A beautiful weather website for Méto ÖestVèl that displays weather data for ÖestVèl. The website includes current weather conditions, hourly forecasts, and 5-day forecasts with a toggleable dark/light mode and auto-refresh functionality.

## Features

- Current weather conditions with detailed metrics
- Hourly forecast for the next 8 hours
- 5-day daily forecast
- Auto-refresh toggle for real-time updates
- Dark/Light mode toggle
- Time displayed in EVST (EastVeil Summer Time) timezone
- API/Static mode toggle for flexible deployment

## Deployment Options

This repository contains two versions of the weather website:

1. **React Application** - A full-featured React application with modern UI components
2. **Static HTML/CSS/JS Version** - A simpler but fully functional static version for guaranteed GitHub Pages compatibility

## React Application

### Tech Stack

- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Query
- Express (development only)

### Deployment to GitHub Pages

The React application is configured to deploy to GitHub Pages. Follow these steps:

1. Fork this repository to your GitHub account
2. Enable GitHub Pages in your repository settings
3. The GitHub Action workflow will automatically build and deploy the site when you push to the main branch

### Switching Between API and Static Modes

The React application can run in two modes:

- **API Mode**: Fetches data from the backend API (default in development)
- **Static Mode**: Uses JSON files directly without a backend (used in GitHub Pages)

You can toggle between these modes using the API/Static switch in the header.

## Static HTML/CSS/JS Version

For maximum compatibility with GitHub Pages, a simpler static version is also included.

### Tech Stack

- HTML
- CSS
- JavaScript
- Font Awesome
- TailwindCSS (CDN)

### Deployment to GitHub Pages

1. The static version is ready to deploy as-is
2. Simply copy the contents of the `static_version` folder to your GitHub Pages repository
3. No build process is required

## Development

To run the React application locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

To test the static version locally:

1. Navigate to the `static_version` directory
2. Use any simple web server, e.g., `python -m http.server`

## Credits

- Weather data for ÖestVèl
- Icons from Lucide React and Font Awesome
- UI components from shadcn/ui