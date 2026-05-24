═══════════════════════════════════════════════════════════
  ADA — AI Mental Health Support Chatbot
  MIVA Open University · MIT Research Project 2026
═══════════════════════════════════════════════════════════

WHAT IS ADA?
Ada is a culturally adapted AI-powered mental health support
companion for Nigerian university students. She understands
Nigerian Pidgin, cultural pressures, and stigma around
mental health — providing warm, judgment-free first-line
support with crisis escalation to real help when needed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RUNNING ADA LOCALLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1 — Get a free Groq API key
  Go to: https://console.groq.com
  Sign up free (no card needed)
  Click API Keys → Create Key → copy the key

STEP 2 — Add your API key
  Copy .env.example and rename the copy to exactly:  .env
  Open .env and replace  your_groq_key_here  with your key:
    GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx

STEP 3 — Install dependencies (first time only)
  In your terminal inside this folder:
    npm install

STEP 4 — Start the backend server  [Terminal 1]
    node server.js
  You should see:  ✓ Ada server running at http://localhost:3001
  Leave this running. Do NOT close it.

STEP 5 — Start the React app  [Terminal 2]
  Open a second terminal (click + in VS Code terminal panel):
    npm start
  Browser opens at http://localhost:3000 — Ada is live.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEPLOYING TO VERCEL (live public URL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Push this project to a GitHub repository
2. Go to vercel.com → Sign up with GitHub → Add New Project
3. Select your ada-mental-health repository
4. In Environment Variables, add:
     Name:   GROQ_API_KEY
     Value:  (your actual Groq key)
5. Click Deploy

Vercel gives you a live URL like:
  https://ada-mental-health.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ada-app/
├── api/
│   └── chat.js              Vercel serverless function (Groq)
├── public/
│   └── index.html           HTML shell
├── src/
│   ├── components/
│   │   ├── AdaLogo.js       SVG logo (chat bubble + heart)
│   │   ├── AboutScreen.js   Disclaimer + informed consent
│   │   ├── ParticipantScreen.js  Name entry screen
│   │   ├── MoodCheck.js     Mood selection screen
│   │   ├── ChatWindow.js    Main conversation interface
│   │   ├── FeedbackPrompt.js    Mid-session feedback widget
│   │   ├── ResourcesScreen.js   Nigerian mental health resources
│   │   ├── MessageBubble.js     Chat message display
│   │   ├── TypingIndicator.js   Animated typing dots
│   │   ├── Header.js        Navigation header with logo
│   │   └── CrisisBar.js     Crisis helpline banner
│   ├── utils/
│   │   └── adaPrompt.js     Ada's cultural system prompt function
│   ├── styles/
│   │   └── App.css          All styling
│   ├── App.js               Screen controller
│   └── index.js             Entry point
├── .env.example             API key template
├── .gitignore               Keeps .env out of GitHub
├── server.js                Local development server
├── vercel.json              Vercel deployment config
└── package.json             Project configuration
