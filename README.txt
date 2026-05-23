═══════════════════════════════════════════════════════
  ADA — AI Mental Health Support Chatbot
  MIVA Open University · MIT Research Project 2026
═══════════════════════════════════════════════════════

WHAT IS ADA?
Ada is a culturally adapted AI-powered mental health support
companion for Nigerian university students. She speaks English
and Nigerian Pidgin, understands Nigerian social pressures,
and provides first-line emotional support with crisis referrals.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO RUN ADA LOCALLY (on your own computer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1 — Add your API key
  Copy .env.example to a new file called exactly:  .env
  Open it and replace  your_api_key_here  with your key from:
  https://console.anthropic.com → API Keys → Create Key

  Your .env file should look like:
    ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

STEP 2 — Install dependencies (only needed once)
  In your terminal, inside this folder:
    npm install

STEP 3 — Start the backend server  (Terminal 1)
    node server.js

  You should see:
    ✓ Ada server running at http://localhost:3001

  Leave this running. Do NOT close it.

STEP 4 — Start the React app  (Terminal 2)
  Open a second terminal in VS Code (click the + icon):
    npm start

  Your browser opens at http://localhost:3000 — Ada is live.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO DEPLOY ADA TO VERCEL (public URL for everyone)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Push this project to GitHub (ask for help if needed)
2. Go to vercel.com → Sign up with GitHub → Add New Project
3. Select your ada-app repository
4. In "Environment Variables", add:
     Name:   ANTHROPIC_API_KEY
     Value:  (your actual key)
5. Click Deploy

Vercel will give you a live URL like:
  https://ada-mental-health.vercel.app

Share that URL with your survey participants.
Dr. Ogbuju can open it on his phone without installing anything.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ada-app/
├── api/
│   └── chat.js              Vercel serverless API route
├── public/
│   └── index.html           HTML shell
├── src/
│   ├── components/
│   │   ├── AboutScreen.js   Disclaimer + informed consent
│   │   ├── MoodCheck.js     Mood selection screen
│   │   ├── ChatWindow.js    Main conversation interface
│   │   ├── FeedbackPrompt.js  Mid-session feedback widget
│   │   ├── ResourcesScreen.js Nigerian mental health resources
│   │   ├── MessageBubble.js   Chat message display
│   │   ├── TypingIndicator.js Animated typing dots
│   │   ├── Header.js          Navigation header
│   │   └── CrisisBar.js       Crisis helpline banner
│   ├── utils/
│   │   └── adaPrompt.js     Ada's cultural system prompt
│   ├── styles/
│   │   └── App.css          All styling
│   ├── App.js               Screen controller
│   └── index.js             Entry point
├── .env.example             API key template
├── .gitignore               Keeps secrets out of GitHub
├── server.js                Local development server
├── vercel.json              Vercel deployment config
└── package.json             Project configuration
