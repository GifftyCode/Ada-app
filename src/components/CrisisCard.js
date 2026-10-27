import React from "react";
import { CRISIS_LINE, MANI_LINE, EMERGENCY, MANI } from "../config/crisisResources";

// Shown immediately (no model call needed) when a message looks like a crisis.
function CrisisCard() {
  return (
    <div className="crisis-card" role="alert" aria-live="assertive">
      <p className="crisis-card-title">You matter, and you don't have to carry this alone.</p>
      <p>
        If you are thinking about ending your life or you are in danger right now,
        please reach a real person immediately:
      </p>
      <div className="crisis-card-actions">
        <a className="crisis-card-btn" href={`tel:${CRISIS_LINE.tel}`}>
          📞 {CRISIS_LINE.short}: {CRISIS_LINE.display}
        </a>
        <a className="crisis-card-btn" href={`tel:${MANI_LINE.tel}`}>
          📞 MANI: {MANI_LINE.display}
        </a>
        <a className="crisis-card-btn crisis-card-btn--urgent" href={`tel:${EMERGENCY.tel}`}>
          🚨 Emergency: {EMERGENCY.display}
        </a>
      </div>
      <p className="crisis-card-small">
        You can also go to the nearest hospital, tell one person you trust right now,
        or visit <a href={MANI.url} target="_blank" rel="noopener noreferrer">{MANI.display}</a>.
        AdaNne is an AI and cannot call anyone for you, but she is still here to talk.
      </p>
    </div>
  );
}

export default CrisisCard;
