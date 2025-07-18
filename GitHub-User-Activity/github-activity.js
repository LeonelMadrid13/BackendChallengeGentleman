const http = require('http');

const [,, username] = process.argv;

if (!username) {
  console.error('Please provide a GitHub username as an argument.');
  process.exit(1);
}