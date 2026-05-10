import React from 'react';

function TypingIndicator() {
  return (
    <div className="bubble-wrapper bubble-wrapper--ada" aria-label="Ada is typing">
      <div className="bubble-avatar" aria-hidden="true">A</div>
      <div className="bubble bubble--ada typing-bubble" aria-hidden="true">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export default TypingIndicator;
