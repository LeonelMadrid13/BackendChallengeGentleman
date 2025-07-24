import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Weather API');
});

// handle 404 errors
router.use((req, res) => {
    res.status(404).send('Not Found');
});

export default router;