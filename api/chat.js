// ──────────────────────────────────────────────────────────
//  Ada — Vercel Serverless Function
//  Lives at /api/chat in production
//  Uses Groq API (free) — set GROQ_API_KEY in Vercel env vars
// ──────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'A valid messages array is required.' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: GROQ_API_KEY not set in environment variables.'
    });
  }

  try {
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
      return res.status(response.status).json({
        error: errorData?.error?.message || 'Could not reach AI service. Please try again.'
      });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      'I am sorry, I could not generate a response. Please try again.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Serverless function error:', err.message);
    return res.status(500).json({
      error: 'A server error occurred. Please check your connection and try again.'
    });
  }
};
