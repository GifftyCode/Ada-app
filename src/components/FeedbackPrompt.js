import React, { useState } from 'react';

const ratings = [
  { value: 5, emoji: '😊', label: 'Very helpful' },
  { value: 4, emoji: '🙂', label: 'Helpful' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 2, emoji: '😕', label: 'Not helpful' },
  { value: 1, emoji: '😞', label: 'Poor' },
];

function FeedbackPrompt({ onDone }) {
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In a real deployment, this would POST to a feedback endpoint
    // For now, we log it — in Chapter 4 we will wire this to a Google Sheet
    console.log('Ada feedback:', { rating: selected, comment });
    setSubmitted(true);
    setTimeout(onDone, 1800);
  };

  if (submitted) {
    return (
      <div className="feedback-card feedback-card--done">
        <span className="feedback-thanks-icon">🙏</span>
        <p className="feedback-thanks">Thank you — your feedback helps Ada improve.</p>
      </div>
    );
  }

  return (
    <div className="feedback-card">
      <p className="feedback-heading">How is Ada doing so far?</p>
      <p className="feedback-sub">Your honest feedback helps make Ada better for other students.</p>

      <div className="feedback-ratings">
        {ratings.map((r) => (
          <button
            key={r.value}
            className={`feedback-rating-btn ${selected === r.value ? 'selected' : ''}`}
            onClick={() => setSelected(r.value)}
            aria-label={r.label}
            title={r.label}
          >
            <span>{r.emoji}</span>
            <span className="feedback-rating-label">{r.label}</span>
          </button>
        ))}
      </div>

      <textarea
        className="feedback-comment"
        placeholder="Any other thoughts? (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      />

      <div className="feedback-actions">
        <button
          className="feedback-submit"
          onClick={handleSubmit}
          disabled={!selected}
        >
          Submit feedback
        </button>
        <button className="feedback-skip" onClick={onDone}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default FeedbackPrompt;
