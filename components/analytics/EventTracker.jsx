/**
 * Enhanced Event Tracker Component
 * Automatically tracks user interactions, form submissions, and navigation events
 * 
 * Features:
 * - Automatic button click tracking
 * - Form submission tracking
 * - Link click tracking
 * - File download tracking
 * - Video interaction tracking
 * - Search tracking
 * - Error tracking
 * - Custom event tracking
 * 
 * @author Earlybirds Properties Development Team
 * @version 1.0.0
 */

"use client";
import { useEffect } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { trackEvent } from '@/utils/gtm';

const EventTracker = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    if (!analytics.hasAnalyticsConsent) return;

    // Track all button clicks
    const handleButtonClick = (event) => {
      const button = event.target.closest('button');
      if (button) {
        const buttonText = button.textContent?.trim() || button.getAttribute('aria-label') || 'Unknown Button';
        const buttonId = button.id || null;
        const buttonClass = button.className || null;
        const formName = button.closest('form')?.name || button.closest('form')?.id || null;
        
        analytics.trackUserInteraction('button', 'click', {
          button_text: buttonText,
          button_id: buttonId,
          button_class: buttonClass,
          form_name: formName,
          page_path: window.location.pathname
        });
      }
    };

    // Track all link clicks
    const handleLinkClick = (event) => {
      const link = event.target.closest('a');
      if (link) {
        const linkText = link.textContent?.trim() || link.getAttribute('aria-label') || 'Unknown Link';
        const linkUrl = link.href;
        const linkId = link.id || null;
        const isExternal = linkUrl && !linkUrl.startsWith(window.location.origin);
        const isDownload = link.hasAttribute('download');
        
        analytics.trackUserInteraction('link', 'click', {
          link_text: linkText,
          link_url: linkUrl,
          link_id: linkId,
          is_external: isExternal,
          is_download: isDownload,
          page_path: window.location.pathname
        });

        // Special tracking for external links
        if (isExternal) {
          trackEvent('external_link_click', {
            link_url: linkUrl,
            link_text: linkText,
            page_path: window.location.pathname
          });
        }

        // Special tracking for downloads
        if (isDownload) {
          const fileName = linkUrl.split('/').pop() || 'unknown_file';
          const fileExtension = fileName.split('.').pop() || 'unknown';
          
          trackEvent('file_download', {
            file_name: fileName,
            file_extension: fileExtension,
            file_url: linkUrl,
            page_path: window.location.pathname
          });
        }
      }
    };

    // Track form submissions
    const handleFormSubmit = (event) => {
      const form = event.target;
      const formName = form.name || form.id || 'unnamed_form';
      const formAction = form.action || window.location.href;
      const formMethod = form.method || 'GET';
      
      // Get form data (non-sensitive fields only)
      const formData = new FormData(form);
      const formFields = {};
      const sensitiveFields = ['password', 'ssn', 'credit_card', 'cvv', 'pin'];
      
      for (let [key, value] of formData.entries()) {
        // Only track non-sensitive field names and types, not values
        if (!sensitiveFields.some(sensitive => key.toLowerCase().includes(sensitive))) {
          const input = form.querySelector(`[name="${key}"]`);
          formFields[key] = {
            type: input?.type || 'unknown',
            hasValue: value && value.toString().length > 0
          };
        }
      }
      
      analytics.trackFormSubmission(formName, true, {
        form_action: formAction,
        form_method: formMethod,
        form_fields: Object.keys(formFields),
        field_count: Object.keys(formFields).length,
        page_path: window.location.pathname
      });
    };

    // Track input focus (for form engagement)
    const handleInputFocus = (event) => {
      const input = event.target;
      if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
        const inputName = input.name || input.id || 'unnamed_input';
        const inputType = input.type || input.tagName.toLowerCase();
        const formName = input.closest('form')?.name || input.closest('form')?.id || null;
        
        analytics.trackUserInteraction('form_field', 'focus', {
          field_name: inputName,
          field_type: inputType,
          form_name: formName,
          page_path: window.location.pathname
        });
      }
    };

    // Track search interactions
    const handleSearchInput = (event) => {
      const input = event.target;
      if (input.type === 'search' || input.name?.includes('search') || input.id?.includes('search')) {
        const searchTerm = input.value?.trim();
        if (searchTerm && searchTerm.length >= 3) {
          // Debounce search tracking
          clearTimeout(input.searchTimeout);
          input.searchTimeout = setTimeout(() => {
            analytics.trackUserInteraction('search', 'input', {
              search_term: searchTerm,
              search_length: searchTerm.length,
              page_path: window.location.pathname
            });
          }, 1000);
        }
      }
    };

    // Track video interactions
    const handleVideoPlay = (event) => {
      const video = event.target;
      const videoSrc = video.src || video.currentSrc || 'unknown';
      const videoDuration = video.duration || 0;
      
      trackEvent('video_play', {
        video_src: videoSrc,
        video_duration: videoDuration,
        page_path: window.location.pathname
      });
    };

    const handleVideoPause = (event) => {
      const video = event.target;
      const videoSrc = video.src || video.currentSrc || 'unknown';
      const currentTime = video.currentTime || 0;
      const duration = video.duration || 0;
      const percentWatched = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
      
      trackEvent('video_pause', {
        video_src: videoSrc,
        current_time: currentTime,
        percent_watched: percentWatched,
        page_path: window.location.pathname
      });
    };

    // Track JavaScript errors
    const handleError = (event) => {
      const error = event.error || event;
      analytics.trackErrorEvent(error, {
        error_type: 'javascript_error',
        error_message: error.message || 'Unknown error',
        error_stack: error.stack || 'No stack trace',
        page_path: window.location.pathname,
        user_agent: navigator.userAgent
      });
    };

    // Track unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      analytics.trackErrorEvent(event.reason, {
        error_type: 'unhandled_promise_rejection',
        error_message: event.reason?.message || 'Unhandled promise rejection',
        page_path: window.location.pathname,
        user_agent: navigator.userAgent
      });
    };

    // Add event listeners
    document.addEventListener('click', handleButtonClick);
    document.addEventListener('click', handleLinkClick);
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('focus', handleInputFocus, true);
    document.addEventListener('input', handleSearchInput);
    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('pause', handleVideoPause, true);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('click', handleButtonClick);
      document.removeEventListener('click', handleLinkClick);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focus', handleInputFocus, true);
      document.removeEventListener('input', handleSearchInput);
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPause, true);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [analytics]);

  return null;
};

export default EventTracker;

// Custom hook for manual event tracking
export const useEventTracking = () => {
  const analytics = useAnalytics();

  const trackCustomEvent = (eventName, properties = {}) => {
    analytics.trackWithContext(eventName, {
      ...properties,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString()
    });
  };

  const trackPropertyView = (propertyId, properties = {}) => {
    analytics.trackEcommerceEvent('view_item', {
      item_id: propertyId,
      item_category: 'property',
      ...properties
    });
  };

  const trackPropertyInquiry = (propertyId, inquiryType, properties = {}) => {
    trackCustomEvent('property_inquiry', {
      property_id: propertyId,
      inquiry_type: inquiryType,
      ...properties
    });
  };

  const trackSearchResults = (searchTerm, resultCount, filters = {}) => {
    trackCustomEvent('search_results', {
      search_term: searchTerm,
      result_count: resultCount,
      filters: filters,
      page_path: window.location.pathname
    });
  };

  const trackUserRegistration = (method, success = true) => {
    trackCustomEvent('user_registration', {
      registration_method: method,
      success: success
    });
  };

  const trackUserLogin = (method, success = true) => {
    trackCustomEvent('user_login', {
      login_method: method,
      success: success
    });
  };

  return {
    trackCustomEvent,
    trackPropertyView,
    trackPropertyInquiry,
    trackSearchResults,
    trackUserRegistration,
    trackUserLogin
  };
};