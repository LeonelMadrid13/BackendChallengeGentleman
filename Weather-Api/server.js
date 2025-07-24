import express from 'express';
import logger from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(logger('dev'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});