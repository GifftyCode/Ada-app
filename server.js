require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const http = require("http");
const { buildModelInput } = require("./api/_lib/buildInput");
const { detectCrisis, SAFETY_LINE } = require("./api/_lib/crisisDetect");
const https = require("https");

const PORT = 3001;

function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
          ...headers,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            reject(new Error("Invalid JSON: " + data));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

function httpsGet(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, method: "GET" }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({ status: res.statusCode, text: data });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

const SPACE_HOST = "gifftybabe-adanne-api.hf.space";

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

        const userMessage = buildModelInput(messages);

        // Step 1: Submit job to HuggingFace Space
        console.log("Submitting to AdaNne Space...");
        const submitResult = await httpsPost(
          SPACE_HOST,
          "/gradio_api/call/v2/generate_response",
          { system_prompt: systemPrompt, user_message: userMessage },
          {},
        );

        console.log("Submit status:", submitResult.status);

        let eventId = submitResult.data?.event_id;
        if (!eventId) {
          throw new Error("No event_id returned from AdaNne Space");
        }

        // Step 2: Poll for result
        console.log("Polling for result, event_id:", eventId);
        const pollResult = await httpsGet(
          SPACE_HOST,
          `/gradio_api/call/generate_response/${eventId}`,
        );

        console.log("Poll result length:", pollResult.text.length);

        const lines = pollResult.text
          .split("\n")
          .filter((l) => l.startsWith("data:"));
        const lastLine = lines[lines.length - 1];

        if (!lastLine) {
          throw new Error("No data lines in poll response");
        }

        const parsed = JSON.parse(lastLine.replace("data:", "").trim());
        const reply = Array.isArray(parsed) ? parsed[0]?.trim() : null;

        if (!reply) {
          throw new Error("Empty reply from model");
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        const latest = messages.filter((m) => m && m.role === "user").pop();
        const crisis = detectCrisis(latest && latest.content);
        const finalReply = crisis ? `${reply}\n\n${SAFETY_LINE}` : reply;
        return res.end(JSON.stringify({ reply: finalReply, crisis }));
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
  console.log("✓ Calling Space at: " + SPACE_HOST);
  console.log("\nWaiting for messages...\n");
});
