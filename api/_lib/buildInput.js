// Builds the single text input sent to the AdaNne model.
// The Hugging Face Space takes (systemPrompt, userMessage) only, so recent
// context is folded into the message: up to the last 3 earlier student
// messages, then the latest one. This lets the model notice escalation
// (e.g. "I'm tired of life" followed by "I meant it").
const MAX_EARLIER = 3;
const MAX_CHARS = 600;

function buildModelInput(messages) {
  const students = messages
    .filter((m) => m && m.role === "user" && typeof m.content === "string")
    .map((m) => m.content.trim())
    .filter(Boolean);
  if (students.length === 0) return "";
  const latest = students[students.length - 1].slice(0, 2000);
  let earlier = students.slice(-1 - MAX_EARLIER, -1);
  while (earlier.join(" ").length > MAX_CHARS && earlier.length > 0) earlier.shift();
  if (earlier.length === 0) return latest;
  const context = earlier.map((t) => `- "${t}"`).join("\n");
  return `Earlier in this conversation the student said:\n${context}\n\nThe student's latest message:\n${latest}`;
}

module.exports = { buildModelInput };
