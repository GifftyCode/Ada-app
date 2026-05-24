import React, { useState } from 'react';

function ParticipantScreen({ onContinue }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    onContinue(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <main className="participant-screen">
      <div className="participant-card">
        <span className="participant-icon" aria-hidden="true">👋</span>
        <h2 className="participant-title">Before we begin</h2>
        <p className="participant-sub">
          What would you like Ada to call you? You can use your first name,
          a nickname, or leave it blank — whatever feels comfortable.
        </p>
        <input
          className="participant-input"
          type="text"
          placeholder="e.g. Tunde, Amaka, or just leave blank"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
          maxLength={30}
          autoFocus
          aria-label="Enter your name or nickname"
        />
        <button className="about-btn" onClick={handleSubmit}>
          Continue →
        </button>
        <p className="participant-note">
          You can leave this blank and tap Continue.
        </p>
      </div>
    </main>
  );
}

export default ParticipantScreen;
