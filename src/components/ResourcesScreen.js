import React from 'react';

const resources = [
  {
    category: 'Crisis Support', colour: 'red',
    items: [
      { name: 'Nigeria Suicide Prevention Initiative (NSPI)', detail: 'Free, confidential crisis line available 24/7', contact: '09080217555', type: 'phone' },
      { name: 'Mentally Aware Nigeria Initiative (MANI)', detail: 'Mental health support, resources, and community', contact: 'www.mani.ng', type: 'web' }
    ]
  },
  {
    category: 'Professional Support', colour: 'green',
    items: [
      { name: 'Federal Neuropsychiatric Hospital, Yaba', detail: 'Lagos — outpatient and specialist mental health care', contact: '01-7731422', type: 'phone' },
      { name: 'Asido Foundation', detail: 'Mental health awareness and free counselling referrals', contact: 'asidofoundation.org', type: 'web' },
      { name: 'She Writes Woman', detail: 'Mental health helpline — open to all genders', contact: '0800 800 8000', type: 'phone' }
    ]
  },
  {
    category: 'Self-Help & Community', colour: 'blue',
    items: [
      { name: 'Headspace', detail: 'Guided meditation and mindfulness — free student plan available', contact: 'headspace.com', type: 'web' },
      { name: 'Your University Counselling Unit', detail: 'Most Nigerian universities have a student affairs or counselling office — seek them out on your campus', contact: null, type: 'info' }
    ]
  }
];

function ResourcesScreen({ onBack }) {
  return (
    <main className="resources-screen">
      <div className="resources-intro">
        <p className="resources-intro-text">
          You are not alone. These organisations exist to support you — reaching out is a sign of strength, not weakness.
        </p>
      </div>
      <div className="resources-list">
        {resources.map((section) => (
          <div key={section.category} className="resources-section">
            <h2 className={`resources-section-title resources-section-title--${section.colour}`}>
              {section.category}
            </h2>
            {section.items.map((item) => (
              <div key={item.name} className="resource-card">
                <div className="resource-card-body">
                  <p className="resource-name">{item.name}</p>
                  <p className="resource-detail">{item.detail}</p>
                </div>
                {item.contact && (
                  <div className="resource-contact">
                    {item.type === 'phone' && (
                      <a href={`tel:${item.contact.replace(/\s/g, '')}`} className="resource-btn resource-btn--phone">
                        📞 {item.contact}
                      </a>
                    )}
                    {item.type === 'web' && (
                      <a href={`https://${item.contact}`} target="_blank" rel="noopener noreferrer" className="resource-btn resource-btn--web">
                        🌐 {item.contact}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="resources-footer">
        <p>Remember — Ada is always here for a conversation whenever you need it.</p>
        <button className="resources-back-btn" onClick={onBack}>Back to Ada</button>
      </div>
    </main>
  );
}

export default ResourcesScreen;
