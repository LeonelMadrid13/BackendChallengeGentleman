import 'dotenv/config';
import express from 'express';

import homeRoute from './routes/homeRoute.js';
import weatherRoute from './routes/weatherRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
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