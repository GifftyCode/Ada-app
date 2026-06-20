require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const http = require("http");
const https = require("https");

const PORT = 3001;

function callHuggingFace(payload, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: "api-inference.huggingface.co",
      path: "/models/Gifftybabe/ada-mental-health-nigerian",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          reject(new Error("Invalid JSON from HuggingFace: " + data));
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "AdaNne server is running" }));
  }

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

        const HF_TOKEN = process.env.HF_TOKEN;

        if (!HF_TOKEN) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "HF_TOKEN not configured in .env file." }),
          );
        }

        const payload = {
          inputs: `Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.\n\n### Instruction:\n${systemPrompt}\n\n### Input:\n${messages[messages.length - 1].content}\n\n### Response:`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.1,
            return_full_text: false,
          },
        };

        let reply = null;

        for (let attempt = 1; attempt <= 3; attempt++) {
          console.log(`Attempt ${attempt} — calling HuggingFace...`);

          const result = await callHuggingFace(payload, HF_TOKEN);
          console.log("Status:", result.status);
          console.log("Response:", JSON.stringify(result.data).slice(0, 300));

          const data = result.data;

          if (data.error && data.error.toLowerCase().includes("loading")) {
            console.log("Model is loading — waiting 20 seconds...");
            await sleep(20000);
            continue;
          }

          if (result.status !== 200) {
            throw new Error(
              data.error || `HuggingFace returned status ${result.status}`,
            );
          }

          reply = Array.isArray(data)
            ? data[0]?.generated_text?.trim()
            : data?.generated_text?.trim();

          if (reply) break;
        }

        if (!reply) {
          reply =
            "I am sorry, I could not generate a response right now. Please try again in a moment.";
        }

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

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log("\n✓ AdaNne server running at http://localhost:" + PORT);
  console.log("✓ Health check: http://localhost:" + PORT + "/health");
  console.log("✓ Chat endpoint: http://localhost:" + PORT + "/api/chat");
  console.log("\nWaiting for messages...\n");
});
