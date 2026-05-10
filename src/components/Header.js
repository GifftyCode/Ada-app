import React from 'react';

function Header({ onRestart }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-avatar" aria-hidden="true">A</div>
        <div>
          <div className="header-name">Ada</div>
          <div className="header-status">Here to listen · Always available</div>
        </div>
      </div>
      <div className="header-right">
        {onRestart ? (
          <button className="restart-btn" onClick={onRestart} aria-label="Start a new conversation">
            New chat
          </button>
        ) : (
          <span className="header-badge">Safe Space</span>
        )}
      </div>
    </header>
  );
}

export default Header;
