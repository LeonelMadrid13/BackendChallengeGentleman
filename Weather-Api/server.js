import express from 'express';
import dotenv from 'dotenv';

import homeRoute from './routes/homeRoute.js';
import weatherRoute from './routes/weatherRoute.js';

dotenv.config('./.env');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(homeRoute);
app.use(weatherRoute);

// handle 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});