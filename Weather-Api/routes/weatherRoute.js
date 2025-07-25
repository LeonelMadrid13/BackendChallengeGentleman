import express from 'express';
import logger from 'morgan';

import { weatherApiLimiter } from '../rateLimiter.js';
import { getWeatherData } from '../controllers/weatherController.js';

const router = express.Router();

router.use('/api/weather', weatherApiLimiter, async (req, res) => {
    const weatherData = await getWeatherData(req.query.city || 'New York');
    res.json({ success: true, data: weatherData });
});

router.use(logger('dev'));

export default router;