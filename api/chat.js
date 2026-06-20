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

  const userMessage = messages[messages.length - 1].content;
  const SPACE_BASE = "https://gifftybabe-adanne-api.hf.space";

  try {
    // Step 1: Submit the job — note the /gradio_api/call/v2/ path and named keys
    const submitResponse = await fetch(
      `${SPACE_BASE}/gradio_api/call/v2/generate_response`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_prompt: systemPrompt,
          user_message: userMessage,
        }),
      },
    );

    const submitText = await submitResponse.text();
    console.log("Submit response:", submitText);

    if (!submitResponse.ok) {
      console.error("Space submit error:", submitText);
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
    console.log("Result response:", resultText);

    const lines = resultText
      .split("\n")
      .filter((line) => line.startsWith("data:"));
    const lastDataLine = lines[lines.length - 1];

    if (!lastDataLine) {
      return res
        .status(500)
        .json({
          error: "AdaNne did not return a valid response. Please try again.",
        });
    }

    const parsedData = JSON.parse(lastDataLine.replace("data:", "").trim());
    const reply = Array.isArray(parsedData) ? parsedData[0]?.trim() : null;

    if (!reply) {
      return res
        .status(500)
        .json({
          error: "AdaNne did not return a valid response. Please try again.",
        });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Serverless function error:", err.message);
    return res.status(500).json({
      error: "Server error: " + err.message,
    });
  }
};
