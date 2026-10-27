// AUTO-COPIED from src/utils/crisisDetect.js — edit both together.
// Model-independent crisis detector.
// Runs in the browser on every student message BEFORE the model is called, so
// crisis resources appear instantly even when the model is slow or unavailable.
// It is deliberately sensitive: a false alarm only shows resources, while a miss
// could leave a student without help. Common Nigerian idioms such as
// "this exam go kill me" or "I'm dying of hunger" are excluded.

const PATTERNS = [
  /\bsuicid/i,
  /\bkill(ing)?\s+(my\s*self|myself)\b/i,
  /\bend(ing)?\s+(my\s+life|it\s+all|everything|am\b)/i,
  /\btake\s+my\s+(own\s+)?life\b/i,
  /\b(i|me)\s+(want|wan|wanna|wish)\s+(to\s+)?die\b/i,
  /\b(really|just)\s+want\s+to\s+die\b/i,
  /\b(don'?t|do not|no)\s+(want|wan)\s+(to\s+)?(live|be alive|dey alive)\b/i,
  /\bno\s+wan\s+live\b/i,
  /\b(not|never)\s+wake\s+up\b/i,
  /\b(hurt|harm|cut|cutting|burn)\w*\s+(my\s*self|myself|my\s+(hand|wrist|arm|body))\b/i,
  /\bself[-\s]?harm/i,
  /\b(overdose|took\s+(a\s+lot\s+of|too\s+many|plenty)\s+(pills|tablets|drugs))\b/i,
  /\b(drink|drank|swallow\w*|take|took)\s+(sniper|poison|rat\s*poison|otapiapia)\b/i,
  /\bjump\s+(from|off)\b/i,
  /\b(better\s+off\s+without\s+me|i'?m\s+(just\s+)?a\s+burden)\b/i,
  /\b(goodbye\s+(letter|note)|letters?\s+.{0,30}saying\s+goodbye)\b/i,
  /\bgiving\s+away\s+my\s+(things|stuff|belongings)\b/i,
  /\b(comot|leave)\s+(for\s+)?this\s+world\b/i,
  /\b(no\s+reason|nothing)\s+to\s+live\s+for\b/i,
  /\bpainless\s+way\s+to\s+(go|die)\b/i,
  /\b(okay|ok|fine)\s+to\s+give\s+up\b/i,
  /\bthinking\s+about\s+dying\b/i,
  /\bdey\s+think\s+(about|of)\s+(dying|death|how\s+i\s+go\s+(take\s+)?end)\b/i,
  /\bi\s+don\s+decide\s+already\b/i,
  /\bfeel(ing)?\s+like\s+dying\b/i,
  /\b(want|wan)\s+(to\s+)?end\s+(it|am|this)\b/i,
  /\bdone\s+with\s+(life|living|everything.{0,15}life)\b/i,
  /\b(what'?s|wetin\s+be)\s+the\s+point\s+(of\s+)?(anything|living|life|everything)\b/i,
  /\bnothing\s+will\s+ever\s+get\s+better\b/i,
  /\b(hopeless|no\s+hope\s+again)\b/i,
  /\b(beat|beats|beating|rape|raped|abuse|abuses|abusing)\s+me\b/i,
  /\b(scared|afraid|fear)\s+to\s+go\s+(back\s+)?(home|there)\b/i,
  /\bthreaten\w*\s+(me|to\s+kill)\b/i,
];

const IDIOMS = [
  /\b(exam|test|course|lecturer|assignment|work|traffic|hunger|heat|laugh)\w*\s+.{0,25}(go\s+kill|wan\s+kill|killing|finish)\s+me\b/i,
  /\bdying\s+of\s+(hunger|laughter|heat|boredom)\b/i,
  /\bkilled\s+(it|that|the)\b/i,
];

function detectCrisis(text) {
  if (!text) return false;
  const t = text.replace(/\s+/g, " ");
  const hit = PATTERNS.some((p) => p.test(t));
  if (!hit) return false;
  // An idiom only cancels a hit when no explicit self-harm wording is present.
  const strong = /\b(suicid|kill\s+myself|end\s+my\s+life|self[-\s]?harm|want\s+to\s+die)/i.test(t);
  if (!strong && IDIOMS.some((p) => p.test(t))) return false;
  return true;
}

// Server-side copy of src/utils/crisisDetect.js (keep the two in sync).
const SAFETY_LINE =
  "If you are thinking about ending your life or you are in danger right now, please call the SURPIN toll-free line on 0800 078 7746 or MANI on 0809 111 6264, call 112 for emergencies, or go to the nearest hospital. You can also tell one person you trust right now.";

module.exports = { detectCrisis, SAFETY_LINE };
