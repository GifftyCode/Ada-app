import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import CrisisBar from './components/CrisisBar';
import AboutScreen from './components/AboutScreen';
import MoodCheck from './components/MoodCheck';
import ChatWindow from './components/ChatWindow';
import ResourcesScreen from './components/ResourcesScreen';

function App() {
  // screens: 'about' | 'mood' | 'chat' | 'resources'
  const [screen, setScreen] = useState('about');
  const [mood, setMood] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleAgree = () => setScreen('mood');

  const handleMoodSelect = (selectedMood, openingMessage) => {
    setMood(selectedMood);
    setMessages([{ role: 'assistant', content: openingMessage }]);
    setScreen('chat');
  };

  const handleRestart = () => {
    setMood(null);
    setMessages([]);
    setScreen('mood');
  };

  const handleResources = () => setScreen('resources');
  const handleBackFromResources = () => setScreen(mood ? 'chat' : 'mood');

  return (
    <div className="app-container">
      <Header
        screen={screen}
        onRestart={screen === 'chat' ? handleRestart : null}
        onResources={handleResources}
        onBack={screen === 'resources' ? handleBackFromResources : null}
      />
      <CrisisBar />

      {screen === 'about' && (
        <AboutScreen onAgree={handleAgree} />
      )}

      {screen === 'mood' && (
        <MoodCheck onSelect={handleMoodSelect} />
      )}

      {screen === 'chat' && (
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          mood={mood}
          onResources={handleResources}
        />
      )}

      {screen === 'resources' && (
        <ResourcesScreen onBack={handleBackFromResources} />
      )}
    </div>
  );
}

export default App;
