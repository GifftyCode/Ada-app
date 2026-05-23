import React from 'react';

function Header({ screen, onRestart, onResources, onBack }) {
  return (
    <header className="app-header">
      <div className="header-left">
        {onBack ? (
          <button className="icon-btn" onClick={onBack} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        ) : (
          <div className="header-avatar" aria-hidden="true">A</div>
        )}
        <div>
          <div className="header-name">Ada</div>
          <div className="header-status">
            {screen === 'resources' ? 'Support Resources' : 'Here to listen · Always available'}
          </div>
        </div>
      </div>

      <div className="header-right">
        {screen === 'chat' && onResources && (
          <button className="header-link-btn" onClick={onResources} aria-label="View resources">
            Resources
          </button>
        )}
        {screen === 'chat' && onRestart && (
          <button className="restart-btn" onClick={onRestart} aria-label="Start a new conversation">
            New chat
          </button>
        )}
        {(screen === 'about' || screen === 'mood') && (
          <span className="header-badge">Safe Space</span>
        )}
      </div>
    </header>
  );
}

export default Header;
