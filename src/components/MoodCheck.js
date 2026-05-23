import React from 'react';

const moods = [
  {
    key: 'great',
    emoji: '😊',
    label: 'Great',
    opening: "That is wonderful. Sometimes it helps to talk even when things are going well — there is no wrong time to check in with yourself. What is on your mind today?"
  },
  {
    key: 'okay',
    emoji: '😐',
    label: 'Okay',
    opening: "'Okay' can mean many things. Sometimes it means we are carrying something quietly and just managing. I am here, no rush at all — how are you really doing?"
  },
  {
    key: 'stressed',
    emoji: '😰',
    label: 'Stressed',
    opening: "I see you are carrying some stress today. That is okay — you do not have to manage it alone. What has been going on for you?"
  },
  {
    key: 'sad',
    emoji: '😔',
    label: 'Sad',
    opening: "Sadness is heavy. I am glad you came here. No rush, no judgment — just tell me what is on your mind."
  },
  {
    key: 'anxious',
    emoji: '😟',
    label: 'Anxious',
    opening: "Anxiety can feel like your thoughts are running faster than you can keep up. I am right here with you. What has been making you feel anxious?"
  },
  {
    key: 'overwhelmed',
    emoji: '😩',
    label: 'Overwhelmed',
    opening: "When everything feels like too much at once, sometimes all we need is to pause and talk it through. I am right here. Where would you like to start?"
  },
];

function MoodCheck({ onSelect }) {
  return (
    <main className="mood-screen">
      <div className="mood-card">

        <div className="ada-avatar-large" aria-hidden="true">A</div>

        <h1 className="mood-title">How are you feeling?</h1>
        <p className="mood-subtitle">
          Choose what feels closest to where you are right now. There is no wrong answer.
        </p>

        <div className="mood-grid" role="group" aria-label="Select your current mood">
          {moods.map((m) => (
            <button
              key={m.key}
              className="mood-btn"
              onClick={() => onSelect(m.key, m.opening)}
              aria-label={`I am feeling ${m.label}`}
            >
              <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
              <span className="mood-label">{m.label}</span>
            </button>
          ))}
        </div>

        <p className="mood-privacy">
          🔒 Private · Not stored · Starts fresh each session
        </p>

      </div>
    </main>
  );
}

export default MoodCheck;
