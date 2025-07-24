import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'cache.json');

export async function getCache() {
    try {
        const data = fs.readFileSync(CACHE_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('[CACHE] Error reading cache file:', error);
        if (error.code === 'ENOENT' || error.name === 'SyntaxError') {
            fs.writeFileSync(CACHE_FILE, JSON.stringify([]));
            return [];
        }
    }
}

export async function writeCache(cache) {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (error) {
        console.error('[CACHE] Error writing cache file:', error);
        throw new Error('Failed to write cache');
    }
}