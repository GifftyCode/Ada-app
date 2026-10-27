import React from "react";
import AdaLogo from "./AdaLogo";

function AboutScreen({ onAgree }) {
  return (
    <main className="about-screen">
      <div className="about-card">
        <div className="about-logo-wrap">
          <AdaLogo size={88} showDot={true} />
        </div>

        <h1 className="about-title">
          Meet <em>AdaNne</em>
        </h1>
        <p className="about-tagline">
          A mother's first daughter - a culturally adapted AI mental health
          companion for Nigerian university students.
        </p>

        <div className="about-divider" />

        <div className="about-points">
          <div className="about-point">
            <span className="about-icon">🤝</span>
            <div>
              <strong>A safe space to talk</strong>
              <p>
                Ada listens without judgment and responds with care, using
                language and cultural understanding built specifically for the
                Nigerian university experience.
              </p>
            </div>
          </div>

          <div className="about-point">
            <span className="about-icon">🔒</span>
            <div>
              <strong>Private by design</strong>
              <p>
                AdaNne does not save your conversation in any database, and it disappears when you close the page. Messages pass securely through our hosting providers to generate replies. Ada does not ask for personal details.
              </p>
            </div>
          </div>

          <div className="about-point">
            <span className="about-icon">⚕️</span>
            <div>
              <strong>Not a replacement for professional care</strong>
              <p>
                Ada is a first-line support companion, not a therapist or
                doctor. She does not diagnose conditions or prescribe treatment.
                If you are in crisis, please call the SURPIN toll-free line on 0800 078 7746, MANI on 0809 111 6264, or 112 in an emergency. Ada cannot contact anyone on your behalf.
              </p>
            </div>
          </div>

          <div className="about-point">
            <span className="about-icon">🎓</span>
            <div>
              <strong>Built for research</strong>
              <p>
                Ada is part of a master's research project at MIVA Open
                University studying culturally adapted AI mental health tools
                for Nigerian students.
              </p>
            </div>
          </div>
        </div>

        <div className="about-divider" />

        <p className="about-consent">
          By continuing, you acknowledge that Ada is an AI companion and not a
          substitute for professional mental health support.
        </p>

        <button className="about-btn" onClick={onAgree}>
          I understand — Talk to Ada
        </button>
      </div>
    </main>
  );
}

export default AboutScreen;
