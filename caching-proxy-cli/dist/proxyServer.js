import express from 'express';
import request from 'request';
export const startProxyServer = async (port, origin) => {
    const app = express();
    app.use('/api', (req, res) => {
        const url = `${origin}${req.originalUrl}`;
        req.pipe(request(url)).pipe(res);
    });
    app.listen(port, () => {
        console.log(`Proxy server listening on port ${port} and forwarding to ${origin}`);
    });
};
export const clearCache = async () => {
    // Implement cache clearing logic here
};
