// Page-specific tracking utilities
// Automatically track page-specific events and user interactions

import { trackPageView, trackCustomEvent } from './analytics';

// Page tracking hook for Next.js pages
export const usePageTracking = (pageName, pageData = {}) => {
  if (typeof window !== 'undefined') {
    // Track page view with enhanced data
    trackPageView(window.location.pathname, {
      page_name: pageName,
      ...pageData
    });

    // Track page engagement time
    const startTime = Date.now();
    
    const trackEngagementTime = () => {
      const engagementTime = Math.round((Date.now() - startTime) / 1000);
      trackCustomEvent('page_engagement', {
        engagement_time_seconds: engagementTime,
        page_name: pageName
      });
    };

    // Track engagement on page unload
    window.addEventListener('beforeunload', trackEngagementTime);
    
    return () => {
      window.removeEventListener('beforeunload', trackEngagementTime);
    };
  }
};

// Track scroll depth
export const trackScrollDepth = (pageName) => {
  if (typeof window === 'undefined') return;

  let maxScrollDepth = 0;
  const scrollDepthThresholds = [25, 50, 75, 90, 100];
  const trackedThresholds = new Set();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

    if (scrollPercentage > maxScrollDepth) {
      maxScrollDepth = scrollPercentage;
    }

    // Track milestone scroll depths
    scrollDepthThresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);
        trackCustomEvent('scroll_depth', {
          scroll_depth: threshold,
          page_name: pageName
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Track time on page segments
export const trackTimeOnPage = (pageName) => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const timeThresholds = [30, 60, 120, 300]; // seconds
  const trackedTimes = new Set();

  const checkTimeThresholds = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    timeThresholds.forEach(threshold => {
      if (timeOnPage >= threshold && !trackedTimes.has(threshold)) {
        trackedTimes.add(threshold);
        trackCustomEvent('time_on_page', {
          time_threshold: threshold,
          page_name: pageName
        });
      }
    });
  };

  const interval = setInterval(checkTimeThresholds, 10000); // Check every 10 seconds
  
  return () => {
    clearInterval(interval);
  };
};

// Track page exit intent
export const trackExitIntent = (pageName) => {
  if (typeof window === 'undefined') return;

  let exitIntentTracked = false;

  const handleMouseLeave = (e) => {
    if (e.clientY <= 0 && !exitIntentTracked) {
      exitIntentTracked = true;
      trackCustomEvent('exit_intent', {
        page_name: pageName,
        time_before_exit: Math.round((Date.now() - Date.now()) / 1000)
      });
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    document.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Comprehensive page tracking setup
export const setupPageTracking = (pageName, options = {}) => {
  const cleanupFunctions = [];

  // Basic page tracking
  const pageCleanup = usePageTracking(pageName, options.pageData);
  if (pageCleanup) cleanupFunctions.push(pageCleanup);

  // Optional advanced tracking
  if (options.trackScrollDepth !== false) {
    const scrollCleanup = trackScrollDepth(pageName);
    if (scrollCleanup) cleanupFunctions.push(scrollCleanup);
  }

  if (options.trackTimeOnPage !== false) {
    const timeCleanup = trackTimeOnPage(pageName);
    if (timeCleanup) cleanupFunctions.push(timeCleanup);
  }

  if (options.trackExitIntent) {
    const exitCleanup = trackExitIntent(pageName);
    if (exitCleanup) cleanupFunctions.push(exitCleanup);
  }

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup && cleanup());
  };
};