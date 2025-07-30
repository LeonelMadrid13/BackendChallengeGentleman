import express from 'express';
import logger from 'morgan';

import { createBlogPost, updateBlogPost, deleteBlogPost, getBlogPosts, getBlogPostById } from '../controllers/blogController.js';

const router = express.Router();

router.use(logger('dev'));

// Create blog post
router.post('/posts', createBlogPost);

// Update blog post
router.put('/posts/:id', updateBlogPost);

router.delete('/posts/:id', deleteBlogPost);

// Get blog posts
router.get('/posts', getBlogPosts);

router.get('/posts/:id', getBlogPostById);

export default router;