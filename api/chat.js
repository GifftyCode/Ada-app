// ─────────────────────────────────────────────────────────────────────────────
//  Ada — Serverless API Route
//  Works on Vercel (production) and can be called locally too.
//  Vercel reads ANTHROPIC_API_KEY from environment variables automatically.
// ─────────────────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'A valid messages array is required.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: API key not set.'
    });
  }

  try {
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
      console.error('Anthropic error:', errorData);
      return res.status(response.status).json({
        error: errorData?.error?.message || 'Could not reach AI service. Please try again.'
      });
    }

    const data = await response.json();
    const reply =
      data.content?.[0]?.text ||
      'I am sorry, I could not generate a response. Please try again.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({
      error: 'A server error occurred. Please check your connection and try again.'
    });
  }
}
