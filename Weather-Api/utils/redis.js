import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on('error', err => console.error('[REDIS ERROR]', err));
await redisClient.connect();

// Helper functions:
export async function getCache(key) {
    if (!key) {
        throw new Error('Key is required to get cache');
    }
    if (typeof key !== 'string') {
        throw new Error('Key must be a string');
    }
    return await redisClient.get(key);
}

export async function setCache(key, value, ttlSeconds = 1800) { // Default TTL is 30 minutes
    if (!key || !value) {
        throw new Error('Key and value are required to set cache');
    }
    if (typeof value !== 'string') {
        throw new Error('Value must be a string');
    }

    console.log('Setting cache for:', key);
    console.log('Cache value:', value);
    await redisClient.setEx(key, ttlSeconds, value);
}

export default redisClient; // In case you need the client elsewhere
