# Ada — AI Mental Health Support Chatbot
### A culturally adapted mental health companion for Nigerian university students

---

## What is Ada?
Ada is a warm, culturally aware AI chatbot that provides first-line mental health support
for Nigerian university students. She understands Nigerian Pidgin, cultural pressure,
stigma, and the specific stressors that Nigerian students face.

---

## HOW TO SET UP AND RUN ADA ON YOUR COMPUTER

Follow these steps exactly, one at a time.

---

### STEP 1 — Make sure Node.js is installed
You said you already have Node.js. To confirm, open a terminal and type:
  node --version
You should see a version number like v18.x.x or higher. If not, download it from nodejs.org.

---

### STEP 2 — Open this project in VS Code
1. Unzip the ada-app folder (if it came as a zip)
2. Open VS Code
3. Go to File → Open Folder → select the ada-app folder

---

### STEP 3 — Install the project dependencies
In VS Code, open the Terminal (View → Terminal) and type:
  npm install

This downloads React and all the packages Ada needs. It may take 1–2 minutes.
You will see a node_modules folder appear when it is done.

---

### STEP 4 — Add your Anthropic API key
1. In the ada-app folder, find the file called .env.example
2. Make a copy of it and rename the copy to exactly:  .env
   (just .env — no .example, no .txt)
3. Open the .env file
4. Replace the text  your_api_key_here  with your actual Anthropic API key

To get your API key:
  - Go to https://console.anthropic.com
  - Sign up or log in
  - Click "API Keys" in the left menu
  - Click "Create Key"
  - Copy the key and paste it into your .env file

Your .env file should look like this when done:
  REACT_APP_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx

IMPORTANT: Never share your .env file or commit it to GitHub.
The .env file is private — it stays on your computer only.

---

### STEP 5 — Start Ada
In the VS Code terminal, type:
  npm start

After about 30 seconds, your browser will automatically open at:
  http://localhost:3000

Ada will be running. Select a mood and start talking to her.

---

### STEP 6 — Deploy Ada online (so your survey users can access her)
When you are ready to share Ada with Nigerian students for your user testing:

1. Go to https://vercel.com and sign up with your GitHub account
2. Push your ada-app folder to a GitHub repository
3. In Vercel, click "Add New Project" and select your repository
4. In the Environment Variables section, add:
   Name:  REACT_APP_ANTHROPIC_API_KEY
   Value: (your API key)
5. Click Deploy

Vercel will give you a free public URL like:
  https://ada-mental-health.vercel.app

Share that link with your survey participants.

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
