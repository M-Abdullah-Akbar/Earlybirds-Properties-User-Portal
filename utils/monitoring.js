/**
 * Error Tracking and Performance Monitoring Utility
 * Comprehensive monitoring for errors, performance metrics, and user experience
 */

import { trackError, trackPerformance } from './gtm';
import { getUserContext, getTechnicalContext } from './customDimensions';

// Error types classification
const ERROR_TYPES = {
  JAVASCRIPT: 'javascript_error',
  NETWORK: 'network_error',
  PROMISE_REJECTION: 'promise_rejection',
  RESOURCE_LOADING: 'resource_loading_error',
  API_ERROR: 'api_error',
  FORM_VALIDATION: 'form_validation_error',
  AUTHENTICATION: 'authentication_error',
  PERMISSION: 'permission_error',
  CUSTOM: 'custom_error'
};

// Performance metrics types
const PERFORMANCE_METRICS = {
  PAGE_LOAD: 'page_load_time',
  FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
  LARGEST_CONTENTFUL_PAINT: 'largest_contentful_paint',
  FIRST_INPUT_DELAY: 'first_input_delay',
  CUMULATIVE_LAYOUT_SHIFT: 'cumulative_layout_shift',
  TIME_TO_INTERACTIVE: 'time_to_interactive',
  API_RESPONSE_TIME: 'api_response_time',
  RESOURCE_LOAD_TIME: 'resource_load_time',
  CUSTOM_TIMING: 'custom_timing'
};

// Error severity levels
const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Enhanced error tracking
export const trackErrorEvent = (error, errorContext = {}) => {
  try {
    const {
      errorType = ERROR_TYPES.CUSTOM,
      severity = ERROR_SEVERITY.MEDIUM,
      userId,
      sessionId,
      pageUrl = window.location.href,
      userAgent = navigator.userAgent,
      timestamp = new Date().toISOString(),
      additionalContext = {},
      ...customData
    } = errorContext;
    
    // Extract error information
    const errorInfo = {
      message: error.message || error.toString(),
      stack: error.stack || 'No stack trace available',
      name: error.name || 'Unknown Error',
      fileName: error.fileName || error.filename || 'Unknown',
      lineNumber: error.lineNumber || error.lineno || 0,
      columnNumber: error.columnNumber || error.colno || 0
    };
    
    // Prepare error payload
    const errorPayload = {
      event: 'error_tracking',
      error_type: errorType,
      error_severity: severity,
      error_message: errorInfo.message,
      error_stack: errorInfo.stack,
      error_name: errorInfo.name,
      error_file: errorInfo.fileName,
      error_line: errorInfo.lineNumber,
      error_column: errorInfo.columnNumber,
      page_url: pageUrl,
      user_agent: userAgent,
      timestamp: timestamp,
      ...getUserContext(),
      ...getTechnicalContext(),
      ...additionalContext,
      ...customData
    };
    
    // Track error
    trackError(error, errorPayload);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorPayload);
    }
    
  } catch (trackingError) {
    console.error('Error in error tracking:', trackingError);
  }
};

// Network error tracking
export const trackNetworkError = (request, response, errorContext = {}) => {
  const networkErrorData = {
    errorType: ERROR_TYPES.NETWORK,
    severity: response?.status >= 500 ? ERROR_SEVERITY.HIGH : ERROR_SEVERITY.MEDIUM,
    request_url: request.url || request,
    request_method: request.method || 'GET',
    response_status: response?.status || 0,
    response_status_text: response?.statusText || 'Unknown',
    network_error: true,
    ...errorContext
  };
  
  const error = new Error(`Network Error: ${response?.status} ${response?.statusText}`);
  trackErrorEvent(error, networkErrorData);
};

// API error tracking
export const trackApiError = (endpoint, error, requestData = {}) => {
  const apiErrorData = {
    errorType: ERROR_TYPES.API_ERROR,
    severity: ERROR_SEVERITY.HIGH,
    api_endpoint: endpoint,
    request_data: JSON.stringify(requestData),
    api_error: true
  };
  
  trackErrorEvent(error, apiErrorData);
};

// Form validation error tracking
export const trackFormValidationError = (formName, validationErrors, formData = {}) => {
  const validationErrorData = {
    errorType: ERROR_TYPES.FORM_VALIDATION,
    severity: ERROR_SEVERITY.LOW,
    form_name: formName,
    validation_errors: JSON.stringify(validationErrors),
    form_data: JSON.stringify(formData),
    validation_error: true
  };
  
  const error = new Error(`Form Validation Error in ${formName}`);
  trackErrorEvent(error, validationErrorData);
};

// Performance tracking
export const trackPerformanceMetric = (metricName, value, unit = 'milliseconds', additionalData = {}) => {
  try {
    const performancePayload = {
      event: 'performance_tracking',
      metric_name: metricName,
      metric_value: value,
      metric_unit: unit,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...getUserContext(),
      ...getTechnicalContext(),
      ...additionalData
    };
    
    trackPerformance(performancePayload);
    
  } catch (error) {
    console.error('Error tracking performance metric:', error);
  }
};

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // First Contentful Paint (FCP)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        trackPerformanceMetric(
          PERFORMANCE_METRICS.FIRST_CONTENTFUL_PAINT,
          entry.startTime,
          'milliseconds',
          { metric_type: 'core_web_vital' }
        );
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.warn('Paint timing not supported');
  }
  
  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    trackPerformanceMetric(
      PERFORMANCE_METRICS.LARGEST_CONTENTFUL_PAINT,
      lastEntry.startTime,
      'milliseconds',
      { metric_type: 'core_web_vital' }
    );
  });
  
  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP timing not supported');
  }
  
  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      trackPerformanceMetric(
        PERFORMANCE_METRICS.FIRST_INPUT_DELAY,
        entry.processingStart - entry.startTime,
        'milliseconds',
        { metric_type: 'core_web_vital' }
      );
    }
  });
  
  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID timing not supported');
  }
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    
    trackPerformanceMetric(
      PERFORMANCE_METRICS.CUMULATIVE_LAYOUT_SHIFT,
      clsValue,
      'score',
      { metric_type: 'core_web_vital' }
    );
  });
  
  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS timing not supported');
  }
};

// Page load performance tracking
export const trackPageLoadPerformance = () => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        // Track various load timing metrics
        trackPerformanceMetric(
          PERFORMANCE_METRICS.PAGE_LOAD,
          navigation.loadEventEnd - navigation.fetchStart,
          'milliseconds',
          {
            dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp_connect: navigation.connectEnd - navigation.connectStart,
            request_response: navigation.responseEnd - navigation.requestStart,
            dom_processing: navigation.domComplete - navigation.domLoading,
            metric_type: 'page_load'
          }
        );
      }
    }, 0);
  });
};

// Resource loading performance tracking
export const trackResourcePerformance = () => {
  if (typeof window === 'undefined') return;
  
  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only track significant resources
      if (entry.duration > 100) {
        trackPerformanceMetric(
          PERFORMANCE_METRICS.RESOURCE_LOAD_TIME,
          entry.duration,
          'milliseconds',
          {
            resource_name: entry.name,
            resource_type: entry.initiatorType,
            resource_size: entry.transferSize || 0,
            metric_type: 'resource_load'
          }
        );
      }
    }
  });
  
  try {
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.warn('Resource timing not supported');
  }
};

// API response time tracking
export const trackApiResponseTime = (endpoint, startTime, endTime, additionalData = {}) => {
  const responseTime = endTime - startTime;
  
  trackPerformanceMetric(
    PERFORMANCE_METRICS.API_RESPONSE_TIME,
    responseTime,
    'milliseconds',
    {
      api_endpoint: endpoint,
      metric_type: 'api_performance',
      ...additionalData
    }
  );
};

// Custom timing tracking
export const trackCustomTiming = (timingName, startTime, endTime, additionalData = {}) => {
  const duration = endTime - startTime;
  
  trackPerformanceMetric(
    PERFORMANCE_METRICS.CUSTOM_TIMING,
    duration,
    'milliseconds',
    {
      timing_name: timingName,
      metric_type: 'custom_timing',
      ...additionalData
    }
  );
};

// Error monitoring setup
export const setupErrorMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Global error handler
  window.addEventListener('error', (event) => {
    trackErrorEvent(event.error || new Error(event.message), {
      errorType: ERROR_TYPES.JAVASCRIPT,
      severity: ERROR_SEVERITY.HIGH,
      fileName: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno
    });
  });
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    trackErrorEvent(event.reason, {
      errorType: ERROR_TYPES.PROMISE_REJECTION,
      severity: ERROR_SEVERITY.HIGH,
      promise_rejection: true
    });
  });
  
  // Resource loading error handler
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      trackErrorEvent(new Error(`Resource loading failed: ${event.target.src || event.target.href}`), {
        errorType: ERROR_TYPES.RESOURCE_LOADING,
        severity: ERROR_SEVERITY.MEDIUM,
        resource_url: event.target.src || event.target.href,
        resource_type: event.target.tagName
      });
    }
  }, true);
};

// Performance monitoring setup
export const setupPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Track core web vitals
  trackCoreWebVitals();
  
  // Track page load performance
  trackPageLoadPerformance();
  
  // Track resource performance
  trackResourcePerformance();
};

// Initialize all monitoring
export const initializeMonitoring = () => {
  setupErrorMonitoring();
  setupPerformanceMonitoring();
  
  console.log('Error and performance monitoring initialized');
};

// Export constants and functions
export {
  ERROR_TYPES,
  PERFORMANCE_METRICS,
  ERROR_SEVERITY
};

export default {
  trackErrorEvent,
  trackNetworkError,
  trackApiError,
  trackFormValidationError,
  trackPerformanceMetric,
  trackCoreWebVitals,
  trackPageLoadPerformance,
  trackResourcePerformance,
  trackApiResponseTime,
  trackCustomTiming,
  setupErrorMonitoring,
  setupPerformanceMonitoring,
  initializeMonitoring,
  ERROR_TYPES,
  PERFORMANCE_METRICS,
  ERROR_SEVERITY
};