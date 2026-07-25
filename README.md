# Weather Intelligence App

This is a Weather Intelligence application built using Google AI Studio App Build, utilizing the public Open-Meteo Geocoding and Forecast APIs to display weather information, 7-day forecasts, and planning recommendations.

## Deployment Instructions

### AI Studio to GitHub
- The application code was generated using Google AI Studio App Build.
- The project source was synced directly to this GitHub repository using the built-in GitHub connection.

### Cloudflare Pages Deployment
1. Log into the Cloudflare dashboard and navigate to **Workers & Pages**.
2. Select **Connect to Git** and choose this repository.
3. Configure the build settings as follows:
   - **Framework Preset**: Vite / None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy** to generate the live production link.
