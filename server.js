// ──────────────────────────────────────────────────────────
//  Ada — Local Development Server
//  Run with: node server.js
//  Uses Groq API (free) — get your key at console.groq.com
//  Reads GROQ_API_KEY from your .env file
// ──────────────────────────────────────────────────────────

require('dotenv').config();
const http = require('http');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS — allow React dev server and local phone testing
  res.setHeader('Access-Control-Allow-Origin', '*');
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

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey || apiKey === 'your_groq_key_here') {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: 'API key not configured. Add GROQ_API_KEY to your .env file. Get a free key at console.groq.com'
          }));
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1024,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Groq API error:', errorData);
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: errorData?.error?.message || 'Groq API error. Please try again.'
          }));
        }

        const data = await response.json();
        const reply =
          data.choices?.[0]?.message?.content ||
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

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('\n✓ Ada server running at http://localhost:' + PORT);
  console.log('✓ Health check: http://localhost:' + PORT + '/health');
  console.log('✓ Chat endpoint: http://localhost:' + PORT + '/api/chat');
  console.log('\nWaiting for messages...\n');
});
