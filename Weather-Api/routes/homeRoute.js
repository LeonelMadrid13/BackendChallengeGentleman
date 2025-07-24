import express from 'express';
import logger from 'morgan';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Weather API');
});

router.use(logger('dev'));

export default router;