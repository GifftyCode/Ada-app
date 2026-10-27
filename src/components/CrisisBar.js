import React from "react";
import { CRISIS_LINE, EMERGENCY, MANI } from "../config/crisisResources";

// Always visible on every screen; intentionally cannot be dismissed.
function CrisisBar() {
  return (
    <div className="crisis-bar" role="note" aria-label="Crisis resources">
      <span>
        In crisis? {CRISIS_LINE.short}:{" "}
        <a href={`tel:${CRISIS_LINE.tel}`}><strong>{CRISIS_LINE.display}</strong></a>
        &nbsp;·&nbsp;Emergency:{" "}
        <a href={`tel:${EMERGENCY.tel}`}><strong>{EMERGENCY.display}</strong></a>
        &nbsp;·&nbsp;
        <a href={MANI.url} target="_blank" rel="noopener noreferrer"><strong>{MANI.display}</strong></a>
      </span>
    </div>
  );
}

export default CrisisBar;
