// ─────────────────────────────────────────────────────────────────────────────
//  Ada — Local Development Server
//  Run with: node server.js
//  Mirrors the Vercel serverless function for local testing.
//  Reads ANTHROPIC_API_KEY from your .env file.
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config();
const http = require('http');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS headers — allow React dev server to call this
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Health check
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'Ada server is running' }));
  }

  // Chat endpoint
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => { body += chunk.toString(); });

    req.on('end', async () => {
      try {
        const { messages, systemPrompt } = JSON.parse(body);

        if (!messages || !Array.isArray(messages)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'A valid messages array is required.' }));
        }

        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey || apiKey === 'your_api_key_here') {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: 'API key not configured. Add ANTHROPIC_API_KEY to your .env file.'
          }));
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: errorData?.error?.message || 'Anthropic API error'
          }));
        }

        const data = await response.json();
        const reply =
          data.content?.[0]?.text ||
          'I am sorry, I could not generate a response. Please try again.';

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply }));

      } catch (err) {
        console.error('Server error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Server error: ' + err.message }));
      }
    });

    return;
  }

  // 404 for anything else
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('\n✓ Ada server running at http://localhost:' + PORT);
  console.log('✓ Health check: http://localhost:' + PORT + '/health');
  console.log('✓ Chat endpoint: http://localhost:' + PORT + '/api/chat');
  console.log('\nWaiting for messages from the React app...\n');
});
