/**
 * GDPR Consent Management Component
 * Handles cookie consent and privacy compliance for analytics tracking
 * 
 * Features:
 * - GDPR compliant consent collection
 * - Granular consent options
 * - Consent persistence
 * - GTM integration
 * - User-friendly interface
 * 
 * @author Earlybirds Properties Development Team
 * @version 1.0.0
 */

"use client";
import React, { useState, useEffect } from 'react';
import { updateConsent, gtmPush } from '@/utils/gtm';

const ConsentManager = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if consent has already been given
    const savedConsent = localStorage.getItem('cookie_consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const consent = JSON.parse(savedConsent);
      setConsentSettings(consent);
      updateConsent(consent);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    saveConsent(allConsent);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    saveConsent(minimalConsent);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleSavePreferences = () => {
    saveConsent(consentSettings);
    setShowBanner(false);
    setShowDetails(false);
  };

  const saveConsent = (consent) => {
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // Update GTM consent
    updateConsent(consent);
    
    // Track consent decision
    gtmPush({
      'event': 'consent_given',
      'consent_analytics': consent.analytics,
      'consent_marketing': consent.marketing,
      'consent_preferences': consent.preferences
    });
    
    setConsentSettings(consent);
  };

  const handleConsentChange = (type, value) => {
    setConsentSettings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Consent Banner */}
      <div className="consent-banner" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        padding: '20px',
        zIndex: 10000,
        borderTop: '3px solid #007bff'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="mb-2">🍪 We Value Your Privacy</h5>
              <p className="mb-0 text-muted">
                We use cookies and similar technologies to enhance your browsing experience, 
                analyze site traffic, and provide personalized content. By clicking "Accept All", 
                you consent to our use of cookies.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button 
                className="btn btn-outline-secondary me-2"
                onClick={() => setShowDetails(true)}
              >
                Customize
              </button>
              <button 
                className="btn btn-secondary me-2"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Consent Modal */}
      {showDetails && (
        <div className="consent-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Privacy Preferences</h4>
              <button 
                className="btn-close"
                onClick={() => setShowDetails(false)}
                aria-label="Close"
              ></button>
            </div>

            <p className="text-muted mb-4">
              We respect your privacy and give you control over your data. 
              Choose which types of cookies you're comfortable with:
            </p>

            {/* Necessary Cookies */}
            <div className="consent-category mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Necessary Cookies</h6>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={true}
                    disabled
                  />
                  <label className="form-check-label text-success">
                    Always Active
                  </label>
                </div>
              </div>
              <p className="text-muted small mb-0">
                These cookies are essential for the website to function properly. 
                They enable basic features like page navigation and access to secure areas.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="consent-category mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Analytics Cookies</h6>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={consentSettings.analytics}
                    onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                  />
                </div>
              </div>
              <p className="text-muted small mb-0">
                These cookies help us understand how visitors interact with our website 
                by collecting and reporting information anonymously. This helps us improve 
                our services and user experience.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="consent-category mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Marketing Cookies</h6>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={consentSettings.marketing}
                    onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                  />
                </div>
              </div>
              <p className="text-muted small mb-0">
                These cookies are used to deliver personalized advertisements and 
                measure the effectiveness of our marketing campaigns. They help us 
                show you relevant property listings and services.
              </p>
            </div>

            {/* Preference Cookies */}
            <div className="consent-category mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Preference Cookies</h6>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={consentSettings.preferences}
                    onChange={(e) => handleConsentChange('preferences', e.target.checked)}
                  />
                </div>
              </div>
              <p className="text-muted small mb-0">
                These cookies remember your preferences and settings to provide 
                a more personalized experience, such as language preferences and 
                display settings.
              </p>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button 
                className="btn btn-outline-secondary"
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <div>
                <button 
                  className="btn btn-secondary me-2"
                  onClick={() => setShowDetails(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSavePreferences}
                >
                  Save Preferences
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                You can change your preferences at any time by clicking the 
                "Cookie Settings" link in our footer. For more information, 
                please read our{' '}
                <a href="/privacy-policy" className="text-primary">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cookie Settings Button (for users who want to change settings later) */}
      {!showBanner && (
        <button
          className="cookie-settings-btn"
          onClick={() => setShowBanner(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 15px',
            fontSize: '12px',
            zIndex: 1000,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
          title="Cookie Settings"
        >
          🍪 Cookie Settings
        </button>
      )}
    </>
  );
};

export default ConsentManager;

// Hook for checking consent status
export const useConsent = () => {
  const [consent, setConsent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
    setLoading(false);
  }, []);

  const hasAnalyticsConsent = () => {
    return consent?.analytics === true;
  };

  const hasMarketingConsent = () => {
    return consent?.marketing === true;
  };

  const hasPreferencesConsent = () => {
    return consent?.preferences === true;
  };

  return {
    consent,
    loading,
    hasAnalyticsConsent,
    hasMarketingConsent,
    hasPreferencesConsent
  };
};