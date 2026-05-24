import React from 'react';

function AdaLogo({ size = 42, showDot = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Deep forest green circle background */}
      <defs>
        <linearGradient id="adaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#1A6B50" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="50" fill="url(#adaGrad)" />

      {/* Chat bubble — white, rounded, with tail pointing down-left */}
      <path
        d="M28 32 Q28 22 38 22 L66 22 Q76 22 76 32 L76 58 Q76 68 66 68 L58 68 L50 80 L44 68 L38 68 Q28 68 28 58 Z"
        fill="white"
        opacity="0.97"
      />

      {/* Heart inside the bubble — forest green */}
      <path
        d="M50 62
           L36 48
           Q30 41 36 35
           Q42 29 50 37
           Q58 29 64 35
           Q70 41 64 48
           Z"
        fill="url(#adaGrad)"
      />

      {/* Online indicator dot — bright green, bottom right */}
      {showDot && (
        <>
          <circle cx="82" cy="78" r="9" fill="white" />
          <circle cx="82" cy="78" r="6.5" fill="#34C759" />
        </>
      )}
    </svg>
  );
}

export default AdaLogo;
