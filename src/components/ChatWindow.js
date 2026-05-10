import React, { useState, useRef, useEffect } from 'react';
import { ADA_SYSTEM_PROMPT } from '../utils/adaPrompt';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

function ChatWindow({ messages, setMessages }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error('API key not configured. Please add your Anthropic API key to the .env file.');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: ADA_SYSTEM_PROMPT,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I am sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Ada API error:', err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I am having some trouble connecting right now. Please check your internet connection and try again. You are not alone — I will be right here when you come back."
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

  return (
    <main className="chat-container">
      <div className="messages-area" role="log" aria-label="Conversation with Ada" aria-live="polite">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <div className="error-notice" role="alert">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Talk to Ada… (Enter to send, Shift+Enter for new line)"
          rows={2}
          disabled={loading}
          aria-label="Type your message to Ada"
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </main>
  );
}

export default ChatWindow;
