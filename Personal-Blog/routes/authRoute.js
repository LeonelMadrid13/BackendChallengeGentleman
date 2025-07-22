import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Show registration form
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration POST
router.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const { error } = await registerUser({ username, password, confirmPassword });
    if (error) {
        return res.render('register', { error, username });
    }
    res.redirect('/login');
});

// Show login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { error } = await loginUser({ username, password, req });
    if (error) {
        return res.render('login', { error, username });
    }
    // If using sessions: req.session.username = username;
    req.session.username = username;
    res.redirect('/admin');
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

export default router;
