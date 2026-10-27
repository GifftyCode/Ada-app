═══════════════════════════════════════════════════════════
  AdaNne — Culturally adapted AI mental health support
  for Nigerian university students
  Miva Open University · MIT Research Project 2026
  Paper: NSIC 2026 (NSIC26P026)
═══════════════════════════════════════════════════════════

WHAT IT IS
AdaNne is a NON-CLINICAL, first-line support chatbot. It does not
diagnose, treat, provide therapy or act as an emergency service,
and it cannot contact anyone on a student's behalf.

ARCHITECTURE
  React 18 front end (Vercel)  ->  /api/chat (Node.js serverless, Vercel)
  ->  Gradio app on Hugging Face Space (gifftybabe-adanne-api)
      running Llama 3.2 3B + AdaNne LoRA adapter.

SAFETY AND PRIVACY DESIGN
  - Crisis banner on every screen; cannot be dismissed
    (SURPIN toll-free 0800 078 7746, emergency 112, mani.ng).
    NOTE: 0908 021 7555, shown during the study, was found NOT IN SERVICE
    in October 2026 and has been replaced.
  - Instant crisis card: src/utils/crisisDetect.js checks each message
    in the browser BEFORE the model is called and shows crisis contacts
    immediately, even if the model is slow or down.
  - System prompt (src/utils/adaPrompt.js) also instructs the model to
    escalate, urge 112/hospital for imminent danger, never give methods,
    and avoid pressuring phrases or ethnic generalisations.
  - The model receives the latest student message plus up to three
    earlier student messages (api/_lib/buildInput.js).
  - No database, no analytics; message and reply text are NOT logged.
    Hosting providers (Vercel, Hugging Face) may keep their own
    request logs under their policies.
  - All crisis contacts live in src/config/crisisResources.js.
    Verify every number by phone before each release.

VERSION HISTORY
  6c035ad (28 Aug 2026)  Version used in the user study
                         (confirm against your deployment history).
  nsic-safety-fixes      Post-study safety and privacy changes listed
                         above. These were NOT part of the evaluated
                         version and have not been user-tested.

RUN LOCALLY
  npm install
  node server.js        (backend, http://localhost:3001)
  npm start             (front end, http://localhost:3000)
  npm test              (runs the crisis-detector tests)

DEPLOY
  Push to the GitHub repository connected to Vercel; Vercel rebuilds
  automatically.
