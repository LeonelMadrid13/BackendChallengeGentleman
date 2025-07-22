import express from 'express';
import articleRoute from './routes/articleRoute.js';
import adminRoutes from './routes/adminRoute.js';
import authRoutes from './routes/authRoute.js';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // use an env variable in production!
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Only show frontpage on GET /
app.get('/', (req, res) => {
    res.redirect('/frontpage');
});
// Show frontpage
app.get('/frontpage', (req, res) => {
    res.render('frontpage');
});

// Mount routes
app.use(authRoutes);
app.use(adminRoutes);
app.use(articleRoute);

// 404 fallback (optional)
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
