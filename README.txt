# Ada — AI Mental Health Support Chatbot
### A culturally adapted mental health companion for Nigerian university students

---

## What is Ada?
Ada is a warm, culturally aware AI chatbot that provides first-line mental health support
for Nigerian university students. She understands Nigerian Pidgin, cultural pressure,
stigma, and the specific stressors that Nigerian students face.

---

## HOW TO SET UP AND RUN ADA ON YOUR COMPUTER

Ada now has two parts running at the same time:
  - The BACKEND SERVER (server.js) — talks to the Anthropic API safely
  - The REACT APP (npm start)     — the chat interface your users see

You need TWO terminal windows open. Follow every step carefully.

---

### STEP 1 — Confirm Node.js is installed
Open a terminal and type:
  node --version

You should see something like v18.x.x or higher.
If not, download Node.js from: https://nodejs.org

---

### STEP 2 — Open the project in VS Code
1. Unzip the ada-app folder
2. Open VS Code
3. File → Open Folder → select the ada-app folder

---

### STEP 3 — Install all dependencies
In the VS Code terminal, type:
  npm install

This installs React AND the backend packages (express, cors, dotenv).
Wait for it to finish — a node_modules folder will appear.

---

### STEP 4 — Add your Anthropic API key
1. Find the file called  .env.example  in the ada-app folder
2. Make a copy of it and rename the copy to exactly:  .env
   (just .env with nothing else — no .example, no .txt after it)
3. Open the .env file in VS Code
4. Replace  your_api_key_here  with your actual Anthropic API key

Your .env file should look exactly like this when done:
  ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx

To get your API key:
  → Go to https://console.anthropic.com
  → Sign in → API Keys → Create Key → Copy it

IMPORTANT: Never share your .env file with anyone.

---

### STEP 5 — Start the backend server (Terminal 1)
In the VS Code terminal, type:
  node server.js

You should see:
   Ada server running at http://localhost:3001
   Health check: http://localhost:3001/health

Leave this terminal running. Do NOT close it.

---

### STEP 6 — Start the React app (Terminal 2)
Open a SECOND terminal in VS Code:
  → Click the + icon at the top right of the terminal panel

In the new terminal, type:
  npm start

Your browser will open automatically at:
  http://localhost:3000

Select a mood and talk to Ada. She will respond through the server.

---

### WHAT TO DO IF ADA STILL CANNOT CONNECT
1. Make sure BOTH terminals are running (server.js AND npm start)
2. Check your .env file — the key must say ANTHROPIC_API_KEY= (not REACT_APP_)
3. Visit http://localhost:3001/health in your browser — it should say "Ada server is running"
4. If it does not, your server is not started — go back to Step 5

---

### STEP 7 — Deploy Ada online for your user testing
When you are ready to share Ada with Nigerian students:
We will handle deployment to Vercel together at that stage of the project.
The deployment process for a backend + frontend app is slightly different
and we will walk through it step by step when the time comes.

---

## PROJECT FILE STRUCTURE

ada-app/
├── public/
│   └── index.html              The HTML shell
├── src/
│   ├── components/
│   │   ├── Header.js           Top navigation bar
│   │   ├── CrisisBar.js        Emergency resources banner
│   │   ├── MoodCheck.js        Opening mood selection screen
│   │   ├── ChatWindow.js       Main conversation interface
│   │   ├── MessageBubble.js    Individual chat messages
│   │   └── TypingIndicator.js  Animated dots while Ada thinks
│   ├── utils/
│   │   └── adaPrompt.js        Ada's cultural system prompt (her personality + rules)
│   ├── styles/
│   │   └── App.css             All styling
│   ├── App.js                  Main application logic
│   └── index.js                Entry point
├── .env.example                Template for your API key
├── .env                        YOUR API KEY GOES HERE (create this yourself)
└── package.json                Project configuration

---

## WHAT TO DO IF SOMETHING GOES WRONG

Problem: npm install gives errors
Solution: Make sure you are inside the ada-app folder in the terminal. Type:
  cd ada-app
  npm install

Problem: Ada says "API key not configured"
Solution: Make sure your .env file exists (not .env.example) and your key is correct.

Problem: Ada gives a connection error
Solution: Check your internet connection. The API call requires internet access.

Problem: Browser does not open automatically
Solution: Manually open your browser and go to http://localhost:3000

---

## QUESTIONS?
Bring any issues back to your Claude session and we will fix them together.