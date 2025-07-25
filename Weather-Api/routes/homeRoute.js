import express from 'express';
import logger from 'morgan';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/weather');
});

router.use(logger('dev'));

export default router;