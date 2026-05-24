import React from 'react';
import AdaLogo from './AdaLogo';

function MessageBubble({ role, content }) {
  const isAda = role === 'assistant';
  return (
    <div className={`bubble-wrapper ${isAda ? 'bubble-wrapper--ada' : 'bubble-wrapper--user'}`}>
      {isAda && (
        <div className="bubble-avatar-logo">
          <AdaLogo size={30} showDot={false} />
        </div>
      )}
      <div
        className={`bubble ${isAda ? 'bubble--ada' : 'bubble--user'}`}
        aria-label={isAda ? 'Ada says' : 'You said'}
      >
        {content.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

export default MessageBubble;
