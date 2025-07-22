import express from 'express';
const router = express.Router();

import {
    getAllUserArticles,
    getMarkdownContent,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleMetaBySlug
} from '../controllers/articleController.js';

// List all articles (dashboard)
router.get('/admin', (req, res) => {
    const articles = getAllUserArticles(req.session.username);
    res.render('admin', { articles });
});

// New article form
router.get('/admin/new', (req, res) => {
    res.render('new'); // blank form
});

// Handle new article creation
router.post('/admin/new', (req, res) => {
    const user = req.session.username;  // The logged-in user
    const { title, content, date } = req.body;
    const { error, slug } = createArticle({ user, title, content, date });
    if (error) {
        return res.render('new', { error, title, content, date });
    }
    res.redirect('/admin');
});

// Edit article form
router.get('/admin/edit/:slug', (req, res) => {
    const slug = req.params.slug;
    const user = req.session.username;  // The logged-in user
    if (!user) return res.status(401).send('Unauthorized');
    const article = getArticleMetaBySlug(slug, user);
    if (!article) return res.status(404).send('Article not found');
    const mdContent = getMarkdownContent(slug, user);
    res.render('edit', { article, content: mdContent });
});

// Handle update
router.post('/admin/edit/:slug', (req, res) => {
    const slug = req.params.slug;
    const user = req.session.username;  // The logged-in user
    if (!user) return res.status(401).send('Unauthorized');
    const { title, content, date } = req.body;
    const { error } = updateArticle(slug, user, { title, content, date });
    if (error) {
        // You may want to render edit with error (not implemented here for brevity)
        return res.status(400).send(error);
    }
    res.redirect('/admin');
});

// Handle deletion
router.post('/admin/delete/:slug', (req, res) => {
    const slug = req.params.slug;
    const user = req.session.username;  // The logged-in user
    if (!user) return res.status(401).send('Unauthorized');
    const { error } = deleteArticle(slug, user);
    if (error) {
        return res.status(404).send(error);
    }
    res.redirect('/admin');
});

export default router;
