import express from 'express';
import logger from 'morgan';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('weather', {
        city: 'Kyiv',
        weather: {
            city: 'Kyiv',
            temp: 12,
            icon: '/icons/sun.png', // you can map this to your API's icon
            timeText: 'Thursday 17 : 44',
            precip: '1%',
            humidity: '52%',
            wind: '5km/h',
            forecast: [
                { day: 'Mon', icon: '/icons/rain.png', tempHigh: 8, tempLow: 0 },
                { day: 'Tue', icon: '/icons/partly-cloudy.png', tempHigh: 10, tempLow: 2 },
                { day: 'Wed', icon: '/icons/sun.png', tempHigh: 12, tempLow: 2 },
                { day: 'Thu', icon: '/icons/storm.png', tempHigh: 6, tempLow: 0 },
                { day: 'Fri', icon: '/icons/partly-cloudy.png', tempHigh: 8, tempLow: 1 },
            ]
        }
    });
});

router.use(logger('dev'));

export default router;