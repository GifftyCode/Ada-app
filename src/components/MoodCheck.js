import React from 'react';

const moods = [
  {
    key: 'great',
    emoji: '😊',
    label: 'Great',
    opening: "That is wonderful to hear! Sometimes it helps to talk even when things are going well — there is no wrong time to check in with yourself. What is on your mind today?"
  },
  {
    key: 'okay',
    emoji: '😐',
    label: 'Okay',
    opening: "'Okay' can mean many things. Sometimes it means we are carrying something quietly and just managing. I am here, no rush at all. How are you really doing?"
  },
  {
    key: 'stressed',
    emoji: '😰',
    label: 'Stressed',
    opening: "Stress is heavy, and I am glad you came here instead of carrying it alone. You do not have to figure everything out right now. What has been weighing on you most?"
  },
  {
    key: 'sad',
    emoji: '😔',
    label: 'Sad',
    opening: "I am sorry you are feeling sad today. That takes honesty to admit, and I respect that. No judgment here — just tell me what has been going on for you."
  },
  {
    key: 'anxious',
    emoji: '😟',
    label: 'Anxious',
    opening: "Anxiety can feel like your mind is running faster than you can keep up with. I see you, and I am right here. Take a breath — we can talk through this together. What is making you feel anxious?"
  },
  {
    key: 'overwhelmed',
    emoji: '😩',
    label: 'Overwhelmed',
    opening: "When everything feels like too much at once, it helps to just pause and talk it out with someone. I am right here with you. Where would you like to start?"
  },
];

function MoodCheck({ onSelect }) {
  return (
    <main className="mood-screen">
      <div className="mood-card">
        <div className="ada-avatar-large" aria-hidden="true">A</div>
        <h1 className="mood-title">Hello, I am Ada</h1>
        <p className="mood-subtitle">
          A safe space to talk — no judgment, no pressure, no cost.<br />
          How are you feeling right now?
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
          🔒 Everything you share with Ada is private and not stored.
        </p>
      </div>
    </main>
  );
}

export default MoodCheck;
