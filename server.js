const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Ada server is running" });
});

app.post("/chat", async (req, res) => {
  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_key_here") {
    return res.status(500).json({
      error:
        "Groq API key not configured. Please add GROQ_API_KEY to your .env file.",
    });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", errorData);
      return res.status(response.status).json({
        error:
          errorData?.error?.message ||
          `Groq API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "I am sorry, I could not generate a response. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err.message);
    res
      .status(500)
      .json({
        error: "Server error. Please check your internet and try again.",
      });
  }
});

app.listen(PORT, () => {
  console.log(`\n Ada server running at http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(` Waiting for messages...\n`);
});
