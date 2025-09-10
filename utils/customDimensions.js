/**
 * Custom Dimensions Utility for Google Analytics 4
 * Handles user roles, session data, device info, and other custom tracking
 */

import { pushToDataLayer } from './gtm';

// Custom dimension mapping (configure these in GA4)
const CUSTOM_DIMENSIONS = {
  USER_ROLE: 'user_role',
  USER_TYPE: 'user_type',
  USER_SEGMENT: 'user_segment',
  SESSION_ID: 'session_id',
  SESSION_DURATION: 'session_duration',
  DEVICE_TYPE: 'device_type',
  BROWSER_NAME: 'browser_name',
  SCREEN_RESOLUTION: 'screen_resolution',
  VIEWPORT_SIZE: 'viewport_size',
  CONNECTION_TYPE: 'connection_type',
  PROPERTY_PREFERENCE: 'property_preference',
  SEARCH_CONTEXT: 'search_context',
  USER_JOURNEY_STAGE: 'user_journey_stage',
  ENGAGEMENT_LEVEL: 'engagement_level',
  REFERRER_TYPE: 'referrer_type'
};

// User role classifications
const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  AGENT: 'agent',
  ADMIN: 'admin',
  GUEST: 'guest'
};

// User type classifications
const USER_TYPES = {
  FIRST_TIME: 'first_time',
  RETURNING: 'returning',
  PREMIUM: 'premium',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified'
};

// Device type detection
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  
  if (isMobile && !isTablet) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
};

// Browser detection
const getBrowserName = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'chrome';
  if (userAgent.includes('Firefox')) return 'firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari';
  if (userAgent.includes('Edg')) return 'edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'opera';
  
  return 'other';
};

// Screen resolution detection
const getScreenResolution = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const width = screen.width;
  const height = screen.height;
  
  return `${width}x${height}`;
};

// Viewport size detection
const getViewportSize = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return `${width}x${height}`;
};

// Connection type detection (if available)
const getConnectionType = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return 'unknown';
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    return connection.effectiveType || connection.type || 'unknown';
  }
  
  return 'unknown';
};

// Referrer type classification
const getReferrerType = () => {
  if (typeof document === 'undefined') return 'direct';
  
  const referrer = document.referrer;
  
  if (!referrer) return 'direct';
  
  const currentDomain = window.location.hostname;
  const referrerDomain = new URL(referrer).hostname;
  
  if (referrerDomain === currentDomain) return 'internal';
  
  // Common search engines
  if (/google|bing|yahoo|duckduckgo|baidu/i.test(referrerDomain)) return 'search';
  
  // Social media platforms
  if (/facebook|twitter|linkedin|instagram|pinterest|tiktok/i.test(referrerDomain)) return 'social';
  
  // Email clients
  if (/gmail|outlook|yahoo|mail/i.test(referrerDomain)) return 'email';
  
  return 'external';
};

// Session management
class SessionManager {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.sessionStartTime = this.getSessionStartTime();
  }
  
  getOrCreateSessionId() {
    if (typeof window === 'undefined') {
      // Return a temporary session ID for server-side rendering
      return `ssr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
    }
    
    return sessionId;
  }
  
  getSessionStartTime() {
    if (typeof window === 'undefined') {
      return Date.now();
    }
    
    const startTime = sessionStorage.getItem('session_start_time');
    return startTime ? parseInt(startTime) : Date.now();
  }
  
  getSessionDuration() {
    return Math.floor((Date.now() - this.sessionStartTime) / 1000); // in seconds
  }
  
  updateSessionActivity() {
    if (typeof window === 'undefined') {
      return;
    }
    
    sessionStorage.setItem('last_activity', Date.now().toString());
  }
}

// Initialize session manager
const sessionManager = new SessionManager();

// Custom dimensions utility class
class CustomDimensionsManager {
  constructor() {
    this.dimensions = {};
    this.initializeBasicDimensions();
  }
  
  initializeBasicDimensions() {
    // Set device and browser information
    this.setDimension(CUSTOM_DIMENSIONS.DEVICE_TYPE, getDeviceType());
    this.setDimension(CUSTOM_DIMENSIONS.BROWSER_NAME, getBrowserName());
    this.setDimension(CUSTOM_DIMENSIONS.SCREEN_RESOLUTION, getScreenResolution());
    this.setDimension(CUSTOM_DIMENSIONS.VIEWPORT_SIZE, getViewportSize());
    this.setDimension(CUSTOM_DIMENSIONS.CONNECTION_TYPE, getConnectionType());
    this.setDimension(CUSTOM_DIMENSIONS.REFERRER_TYPE, getReferrerType());
    
    // Set session information
    this.setDimension(CUSTOM_DIMENSIONS.SESSION_ID, sessionManager.sessionId);
  }
  
  setDimension(key, value) {
    if (value !== null && value !== undefined && value !== 'unknown') {
      this.dimensions[key] = value;
      
      // Push to data layer immediately
      pushToDataLayer({
        event: 'custom_dimension_set',
        custom_dimension_key: key,
        custom_dimension_value: value,
        [key]: value
      });
    }
  }
  
  getDimension(key) {
    return this.dimensions[key];
  }
  
  getAllDimensions() {
    return { ...this.dimensions };
  }
  
  // User-related dimensions
  setUserRole(role) {
    if (Object.values(USER_ROLES).includes(role)) {
      this.setDimension(CUSTOM_DIMENSIONS.USER_ROLE, role);
    }
  }
  
  setUserType(type) {
    if (Object.values(USER_TYPES).includes(type)) {
      this.setDimension(CUSTOM_DIMENSIONS.USER_TYPE, type);
    }
  }
  
  setUserSegment(segment) {
    this.setDimension(CUSTOM_DIMENSIONS.USER_SEGMENT, segment);
  }
  
  setUserJourneyStage(stage) {
    const validStages = ['awareness', 'consideration', 'decision', 'retention', 'advocacy'];
    if (validStages.includes(stage)) {
      this.setDimension(CUSTOM_DIMENSIONS.USER_JOURNEY_STAGE, stage);
    }
  }
  
  // Property-related dimensions
  setPropertyPreference(preference) {
    this.setDimension(CUSTOM_DIMENSIONS.PROPERTY_PREFERENCE, preference);
  }
  
  setSearchContext(context) {
    this.setDimension(CUSTOM_DIMENSIONS.SEARCH_CONTEXT, context);
  }
  
  // Engagement tracking
  updateEngagementLevel() {
    const sessionDuration = sessionManager.getSessionDuration();
    let engagementLevel = 'low';
    
    if (sessionDuration > 300) engagementLevel = 'high'; // 5+ minutes
    else if (sessionDuration > 120) engagementLevel = 'medium'; // 2+ minutes
    
    this.setDimension(CUSTOM_DIMENSIONS.ENGAGEMENT_LEVEL, engagementLevel);
    this.setDimension(CUSTOM_DIMENSIONS.SESSION_DURATION, sessionDuration);
  }
  
  // Batch update multiple dimensions
  updateDimensions(dimensionsObj) {
    Object.entries(dimensionsObj).forEach(([key, value]) => {
      this.setDimension(key, value);
    });
  }
  
  // Get user context for tracking
  getUserContext() {
    return {
      user_role: this.getDimension(CUSTOM_DIMENSIONS.USER_ROLE),
      user_type: this.getDimension(CUSTOM_DIMENSIONS.USER_TYPE),
      user_segment: this.getDimension(CUSTOM_DIMENSIONS.USER_SEGMENT),
      session_id: this.getDimension(CUSTOM_DIMENSIONS.SESSION_ID),
      device_type: this.getDimension(CUSTOM_DIMENSIONS.DEVICE_TYPE),
      browser_name: this.getDimension(CUSTOM_DIMENSIONS.BROWSER_NAME)
    };
  }
  
  // Get technical context for tracking
  getTechnicalContext() {
    return {
      screen_resolution: this.getDimension(CUSTOM_DIMENSIONS.SCREEN_RESOLUTION),
      viewport_size: this.getDimension(CUSTOM_DIMENSIONS.VIEWPORT_SIZE),
      connection_type: this.getDimension(CUSTOM_DIMENSIONS.CONNECTION_TYPE),
      referrer_type: this.getDimension(CUSTOM_DIMENSIONS.REFERRER_TYPE)
    };
  }
}

// Create singleton instance
const customDimensions = new CustomDimensionsManager();

// Update engagement periodically
if (typeof window !== 'undefined') {
  // Update engagement every 30 seconds
  setInterval(() => {
    customDimensions.updateEngagementLevel();
    sessionManager.updateSessionActivity();
  }, 30000);
  
  // Update viewport size on resize
  window.addEventListener('resize', () => {
    customDimensions.setDimension(CUSTOM_DIMENSIONS.VIEWPORT_SIZE, getViewportSize());
  });
}

// Export functions and constants
export {
  customDimensions,
  sessionManager,
  CUSTOM_DIMENSIONS,
  USER_ROLES,
  USER_TYPES,
  CustomDimensionsManager
};

// Convenience functions
export const setCustomDimension = (key, value) => customDimensions.setDimension(key, value);
export const getCustomDimension = (key) => customDimensions.getDimension(key);
export const setUserRole = (role) => customDimensions.setUserRole(role);
export const setUserType = (type) => customDimensions.setUserType(type);
export const setUserSegment = (segment) => customDimensions.setUserSegment(segment);
export const getUserContext = () => customDimensions.getUserContext();
export const getTechnicalContext = () => customDimensions.getTechnicalContext();
export const updateEngagementLevel = () => customDimensions.updateEngagementLevel();

export default customDimensions;