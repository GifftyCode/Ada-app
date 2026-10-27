const { buildModelInput } = require("./_lib/buildInput");
const { detectCrisis, SAFETY_LINE } = require("./_lib/crisisDetect");

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

  const userMessage = buildModelInput(messages);
  if (!userMessage) {
    return res.status(400).json({ error: "No student message found." });
  }
  const SPACE_BASE = "https://gifftybabe-adanne-api.hf.space";

  try {
    // Step 1: Submit the job
    const submitResponse = await fetch(
      `${SPACE_BASE}/gradio_api/call/generate_response`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [systemPrompt, userMessage],
        }),
      },
    );

    const submitText = await submitResponse.text();

    if (!submitResponse.ok) {
      // Privacy: never log message or reply content.
      console.error("Space submit error, status:", submitResponse.status);
      return res.status(submitResponse.status).json({
        error: "Could not reach AdaNne model. Please try again.",
      });
    }

    let eventId;
    try {
      const submitJson = JSON.parse(submitText);
      eventId = submitJson.event_id;
    } catch (e) {
      // Sometimes the event_id comes back as plain quoted text
      eventId = submitText.replace(/"/g, "").trim();
    }

    if (!eventId) {
      return res
        .status(500)
        .json({ error: "No event ID returned from AdaNne model." });
    }

    // Step 2: Poll for the result using event_id — note plural endpoint without v2 here
    const resultResponse = await fetch(
      `${SPACE_BASE}/gradio_api/call/generate_response/${eventId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    const resultText = await resultResponse.text();

    const lines = resultText
      .split("\n")
      .filter((line) => line.startsWith("data:"));
    const lastDataLine = lines[lines.length - 1];

    if (!lastDataLine) {
      return res.status(500).json({
        error: "AdaNne did not return a valid response. Please try again.",
      });
    }

    const parsedData = JSON.parse(lastDataLine.replace("data:", "").trim());
    const reply = Array.isArray(parsedData) ? parsedData[0]?.trim() : null;

    if (!reply) {
      return res.status(500).json({
        error: "AdaNne did not return a valid response. Please try again.",
      });
    }

    // Deterministic safety net: the model's short replies often omit crisis
    // contacts, so append them whenever the latest student message looks like
    // a crisis (independent of what the model said).
    const latest = messages.filter((m) => m && m.role === "user").pop();
    const crisis = detectCrisis(latest && latest.content);
    const finalReply = crisis ? `${reply}\n\n${SAFETY_LINE}` : reply;

    return res.status(200).json({ reply: finalReply, crisis });
  } catch (err) {
    console.error("Serverless function error:", err.message);
    return res.status(500).json({
      error: "Server error: " + err.message,
    });
  }
};
