import express from 'express';
const router = express.Router();
import {
    getArticleForRender,
    getAllArticles
} from '../controllers/articleController.js';

router.get('/article/:slug', (req, res) => {
    // Prefer session user if logged in; fall back to ?user= for guests
    let user;
    if (req.session.username) {
        user = req.session.username;
    } else if (req.query.user) {
        user = req.query.user;
    } else {
        return res.status(400).send('No user specified');
    }

    const slug = req.params.slug;
    const article = getArticleForRender(slug, user);
    if (!article) return res.status(404).send('Article not found');
    res.render('article', article);
});



router.get('/home', (req, res) => {
  const articles = getAllArticles(); // returns all articles, for all users
  // Group by user:
  const articlesByUser = {};
  articles.forEach(article => {
    if (!articlesByUser[article.user]) articlesByUser[article.user] = [];
    articlesByUser[article.user].push(article);
  });
  res.render('home', { articlesByUser });
});


export default router;
