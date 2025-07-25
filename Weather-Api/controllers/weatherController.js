import { setCache, getCache } from "../utils/redis.js";

export async function getWeatherData(city) {
    // Simulate fetching weather data
    try {
        if (!city) {
            throw new Error('City is required');
        }
        const cachedData = await getCache(city);
        if (cachedData) {
            console.log('[WEATHER_CONTROLLER] Returning cached data for:', city);
            return JSON.parse(cachedData);
        }
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`)
        const weatherData = await response.json();
        // extract only necessary data
        const { address, timezone, description, days, alerts, currentConditions } = weatherData;
        // remove stations and hours from days array and return only 5 days
        const filteredDays = days.slice(0, 5).map(day => {
            const { stations, hours, ...rest } = day;
            return {
                ...rest,
            };
        });
        delete currentConditions.stations;
        const extractedData = { address, timezone, description, days: filteredDays, alerts, currentConditions };
        // Update cache
        console.log('[WEATHER_CONTROLLER] Fetched new data for:', city);
        await setCache(city, JSON.stringify(extractedData));
        return extractedData;
    } catch (error) {
        console.error('[WEATHER_CONTROLLER] Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
}