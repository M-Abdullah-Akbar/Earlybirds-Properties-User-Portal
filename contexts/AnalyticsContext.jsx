"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { analyticsService } from '@/utils/analytics';

// Create Analytics Context
const AnalyticsContext = createContext(null);

// Analytics Provider Component
export const AnalyticsProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize analytics
    analyticsService.init();
    setIsInitialized(true);

    // Get current user if available
    const currentUser = analyticsService.getUser();
    setUser(currentUser);
  }, []);

  // Enhanced analytics methods with context
  const contextualAnalytics = {
    ...analyticsService,
    
    // Track with automatic context enrichment
    trackWithContext: (eventName, properties = {}) => {
      const enrichedProperties = {
        ...properties,
        userId: user?.userId || null,
        sessionId: user?.sessionId || null,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        screenResolution: typeof window !== 'undefined' ? 
          `${window.screen.width}x${window.screen.height}` : null,
        viewportSize: typeof window !== 'undefined' ? 
          `${window.innerWidth}x${window.innerHeight}` : null
      };
      
      analyticsService.track(eventName, enrichedProperties);
    },

    // Track page with enhanced context
    trackPageWithContext: (pageName, properties = {}) => {
      const enrichedProperties = {
        ...properties,
        userId: user?.userId || null,
        sessionId: user?.sessionId || null,
        loadTime: typeof window !== 'undefined' && window.performance ? 
          window.performance.now() : null,
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        title: typeof document !== 'undefined' ? document.title : null
      };
      
      analyticsService.page(pageName, enrichedProperties);
    },

    // Update user context
    updateUser: (userId, traits = {}) => {
      analyticsService.identify(userId, traits);
      const updatedUser = analyticsService.getUser();
      setUser(updatedUser);
    },

    // Clear user context
    clearUser: () => {
      analyticsService.reset();
      setUser(null);
    },

    // Get initialization status
    isReady: () => isInitialized,
    
    // Get current user
    getCurrentUser: () => user
  };

  return (
    <AnalyticsContext.Provider value={contextualAnalytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook to use analytics
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  
  return context;
};

// HOC for components that need analytics
export const withAnalytics = (WrappedComponent) => {
  return function WithAnalyticsComponent(props) {
    const analytics = useAnalytics();
    
    return <WrappedComponent {...props} analytics={analytics} />;
  };
};

// Hook for tracking component lifecycle
export const useComponentTracking = (componentName, trackMount = true, trackUnmount = false) => {
  const analytics = useAnalytics();
  
  useEffect(() => {
    if (trackMount && analytics.isReady()) {
      analytics.trackWithContext('Component Mounted', {
        componentName,
        mountTime: new Date().toISOString()
      });
    }
    
    return () => {
      if (trackUnmount && analytics.isReady()) {
        analytics.trackWithContext('Component Unmounted', {
          componentName,
          unmountTime: new Date().toISOString()
        });
      }
    };
  }, [componentName, trackMount, trackUnmount, analytics]);
};

// Hook for tracking user interactions
export const useInteractionTracking = () => {
  const analytics = useAnalytics();
  
  const trackClick = (elementName, context = {}) => {
    analytics.trackWithContext('Element Clicked', {
      elementName,
      interactionType: 'click',
      ...context
    });
  };
  
  const trackHover = (elementName, context = {}) => {
    analytics.trackWithContext('Element Hovered', {
      elementName,
      interactionType: 'hover',
      ...context
    });
  };
  
  const trackFormSubmit = (formName, formData = {}, context = {}) => {
    analytics.trackWithContext('Form Submitted', {
      formName,
      formData,
      interactionType: 'form_submit',
      ...context
    });
  };
  
  const trackSearch = (query, filters = {}, resultsCount = 0) => {
    analytics.trackSearch(query, filters, resultsCount);
  };
  
  return {
    trackClick,
    trackHover,
    trackFormSubmit,
    trackSearch
  };
};

export default AnalyticsContext;