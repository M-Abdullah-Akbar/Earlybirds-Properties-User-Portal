"use client";
import { useEffect } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import analyticsService from '@/utils/analytics';

// Generate a unique visitor ID
const generateVisitorId = () => {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Get or create visitor ID from localStorage
const getVisitorId = () => {
  if (typeof window === 'undefined') return null;
  
  let visitorId = localStorage.getItem('earlybirds_visitor_id');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('earlybirds_visitor_id', visitorId);
    localStorage.setItem('earlybirds_first_visit', new Date().toISOString());
  }
  return visitorId;
};

// Get session ID (expires after 30 minutes of inactivity)
const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  
  let sessionData = localStorage.getItem('earlybirds_session');
  if (sessionData) {
    try {
      const parsed = JSON.parse(sessionData);
      if (now - parsed.lastActivity < sessionTimeout) {
        // Update last activity
        parsed.lastActivity = now;
        localStorage.setItem('earlybirds_session', JSON.stringify(parsed));
        return parsed.sessionId;
      }
    } catch (error) {
      console.error('Error parsing session data:', error);
    }
  }
  
  // Create new session
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const newSession = {
    sessionId,
    startTime: now,
    lastActivity: now
  };
  localStorage.setItem('earlybirds_session', JSON.stringify(newSession));
  return sessionId;
};

// Get user device and browser information
const getUserAgent = () => {
  if (typeof window === 'undefined') return {};
  
  const ua = navigator.userAgent;
  const screen = window.screen;
  
  return {
    userAgent: ua,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled
  };
};

// Get referrer information
const getReferrerInfo = () => {
  if (typeof window === 'undefined') return {};
  
  const referrer = document.referrer;
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    referrer: referrer || 'direct',
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmTerm: urlParams.get('utm_term'),
    utmContent: urlParams.get('utm_content')
  };
};

export default function UserTracker() {
  const { trackWithContext } = useAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const userAgent = getUserAgent();
    const referrerInfo = getReferrerInfo();
    const firstVisit = localStorage.getItem('earlybirds_first_visit');
    const isReturningVisitor = localStorage.getItem('earlybirds_returning_visitor') === 'true';

    // Identify the visitor
    analyticsService.identify(visitorId, {
      sessionId,
      isReturningVisitor,
      firstVisit,
      ...userAgent,
      ...referrerInfo,
      visitCount: parseInt(localStorage.getItem('earlybirds_visit_count') || '1'),
      lastVisit: localStorage.getItem('earlybirds_last_visit')
    });

    // Update visit tracking
    const visitCount = parseInt(localStorage.getItem('earlybirds_visit_count') || '0') + 1;
    localStorage.setItem('earlybirds_visit_count', visitCount.toString());
    localStorage.setItem('earlybirds_last_visit', new Date().toISOString());
    localStorage.setItem('earlybirds_returning_visitor', 'true');

    // Track session start
    trackWithContext('session_start', {
      visitorId,
      sessionId,
      visitCount,
      isReturningVisitor
    });

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackWithContext('page_hidden', { visitorId, sessionId });
      } else {
        trackWithContext('page_visible', { visitorId, sessionId });
      }
    };

    // Track user activity (scroll, click, keypress)
    let lastActivity = Date.now();
    const updateActivity = () => {
      const now = Date.now();
      if (now - lastActivity > 30000) { // 30 seconds threshold
        trackWithContext('user_active', { visitorId, sessionId });
        lastActivity = now;
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Date.now() - startTime;
      trackWithContext('time_on_page', {
        timeSpent: Math.round(timeSpent / 1000),
        visitorId,
        sessionId,
        page: window.location.pathname
      });
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('scroll', updateActivity, { passive: true });
    document.addEventListener('click', updateActivity);
    document.addEventListener('keypress', updateActivity);
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Track session duration periodically
    const sessionTracker = setInterval(() => {
      const sessionData = localStorage.getItem('earlybirds_session');
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          const sessionDuration = Date.now() - parsed.startTime;
          trackWithContext('session_duration', {
            duration: Math.round(sessionDuration / 1000),
            visitorId,
            sessionId
          });
        } catch (error) {
          console.error('Error tracking session duration:', error);
        }
      }
    }, 60000); // Track every minute

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('scroll', updateActivity);
      document.removeEventListener('click', updateActivity);
      document.removeEventListener('keypress', updateActivity);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      clearInterval(sessionTracker);
      
      // Track session end
      trackTimeOnPage();
      trackWithContext('session_end', { visitorId, sessionId });
    };
  }, []);

  // This component doesn't render anything
  return null;
}

// Export utility functions for use in other components
export { getVisitorId, getSessionId, getUserAgent, getReferrerInfo };