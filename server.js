const http = require('http');
const https = require('https');
const args = process.argv.slice(2);

let FROM_VERSION = '0.63.4';
let TO_VERSION = '0.65.3';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--from' && i + 1 < args.length) {
    FROM_VERSION = args[i + 1];
  }
  if (args[i] === '--to' && i + 1 < args.length) {
    TO_VERSION = args[i + 1];
  }
}

const GITHUB_DIFF_URL = `https://github.com/react-native-community/rn-diff-purge/compare/release/${FROM_VERSION}...release/${TO_VERSION}.diff`;

http.createServer((req, res) => {
  https.get(GITHUB_DIFF_URL, (githubRes) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');

    githubRes.pipe(res);
  }).on('error', (err) => {
    res.writeHead(500);
    res.end('Error fetching diff');
  });
}).listen(5050, () => {
  console.log(`Local proxy running at http://localhost:5050\nfrom ${FROM_VERSION}\nto ${TO_VERSION}`);
});
