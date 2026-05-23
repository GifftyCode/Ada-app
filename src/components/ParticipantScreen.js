import React, { useState } from "react";

function ParticipantScreen({ onContinue }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const id = name.trim() || "Anonymous";
    onContinue(id);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="participant-screen">
      <div className="participant-card">
        <div className="participant-icon" aria-hidden="true">
          👋
        </div>
        <h2 className="participant-title">Before we begin</h2>
        <p className="participant-sub">
          Enter your first name or a nickname so Ada can address you personally.
          This is only used within your session — nothing is stored.
        </p>
        <input
          className="participant-input"
          type="text"
          placeholder="e.g. Tunde, Amaka, or just Anonymous"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
          maxLength={30}
          autoFocus
          aria-label="Enter your name or nickname"
        />
        <button className="about-btn" onClick={handleSubmit}>
          Continue to Ada →
        </button>
        <p className="participant-note">
          You can also leave this blank and tap Continue.
        </p>
      </div>
    </main>
  );
}

export default ParticipantScreen;
