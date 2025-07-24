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
            return cachedData;
        }
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`)
        const weatherData = await response.json();
        // extract only necessary data
        const { address, timezone, description, days, alerts, currentConditions } = weatherData;
        // remove stations from days array and from days.hours array
        const filteredDays = days.map(day => {
            const { stations, ...rest } = day;
            return {
                ...rest,
                hours: day.hours.map(hour => {
                    const { stations, ...hourRest } = hour;
                    return hourRest;
                })
            };
        });
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