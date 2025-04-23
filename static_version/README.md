# Méto ÖestVèl Weather - Static Version

This is a completely static version of the Méto ÖestVèl Weather website, built with pure HTML, CSS, and JavaScript. It's designed to work anywhere, including GitHub Pages, without requiring any server-side components.

## Features

- Current weather conditions with detailed metrics
- Hourly forecast for the next 8 hours
- 5-day daily forecast
- Auto-refresh toggle for real-time updates
- Dark/Light mode toggle with saved preferences
- Time displayed in EVST (EastVeil Summer Time) timezone

## How It Works

This version uses local JSON files to store the weather data. The JavaScript fetches the data from these files and renders it to the page. The time and date are dynamically calculated based on the EVST timezone (UTC+2).

## Deployment to GitHub Pages

1. Just upload the entire `static_version` folder to your GitHub repository
2. Enable GitHub Pages in your repository settings
3. No build process is needed, as this is a completely static site

## Local Development

To run locally, you can use any simple web server. For example:

```
# Using Python
python -m http.server

# Using Node.js
npx serve
```

## Customization

To customize the weather data, simply edit the JSON files in the `data` folder.

## Credits

- Weather data for ÖestVèl
- Font Awesome for icons
- Tailwind CSS for styling