// src/server.ts
import { program } from 'commander';
import { startProxyServer, clearCache } from './proxyServer.js';
program
    .option('--port <number>', 'Port to run the proxy server', '3000')
    .option('--origin <url>', 'Origin server to proxy requests to')
    .option('--clear-cache', 'Clear the cache');
program.parse(process.argv);
const opts = program.opts();
if (opts.clearCache) {
    await clearCache(); // Some function to clear your cache
    console.log('Cache cleared!');
    process.exit(0);
}
if (opts.port && opts.origin) {
    await startProxyServer(Number(opts.port), opts.origin);
    // Don't exit - keep server running
}
else {
    program.help();
}
