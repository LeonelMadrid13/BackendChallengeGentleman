// controllers/articleController.js

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper: slugify title for safe filenames/URLs
export function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric, non-space
        .replace(/\s+/g, '-') // spaces to dashes
        .replace(/-+/g, '-'); // collapse multiple dashes
}

// Helper: path to db
export function getDbPath() {
    return path.join(__dirname, '..', 'db.json');
}

// Load all articles metadata
export function getArticlesIndex() {
    const dbPath = getDbPath();
    if (!fs.existsSync(dbPath)) return [];
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

// Save all articles metadata
export function saveArticlesIndex(index) {
    fs.writeFileSync(getDbPath(), JSON.stringify(index, null, 2));
}

// Get single article metadata by slug and user
export function getArticleMeta(slug, user) {
    const index = getArticlesIndex();
    console.log({ slug, user, index });
    return index.find(a => a.slug === slug && a.user === user);
}

// Save new article (returns slug)
export function saveNewArticle({ user, title, content, date }) {
    const index = getArticlesIndex();
    let slug = slugify(title);

    // Ensure uniqueness (per user)
    let filename = `${slug}.md`;
    let count = 1;
    while (index.some(a => a.user === user && a.slug === slug)) {
        slug = `${slug}-${count}`;
        filename = `${slug}.md`;
        count++;
    }

    // Create user's article folder if it doesn't exist
    const userDir = path.join(__dirname, '..', 'articles', user);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    const filePath = path.join(userDir, filename);

    // Prepend "# Title" to the content
    const fileContent = `# ${title}\n\n${content}`;
    fs.writeFileSync(filePath, fileContent);

    // Add to index and save
    index.push({
        user,
        slug,
        title,
        date,
        file: `articles/${user}/${filename}`
    });
    saveArticlesIndex(index);
    return slug;
}

// Render an article by slug and user (returns { title, date, htmlContent } or null)
export function getArticleForRender(slug, user) {
    const articleMeta = getArticleMeta(slug, user);
    if (!articleMeta) return null;

    const mdPath = path.join(__dirname, '..', articleMeta.file);
    if (!fs.existsSync(mdPath)) return null;

    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const htmlContent = marked(mdContent);

    return {
        title: articleMeta.title,
        date: articleMeta.date,
        content: htmlContent
    };
}

// Get all articles (metadata array) for a user
export function getAllUserArticles(user) {
    return getArticlesIndex().filter(a => a.user === user);
}

export function getAllArticles() {
    return getArticlesIndex();
}

// Get raw markdown content by slug and user
export function getMarkdownContent(slug, user) {
    const meta = getArticleMeta(slug, user);
    if (!meta) return '';
    const filePath = path.join(__dirname, '..', meta.file);
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf-8');
}

// Get article meta by slug and user (just wrapper)
export function getArticleMetaBySlug(slug, user) {
    return getArticleMeta(slug, user);
}

// Create article (returns {error, slug})
export function createArticle({ user, title, content, date }) {
    if (!user || !title || !content || !date) {
        return { error: "All fields required" };
    }
    const slug = saveNewArticle({ user, title, content, date });
    return { slug };
}

// Update article (returns {error} or {})
export function updateArticle(slug, user, { title, content, date }) {
    const index = getArticlesIndex();
    const articleIdx = index.findIndex(a => a.slug === slug && a.user === user);
    if (articleIdx === -1) return { error: "Article not found" };
    // Update file (prepend # Title as before)
    const filePath = path.join(__dirname, '..', index[articleIdx].file);
    fs.writeFileSync(filePath, `# ${title}\n\n${content}`);
    // Update metadata (but not slug or file)
    index[articleIdx].title = title;
    index[articleIdx].date = date;
    saveArticlesIndex(index);
    return {};
}

// Delete article (returns {error} or {})
export function deleteArticle(slug, user) {
    let index = getArticlesIndex();
    const article = index.find(a => a.slug === slug && a.user === user);
    if (!article) return { error: "Article not found" };
    const filePath = path.join(__dirname, '..', article.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    index = index.filter(a => !(a.slug === slug && a.user === user));
    saveArticlesIndex(index);
    return {};
}
