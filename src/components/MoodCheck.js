import React from 'react';
import AdaLogo from './AdaLogo';

const moods = [
  {
    key: 'great',
    emoji: '😊',
    label: 'Great',
    opening: (name) =>
      `That is wonderful${name ? `, ${name}` : ''}. Sometimes it helps to talk even when things are going well — there is no wrong time to check in with yourself. What is on your mind today?`
  },
  {
    key: 'okay',
    emoji: '😐',
    label: 'Okay',
    opening: (name) =>
      `"Okay" can mean many things${name ? `, ${name}` : ''}. Sometimes it means we are carrying something quietly and just managing. I am here, no rush at all — how are you really doing?`
  },
  {
    key: 'stressed',
    emoji: '😰',
    label: 'Stressed',
    opening: (name) =>
      `${name ? `${name}, stress` : 'Stress'} is heavy and I can see you are carrying some of it today. You do not have to manage it alone. What has been going on for you?`
  },
  {
    key: 'sad',
    emoji: '😔',
    label: 'Sad',
    opening: (name) =>
      `Sadness is heavy${name ? `, ${name}` : ''}. I am glad you came here. No rush, no judgment — just tell me what is on your mind.`
  },
  {
    key: 'anxious',
    emoji: '😟',
    label: 'Anxious',
    opening: (name) =>
      `Anxiety can feel like your thoughts are running faster than you can keep up${name ? `, ${name}` : ''}. I am right here with you. What has been making you feel anxious?`
  },
  {
    key: 'overwhelmed',
    emoji: '😩',
    label: 'Overwhelmed',
    opening: (name) =>
      `When everything feels like too much at once${name ? `, ${name}` : ''}, sometimes all we need is to pause and talk it through. I am right here. Where would you like to start?`
  },
];

function MoodCheck({ onSelect, participantName }) {
  return (
    <main className="mood-screen">
      <div className="mood-card">

        <div className="mood-logo-wrap">
          <AdaLogo size={80} showDot={true} />
        </div>

        <h1 className="mood-title">
          {participantName
            ? `Hello, ${participantName} 👋`
            : 'Hello there 👋'}
        </h1>
        <p className="mood-subtitle">
          Choose what feels closest to where you are right now.
          There is no wrong answer.
        </p>

        <div className="mood-grid" role="group" aria-label="Select your current mood">
          {moods.map((m) => (
            <button
              key={m.key}
              className="mood-btn"
              onClick={() => onSelect(m.key, m.opening(participantName))}
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
