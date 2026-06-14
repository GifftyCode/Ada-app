// ──────────────────────────────────────────────────────────
//  Ada — Vercel Serverless Function
//  Lives at /api/chat in production
//  Uses Groq API (free) — set GROQ_API_KEY in Vercel env vars
// ──────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "A valid messages array is required." });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "Server configuration error: GROQ_API_KEY not set in environment variables.",
    });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Gifftybabe/ada-mental-health-nigerian",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: `Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.\n\n### Instruction:\n${systemPrompt}\n\n### Input:\n${messages[messages.length - 1].content}\n\n### Response:`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.1,
            return_full_text: false,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      res.writeHead(response.status, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error:
            errorData?.error ||
            "Could not reach AdaNne model. Please try again.",
        }),
      );
    }

    const data = await response.json();
    const reply = Array.isArray(data)
      ? data[0]?.generated_text?.trim()
      : data?.generated_text?.trim() ||
        "I am sorry, I could not generate a response right now. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Serverless function error:", err.message);
    return res.status(500).json({
      error:
        "A server error occurred. Please check your connection and try again.",
    });
  }
};
