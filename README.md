# Méto ÖestVèl Weather Website

A beautiful weather website for Méto ÖestVèl that displays weather data for ÖestVèl. The website includes current weather conditions, hourly forecasts, and 5-day forecasts with a toggleable dark/light mode and auto-refresh functionality.

## Features

- Current weather conditions with detailed metrics
- Hourly forecast for the next 8 hours
- 5-day daily forecast
- Auto-refresh toggle for real-time updates
- Dark/Light mode toggle
- Time displayed in EVST (EastVeil Summer Time) timezone

## Tech Stack

- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Query
- Express (development only)

## Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages. Follow these steps to deploy:

1. Fork this repository to your GitHub account
2. Enable GitHub Pages in your repository settings
3. The GitHub Action workflow will automatically build and deploy the site when you push to the main branch

### Manual Deployment

If you want to manually deploy to GitHub Pages:

1. Push all your changes to GitHub
2. Run `node scripts/test-static.js` to prepare the static files
3. Build the project with `npm run build`
4. Push the `dist/public` directory to the `gh-pages` branch

### Switching Between API and Static Modes

The website can run in two modes:

- **API Mode**: Fetches data from the backend API (default in development)
- **Static Mode**: Uses JSON files directly without a backend (used in GitHub Pages)

You can toggle between these modes using the API/Static switch in the header.

## Development

To run the project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Credits

- Weather data for ÖestVèl
- Icons from Lucide React
- UI components from shadcn/ui