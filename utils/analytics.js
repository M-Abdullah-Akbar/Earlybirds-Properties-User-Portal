import Analytics from 'analytics';

// Analytics configuration - using native gtag.js instead of plugin
const analyticsConfig = {
  app: 'earlybirds-properties-user-portal',
  version: '1.0.0',
  debug: process.env.NODE_ENV === 'development',
  plugins: [
    // Using native gtag.js implementation instead of plugin
  ]
};

// Initialize analytics instance
const analytics = Analytics(analyticsConfig);

// Google Analytics Tracking ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Helper function to use gtag directly
const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Analytics service with utility methods
export const analyticsService = {
  // Initialize analytics (called once in app startup)
  init: () => {
    if (typeof window !== 'undefined') {
      console.log('Analytics initialized for Earlybirds Properties');
      // Send initial page view to gtag
      gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  },

  // Track page views
  page: (pageName, properties = {}) => {
    try {
      analytics.page(pageName, {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        path: typeof window !== 'undefined' ? window.location.pathname : ''
      });
      
      // Also send to gtag directly
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        ...properties
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Page tracked:', pageName, properties);
      }
    } catch (error) {
      console.error('Analytics page tracking error:', error);
    }
  },

  // Track custom events
  track: (eventName, properties = {}) => {
    try {
      analytics.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        path: typeof window !== 'undefined' ? window.location.pathname : ''
      });
      
      // Also send to gtag directly
      gtag('event', eventName, properties);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Event tracked:', eventName, properties);
      }
    } catch (error) {
      console.error('Analytics event tracking error:', error);
    }
  },

  // Identify users
  identify: (userId, traits = {}) => {
    try {
      analytics.identify(userId, {
        ...traits,
        timestamp: new Date().toISOString()
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('User identified:', userId, traits);
      }
    } catch (error) {
      console.error('Analytics user identification error:', error);
    }
  },

  // Track property-specific events
  trackPropertyView: (propertyId, propertyData = {}) => {
    analyticsService.track('Property Viewed', {
      propertyId,
      propertyType: propertyData.type,
      propertyPrice: propertyData.price,
      propertyLocation: propertyData.location,
      listingType: propertyData.listingType,
      ...propertyData
    });
  },

  // Track search events
  trackSearch: (searchQuery, filters = {}, resultsCount = 0) => {
    analyticsService.track('Property Search', {
      query: searchQuery,
      filters,
      resultsCount,
      searchType: 'property_search'
    });
  },

  // Track contact form submissions
  trackContactForm: (formType, propertyId = null, formData = {}) => {
    analyticsService.track('Contact Form Submitted', {
      formType,
      propertyId,
      ...formData
    });
  },

  // Track button clicks
  trackButtonClick: (buttonName, context = {}) => {
    analyticsService.track('Button Clicked', {
      buttonName,
      context,
      clickType: 'button_click'
    });
  },

  // Track general clicks (for navigation links, etc.)
  trackClick: (properties = {}) => {
    analyticsService.track('Click', {
      ...properties,
      clickType: 'general_click'
    });
  },

  // Track navigation events
  trackNavigation: (from, to, method = 'click') => {
    analyticsService.track('Navigation', {
      from,
      to,
      method,
      navigationType: 'internal_navigation'
    });
  },

  // Track filter usage
  trackFilterUsage: (filterType, filterValue, context = {}) => {
    analyticsService.track('Filter Used', {
      filterType,
      filterValue,
      context,
      interactionType: 'filter_interaction'
    });
  },

  // Track user engagement
  trackEngagement: (engagementType, duration = null, context = {}) => {
    analyticsService.track('User Engagement', {
      engagementType,
      duration,
      context,
      timestamp: new Date().toISOString()
    });
  },

  // Get current user data
  getUser: () => {
    try {
      return analytics.user();
    } catch (error) {
      console.error('Analytics get user error:', error);
      return null;
    }
  },

  // Reset analytics (for logout)
  reset: () => {
    try {
      analytics.reset();
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics reset');
      }
    } catch (error) {
      console.error('Analytics reset error:', error);
    }
  }
};

// Export the analytics instance for advanced usage
export { analytics };

// Export default
export default analyticsService;