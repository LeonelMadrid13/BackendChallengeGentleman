import express from 'express';
import logger from 'morgan';

import homeRoute from './routes/homeRoute.js';
import weatherRoute from './routes/weatherRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(homeRoute);
app.use('/api', weatherRoute);

app.use(logger('dev'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});