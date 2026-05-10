import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import CrisisBar from './components/CrisisBar';
import MoodCheck from './components/MoodCheck';
import ChatWindow from './components/ChatWindow';

function App() {
  const [screen, setScreen] = useState('mood');
  const [mood, setMood] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleMoodSelect = (selectedMood, openingMessage) => {
    setMood(selectedMood);
    setMessages([{ role: 'assistant', content: openingMessage }]);
    setScreen('chat');
  };

  const handleRestart = () => {
    setScreen('mood');
    setMood(null);
    setMessages([]);
  };

  return (
    <div className="app-container">
      <Header onRestart={screen === 'chat' ? handleRestart : null} />
      <CrisisBar />
      {screen === 'mood' && (
        <MoodCheck onSelect={handleMoodSelect} />
      )}
      {screen === 'chat' && (
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          mood={mood}
        />
      )}
    </div>
  );
}

export default App;
