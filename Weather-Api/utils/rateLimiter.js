// rateLimiter.js
import rateLimit from 'express-rate-limit';

export const weatherApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 60 requests per windowMs
    message: {
        status: 429,
        error: "Too many requests. Please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
