import React, { useState } from 'react';

function CrisisBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="crisis-bar" role="alert">
      <span>
        In crisis? Call NSPI: <strong>09080217555</strong>
        &nbsp;·&nbsp;
        Visit <strong>mani.ng</strong>
      </span>
      <button
        className="crisis-close"
        onClick={() => setVisible(false)}
        aria-label="Dismiss crisis resources"
      >
        ✕
      </button>
    </div>
  );
}

export default CrisisBar;
