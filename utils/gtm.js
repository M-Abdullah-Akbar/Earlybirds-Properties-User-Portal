/**
 * Google Tag Manager (GTM) Utility Functions
 * Comprehensive tracking implementation for Earlybirds Properties User Portal
 * 
 * Features:
 * - Enhanced ecommerce tracking
 * - Custom event tracking
 * - Performance monitoring
 * - Error tracking
 * - GDPR compliance
 * - Cross-domain tracking
 * - Custom dimensions
 * 
 * @author Earlybirds Properties Development Team
 * @version 1.0.0
 */

// Configuration
export const GTM_CONFIG = {
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
  GA_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-S4QBVTS4KN',
  GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXX',
  DEBUG: process.env.NODE_ENV === 'development',
  CONSENT_MODE: true,
  CROSS_DOMAIN_TRACKING: ['earlybirdsProperties.com', 'properties.ae']
};

// Initialize dataLayer if not exists
export const initDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    // Set default consent state for GDPR compliance
    if (GTM_CONFIG.CONSENT_MODE) {
      window.dataLayer.push({
        'event': 'default_consent',
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
      });
    }
  }
};

// Core GTM push function with error handling
export const gtmPush = (data) => {
  try {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Add timestamp and session info to all events
      const enrichedData = {
        ...data,
        timestamp: new Date().toISOString(),
        session_id: getSessionId(),
        user_id: getUserId(),
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title
      };
      
      window.dataLayer.push(enrichedData);
      
      if (GTM_CONFIG.DEBUG) {
        console.log('GTM Push:', enrichedData);
      }
    }
  } catch (error) {
    console.error('GTM Push Error:', error);
    trackError('gtm_push_error', error.message);
  }
};

// Session and User Management
export const getSessionId = () => {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('gtm_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('gtm_session_id', sessionId);
    }
    return sessionId;
  }
  return null;
};

export const getUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('gtm_user_id') || null;
  }
  return null;
};

export const setUserId = (userId) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gtm_user_id', userId);
    gtmPush({
      'event': 'user_id_set',
      'user_id': userId
    });
  }
};

// Page View Tracking with Enhanced Data
export const trackPageView = (pagePath, pageTitle, additionalData = {}) => {
  const pageData = {
    'event': 'page_view',
    'page_path': pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    'page_title': pageTitle || (typeof window !== 'undefined' ? document.title : ''),
    'page_location': typeof window !== 'undefined' ? window.location.href : '',
    'page_referrer': typeof window !== 'undefined' ? document.referrer : '',
    'content_group1': getContentGroup1(pagePath),
    'content_group2': getContentGroup2(pagePath),
    'content_group3': getContentGroup3(pagePath),
    ...additionalData
  };
  
  gtmPush(pageData);
};

// Content Group Classification
const getContentGroup1 = (path) => {
  if (!path) return 'Unknown';
  if (path.includes('/properties') || path.includes('/property-detail')) return 'Properties';
  if (path.includes('/buy') || path.includes('/sell') || path.includes('/rent')) return 'Transactions';
  if (path.includes('/about') || path.includes('/contact')) return 'Information';
  if (path.includes('/services')) return 'Services';
  return 'General';
};

const getContentGroup2 = (path) => {
  if (!path) return 'Unknown';
  if (path.includes('/property-detail/')) return 'Property Detail';
  if (path.includes('/properties')) return 'Property Listing';
  if (path.includes('/buy')) return 'Buy Properties';
  if (path.includes('/sell')) return 'Sell Properties';
  if (path.includes('/rent')) return 'Rent Properties';
  return 'Other';
};

const getContentGroup3 = (path) => {
  if (!path) return 'Unknown';
  const segments = path.split('/').filter(Boolean);
  return segments.length > 1 ? segments[1] : 'root';
};

// Enhanced Ecommerce Tracking
export const trackPropertyView = (property) => {
  gtmPush({
    'event': 'view_item',
    'ecommerce': {
      'currency': 'AED',
      'value': parseFloat(property.price) || 0,
      'items': [{
        'item_id': property.id,
        'item_name': property.title || property.name,
        'item_category': property.type || 'Property',
        'item_category2': property.category || 'Unknown',
        'item_category3': property.location || 'Unknown',
        'item_category4': property.developer || 'Unknown',
        'item_brand': 'Earlybirds Properties',
        'price': parseFloat(property.price) || 0,
        'quantity': 1,
        'item_variant': property.bedrooms ? `${property.bedrooms}BR` : 'Unknown'
      }]
    },
    'property_data': {
      'property_id': property.id,
      'property_type': property.type,
      'property_price': property.price,
      'property_location': property.location,
      'property_bedrooms': property.bedrooms,
      'property_bathrooms': property.bathrooms,
      'property_area': property.area,
      'property_developer': property.developer,
      'property_status': property.status
    }
  });
};

export const trackPropertyInquiry = (property, inquiryType = 'general') => {
  gtmPush({
    'event': 'generate_lead',
    'ecommerce': {
      'currency': 'AED',
      'value': parseFloat(property.price) || 0,
      'items': [{
        'item_id': property.id,
        'item_name': property.title || property.name,
        'item_category': property.type || 'Property',
        'price': parseFloat(property.price) || 0,
        'quantity': 1
      }]
    },
    'lead_data': {
      'inquiry_type': inquiryType,
      'property_id': property.id,
      'property_value': property.price,
      'lead_source': 'website'
    }
  });
};

export const trackPropertyFavorite = (property, action = 'add') => {
  gtmPush({
    'event': action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist',
    'ecommerce': {
      'currency': 'AED',
      'value': parseFloat(property.price) || 0,
      'items': [{
        'item_id': property.id,
        'item_name': property.title || property.name,
        'item_category': property.type || 'Property',
        'price': parseFloat(property.price) || 0,
        'quantity': 1
      }]
    },
    'wishlist_action': action
  });
};

// Form Tracking
export const trackFormStart = (formName, formId = null) => {
  gtmPush({
    'event': 'form_start',
    'form_name': formName,
    'form_id': formId,
    'form_step': 1
  });
};

export const trackFormSubmit = (formName, formData = {}, success = true) => {
  gtmPush({
    'event': success ? 'form_submit' : 'form_submit_error',
    'form_name': formName,
    'form_data': {
      ...formData,
      // Remove sensitive data
      email: formData.email ? 'provided' : 'not_provided',
      phone: formData.phone ? 'provided' : 'not_provided'
    },
    'form_success': success
  });
};

// Custom Event Tracking
export const trackEvent = (eventName, parameters = {}) => {
  gtmPush({
    'event': eventName,
    ...parameters
  });
};

// Navigation Tracking
export const trackNavigation = (linkText, linkUrl, linkType = 'internal') => {
  gtmPush({
    'event': 'navigation_click',
    'link_text': linkText,
    'link_url': linkUrl,
    'link_type': linkType,
    'click_element': 'navigation'
  });
};

// Search Tracking
export const trackSearch = (searchTerm, searchResults = 0, searchFilters = {}) => {
  gtmPush({
    'event': 'search',
    'search_term': searchTerm,
    'search_results': searchResults,
    'search_filters': searchFilters
  });
};

// User Interaction Tracking
export const trackScroll = (scrollDepth) => {
  gtmPush({
    'event': 'scroll_depth',
    'scroll_depth': scrollDepth,
    'page_height': typeof window !== 'undefined' ? document.body.scrollHeight : 0
  });
};

export const trackFileDownload = (fileName, fileType, fileSize = null) => {
  gtmPush({
    'event': 'file_download',
    'file_name': fileName,
    'file_type': fileType,
    'file_size': fileSize
  });
};

// Performance Tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    gtmPush({
      'event': 'performance_metrics',
      'performance_data': {
        'page_load_time': navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 0,
        'dom_content_loaded': navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : 0,
        'first_paint': paint.find(p => p.name === 'first-paint')?.startTime || 0,
        'first_contentful_paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        'dns_lookup': navigation ? Math.round(navigation.domainLookupEnd - navigation.domainLookupStart) : 0,
        'tcp_connection': navigation ? Math.round(navigation.connectEnd - navigation.connectStart) : 0,
        'server_response': navigation ? Math.round(navigation.responseEnd - navigation.requestStart) : 0
      }
    });
  }
};

// Error Tracking
export const trackError = (errorType, errorMessage, errorStack = null, additionalData = {}) => {
  gtmPush({
    'event': 'exception',
    'error_type': errorType,
    'error_message': errorMessage,
    'error_stack': errorStack,
    'error_fatal': false,
    'error_page': typeof window !== 'undefined' ? window.location.pathname : '',
    ...additionalData
  });
};

// GDPR Consent Management
export const updateConsent = (consentSettings) => {
  gtmPush({
    'event': 'consent_update',
    'ad_storage': consentSettings.analytics ? 'granted' : 'denied',
    'analytics_storage': consentSettings.analytics ? 'granted' : 'denied',
    'ad_user_data': consentSettings.marketing ? 'granted' : 'denied',
    'ad_personalization': consentSettings.marketing ? 'granted' : 'denied'
  });
};

// Google Ads Conversion Tracking
export const trackConversion = (conversionId, conversionLabel, value = null, currency = 'AED') => {
  gtmPush({
    'event': 'conversion',
    'google_ads_conversion_id': conversionId,
    'google_ads_conversion_label': conversionLabel,
    'conversion_value': value,
    'conversion_currency': currency
  });
};

// Cross-Domain Tracking
export const setupCrossDomainTracking = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GTM_CONFIG.GA_ID, {
      'linker': {
        'domains': GTM_CONFIG.CROSS_DOMAIN_TRACKING
      }
    });
  }
};

// Custom Dimensions Helper
export const setCustomDimensions = (dimensions) => {
  gtmPush({
    'event': 'custom_dimensions_set',
    'custom_dimensions': dimensions
  });
};

// Initialize GTM with all configurations
export const initGTM = () => {
  initDataLayer();
  setupCrossDomainTracking();
  
  // Track initial performance metrics after page load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(trackPerformance, 1000);
    });
    
    // Global error tracking
    window.addEventListener('error', (event) => {
      trackError('javascript_error', event.message, event.error?.stack, {
        'error_filename': event.filename,
        'error_lineno': event.lineno,
        'error_colno': event.colno
      });
    });
    
    // Unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', (event) => {
      trackError('promise_rejection', event.reason?.message || 'Unhandled Promise Rejection', event.reason?.stack);
    });
  }
};

// Export pushToDataLayer as alias for gtmPush for backward compatibility
export const pushToDataLayer = gtmPush;

// Export all functions for easy import
export default {
  initDataLayer,
  initGTM,
  gtmPush,
  pushToDataLayer,
  trackPageView,
  trackPropertyView,
  trackPropertyInquiry,
  trackPropertyFavorite,
  trackFormStart,
  trackFormSubmit,
  trackEvent,
  trackNavigation,
  trackSearch,
  trackScroll,
  trackFileDownload,
  trackPerformance,
  trackError,
  updateConsent,
  trackConversion,
  setCustomDimensions,
  setUserId,
  getUserId,
  getSessionId
};

// All functions are already exported as named exports above