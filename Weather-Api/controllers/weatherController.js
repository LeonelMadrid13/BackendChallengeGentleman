import { getCache, writeCache } from "../utils/util.js";

export async function getWeatherData(city) {
    // Simulate fetching weather data
    try {
        if (!city) {
            throw new Error('City is required');
        }
        const cache = await getCache();
        const cachedData = cache.find(item => item.city.toLowerCase() === city.toLowerCase());
        if (cachedData && ((Date.now() - cachedData.timestamp) < 30000)) { // 30 seconds cache
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
        cache.push({ city, timestamp: Date.now(), data: extractedData });
        console.log('[WEATHER_CONTROLLER] Fetched new data for:', city);
        await writeCache(cache);
        return extractedData;
    } catch (error) {
        console.error('[WEATHER_CONTROLLER] Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
}