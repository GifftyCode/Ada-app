import React, { useState, useRef, useEffect } from 'react';
import { getAdaSystemPrompt } from '../utils/adaPrompt';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import FeedbackPrompt from './FeedbackPrompt';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/chat'
    : 'http://localhost:3001/api/chat';

function ChatWindow({ messages, setMessages, participantName, onResources }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (userMessageCount >= 6 && !feedbackDone && !showFeedback) {
      setShowFeedback(true);
    }
  }, [userMessageCount, feedbackDone, showFeedback]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setShowFeedback(false);

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: getAdaSystemPrompt(participantName),
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || 'I am sorry, something went wrong. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

    } catch (err) {
      console.error('Ada error:', err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I am having some trouble connecting right now. Please check your internet connection and try again. You are not alone — I will be right here when you come back.'
        }
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFeedbackDone = () => {
    setShowFeedback(false);
    setFeedbackDone(true);
  };

  return (
    <main className="chat-container">
      <div
        className="messages-area"
        role="log"
        aria-label="Conversation with Ada"
        aria-live="polite"
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && <TypingIndicator />}

        {showFeedback && !loading && (
          <FeedbackPrompt onDone={handleFeedbackDone} />
        )}

        {error && (
          <div className="error-notice" role="alert">{error}</div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <div className="input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Talk to Ada…"
            rows={1}
            disabled={loading}
            aria-label="Type your message to Ada"
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="input-hint">Enter to send · Shift+Enter for new line</p>
      </div>
    </main>
  );
}

export default ChatWindow;
