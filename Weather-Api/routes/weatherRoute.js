import express from 'express';

const router = express.Router();

router.use('/weather', (req, res) => {
    res.json({ message: 'Weather data' });
});

export default router;