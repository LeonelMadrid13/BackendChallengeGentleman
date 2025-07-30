import prisma from '../lib/prisma.js';

// GET /posts?term=optional
export const getBlogPosts = async (req, res) => {
    try {
        const { term } = req.query;

        const posts = await prisma.post.findMany({
            where: term
                ? {
                    OR: [
                        { title: { contains: term, mode: 'insensitive' } },
                        { content: { contains: term, mode: 'insensitive' } },
                        { category: { contains: term, mode: 'insensitive' } },
                    ],
                }
                : undefined,
            orderBy: { createdAt: 'desc' }, // Optional sorting
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('[GET POSTS ERROR]', error);
        res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
};

// GET /posts/:id
export const getBlogPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('[GET POST BY ID ERROR]', error);
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
};

// POST /posts
export const createBlogPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        if (!title || !content || !category || !tags) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newPost = await prisma.post.create({
            data: { title, content, category, tags },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('[CREATE POST ERROR]', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
};

// PUT /posts/:id
export const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, tags } = req.body;

        if (!title || !content || !category || !tags) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingPost = await prisma.post.findUnique({ where: { id } });

        if (!existingPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content, category, tags },
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('[UPDATE POST ERROR]', error);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

// DELETE /posts/:id
export const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;

        const existingPost = await prisma.post.findUnique({ where: { id } });

        if (!existingPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        await prisma.post.delete({ where: { id } });

        res.status(204).send();
    } catch (error) {
        console.error('[DELETE POST ERROR]', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
};
