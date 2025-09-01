"use client";
import React from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';

/**
 * Higher-Order Component for wrapping elements with analytics tracking
 * @param {React.Component} WrappedComponent - The component to wrap
 * @param {Object} trackingConfig - Configuration for tracking
 * @returns {React.Component} - Enhanced component with analytics
 */
export const withAnalyticsTracking = (WrappedComponent, trackingConfig = {}) => {
  return React.forwardRef((props, ref) => {
    const analytics = useAnalytics();
    const {
      eventName = 'Element Interacted',
      trackClick = true,
      trackHover = false,
      trackFocus = false,
      elementName = WrappedComponent.displayName || WrappedComponent.name || 'Unknown Element',
      customProperties = {},
      ...otherConfig
    } = trackingConfig;

    const handleClick = (originalOnClick) => (event) => {
      if (trackClick && analytics.isReady()) {
        analytics.trackWithContext(eventName, {
          elementName,
          elementType: 'click',
          ...customProperties,
          ...otherConfig
        });
      }
      
      // Call original onClick if it exists
      if (originalOnClick) {
        originalOnClick(event);
      }
    };

    const handleHover = (originalOnMouseEnter) => (event) => {
      if (trackHover && analytics.isReady()) {
        analytics.trackWithContext('Element Hovered', {
          elementName,
          elementType: 'hover',
          ...customProperties,
          ...otherConfig
        });
      }
      
      if (originalOnMouseEnter) {
        originalOnMouseEnter(event);
      }
    };

    const handleFocus = (originalOnFocus) => (event) => {
      if (trackFocus && analytics.isReady()) {
        analytics.trackWithContext('Element Focused', {
          elementName,
          elementType: 'focus',
          ...customProperties,
          ...otherConfig
        });
      }
      
      if (originalOnFocus) {
        originalOnFocus(event);
      }
    };

    const enhancedProps = {
      ...props,
      onClick: handleClick(props.onClick),
      onMouseEnter: trackHover ? handleHover(props.onMouseEnter) : props.onMouseEnter,
      onFocus: trackFocus ? handleFocus(props.onFocus) : props.onFocus,
    };

    return <WrappedComponent ref={ref} {...enhancedProps} />;
  });
};

/**
 * Analytics-enabled Button component
 */
export const AnalyticsButton = withAnalyticsTracking('button', {
  eventName: 'Button Clicked',
  elementName: 'Generic Button',
  trackClick: true
});

/**
 * Analytics-enabled Link component
 */
export const AnalyticsLink = withAnalyticsTracking('a', {
  eventName: 'Link Clicked',
  elementName: 'Generic Link',
  trackClick: true
});

/**
 * Custom hook for manual analytics tracking
 */
export const useAnalyticsTracking = () => {
  const analytics = useAnalytics();

  const trackButtonClick = (buttonName, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackButtonClick(buttonName, context);
    }
  };

  const trackLinkClick = (linkName, destination, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackWithContext('Link Clicked', {
        linkName,
        destination,
        ...context
      });
    }
  };

  const trackFormSubmission = (formName, formData = {}, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackContactForm(formName, null, { ...formData, ...context });
    }
  };

  const trackPropertyInteraction = (propertyId, interactionType, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackWithContext('Property Interaction', {
        propertyId,
        interactionType,
        ...context
      });
    }
  };

  const trackSearchAction = (query, filters = {}, resultsCount = 0) => {
    if (analytics.isReady()) {
      analytics.trackSearch(query, filters, resultsCount);
    }
  };

  const trackFilterUsage = (filterType, filterValue, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackFilterUsage(filterType, filterValue, context);
    }
  };

  const trackNavigation = (from, to, method = 'click') => {
    if (analytics.isReady()) {
      analytics.trackNavigation(from, to, method);
    }
  };

  const trackUserEngagement = (engagementType, duration = null, context = {}) => {
    if (analytics.isReady()) {
      analytics.trackEngagement(engagementType, duration, context);
    }
  };

  return {
    trackButtonClick,
    trackLinkClick,
    trackFormSubmission,
    trackPropertyInteraction,
    trackSearchAction,
    trackFilterUsage,
    trackNavigation,
    trackUserEngagement
  };
};

/**
 * Component for tracking specific UI interactions
 */
export const InteractionTracker = ({ children, trackingConfig = {} }) => {
  const analytics = useAnalytics();
  const {
    onMount = false,
    onUnmount = false,
    onVisible = false,
    componentName = 'Unknown Component',
    ...otherConfig
  } = trackingConfig;

  React.useEffect(() => {
    if (onMount && analytics.isReady()) {
      analytics.trackWithContext('Component Mounted', {
        componentName,
        ...otherConfig
      });
    }

    return () => {
      if (onUnmount && analytics.isReady()) {
        analytics.trackWithContext('Component Unmounted', {
          componentName,
          ...otherConfig
        });
      }
    };
  }, [analytics, componentName, onMount, onUnmount, otherConfig]);

  // Intersection Observer for visibility tracking
  React.useEffect(() => {
    if (!onVisible || !analytics.isReady()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.trackWithContext('Component Visible', {
              componentName,
              visibilityRatio: entry.intersectionRatio,
              ...otherConfig
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector(`[data-component="${componentName}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [analytics, componentName, onVisible, otherConfig]);

  return (
    <div data-component={componentName}>
      {children}
    </div>
  );
};

export default {
  withAnalyticsTracking,
  AnalyticsButton,
  AnalyticsLink,
  useAnalyticsTracking,
  InteractionTracker
};