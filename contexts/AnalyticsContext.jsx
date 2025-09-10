/**
 * Enhanced Analytics Context Provider
 * Provides comprehensive analytics functionality with GTM integration
 * 
 * Features:
 * - Centralized analytics management
 * - GTM and GA4 integration
 * - Context-aware tracking
 * - User session tracking
 * - Enhanced ecommerce tracking
 * - Performance monitoring
 * - Error tracking
 * - GDPR consent management
 * 
 * @author Earlybirds Properties Development Team
 * @version 2.0.0
 */

"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { analyticsService, trackClick } from '@/utils/analytics';
import { 
  gtmPush, 
  trackEvent, 
  trackPageView, 
  trackPropertyView,
  trackPropertyFavorite,
  trackError, 
  trackPerformance,
  setCustomDimensions,
  initGTM
} from '@/utils/gtm';
import { useConsent } from '@/components/analytics/ConsentManager';
import { customDimensions, setUserRole, setUserType, setUserSegment, getUserContext, getTechnicalContext } from '@/utils/customDimensions';

const AnalyticsContext = createContext({});

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionData, setSessionData] = useState({
    sessionId: null,
    startTime: null,
    pageViews: 0,
    events: 0
  });
  
  const { hasAnalyticsConsent } = useConsent();

  useEffect(() => {
    // Initialize analytics services
    analyticsService.init();
    initGTM();
    
    // Initialize custom dimensions
    if (typeof window !== 'undefined') {
      customDimensions.initializeBasicDimensions();
    }
    
    // Initialize session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionData({
      sessionId,
      startTime: new Date(),
      pageViews: 0,
      events: 0
    });
    
    setIsInitialized(true);

    // Track performance metrics on page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => trackPerformance(), 1000);
      });
    }
  }, []);

  // Update custom dimensions when user changes
  useEffect(() => {
    if (user && hasAnalyticsConsent) {
      setUserRole(user.role);
      setUserType(user.type || 'guest');
      setUserSegment(user.segment || 'standard');
      setCustomDimensions({
        'user_role': user.role,
        'user_type': user.type || 'guest',
        'user_segment': user.segment || 'standard'
      });
    }
  }, [user, hasAnalyticsConsent]);

  const trackWithContext = (eventName, properties = {}) => {
    if (!isInitialized || !hasAnalyticsConsent) return;
    
    const contextualProperties = {
      ...properties,
      user_id: user?.id,
      user_role: user?.role,
      session_id: sessionData.sessionId,
      timestamp: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      page_title: typeof document !== 'undefined' ? document.title : ''
    };

    // Track with GTM
    trackEvent(eventName, contextualProperties);
    
    // Update session data
    setSessionData(prev => ({
      ...prev,
      events: prev.events + 1
    }));
  };

  const trackPageWithContext = (pageName, properties = {}) => {
    if (!isInitialized || !hasAnalyticsConsent) return;
    
    const pageProperties = {
      ...properties,
      user_id: user?.id,
      user_role: user?.role,
      session_id: sessionData.sessionId,
      timestamp: new Date().toISOString()
    };

    // Track with both services
    analyticsService.page(pageName, pageProperties);
    trackPageView(pageName, pageProperties);
    
    // Don't update session data here to prevent infinite loops
    // setSessionData(prev => ({
    //   ...prev,
    //   pageViews: prev.pageViews + 1
    // }));
  };

  const trackEcommerceEvent = (action, ecommerceData) => {
    if (!isInitialized || !hasAnalyticsConsent) return;
    
    const enhancedData = {
      ...ecommerceData,
      user_id: user?.id,
      session_id: sessionData.sessionId
    };
    
    // Use specific property tracking functions based on action
    if (action === 'view_item' && ecommerceData.property) {
      trackPropertyView(ecommerceData.property);
    } else if ((action === 'add_to_wishlist' || action === 'remove_from_wishlist') && ecommerceData.property) {
      const favoriteAction = action === 'add_to_wishlist' ? 'add' : 'remove';
      trackPropertyFavorite(ecommerceData.property, favoriteAction);
    } else {
      // Fallback to generic event tracking
      trackEvent(action, enhancedData);
    }
  };

  const trackErrorEvent = (error, context = {}) => {
    if (!isInitialized) return; // Error tracking doesn't require consent
    
    const errorData = {
      ...context,
      user_id: user?.id,
      session_id: sessionData.sessionId,
      page_url: typeof window !== 'undefined' ? window.location.href : ''
    };
    
    trackError(error, errorData);
  };

  const trackUserInteraction = (element, action, properties = {}) => {
    trackWithContext('user_interaction', {
      element_type: element,
      interaction_type: action,
      ...properties
    });
  };

  const trackFormSubmission = (formName, success = true, properties = {}) => {
    trackWithContext('form_submission', {
      form_name: formName,
      success,
      ...properties
    });
  };

  const trackNavigation = (from, to, method = 'click') => {
    trackWithContext('navigation', {
      from_page: from,
      to_page: to,
      navigation_method: method
    });
  };

  const trackScrollDepth = (depth) => {
    trackWithContext('scroll_depth', {
      depth_percentage: depth,
      page_url: typeof window !== 'undefined' ? window.location.href : ''
    });
  };

  const getSessionDuration = () => {
    if (!sessionData.startTime) return 0;
    return Math.floor((new Date() - sessionData.startTime) / 1000);
  };

  const value = {
    isInitialized,
    user,
    setUser,
    sessionData,
    trackWithContext,
    trackPageWithContext,
    trackEcommerceEvent,
    trackErrorEvent,
    trackUserInteraction,
    trackFormSubmission,
    trackNavigation,
    trackScrollDepth,
    trackClick,
    getSessionDuration,
    hasAnalyticsConsent
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};