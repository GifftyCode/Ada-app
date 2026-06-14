// ──────────────────────────────────────────────────────────
//  Ada — Local Development Server
//  Run with: node server.js
//  Uses Groq API (free) — get your key at console.groq.com
//  Reads GROQ_API_KEY from your .env file
// ──────────────────────────────────────────────────────────

require("dotenv").config();
const http = require("http");

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS — allow React dev server and local phone testing
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Health check
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "Ada server is running" }));
  }

  // Chat endpoint
  if (req.url === "/api/chat" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { messages, systemPrompt } = JSON.parse(body);

        if (!messages || !Array.isArray(messages)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "A valid messages array is required." }),
          );
        }

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey || apiKey === "your_groq_key_here") {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              error:
                "API key not configured. Add GROQ_API_KEY to your .env file. Get a free key at console.groq.com",
            }),
          );
        }

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
          res.writeHead(response.status, {
            "Content-Type": "application/json",
          });
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

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.error("Server error:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Server error: " + err.message }),
        );
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log("\n✓ Ada server running at http://localhost:" + PORT);
  console.log("✓ Health check: http://localhost:" + PORT + "/health");
  console.log("✓ Chat endpoint: http://localhost:" + PORT + "/api/chat");
  console.log("\nWaiting for messages...\n");
});
