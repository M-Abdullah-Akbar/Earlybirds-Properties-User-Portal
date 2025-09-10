/**
 * Enhanced Page Tracker Component
 * Automatically tracks page views, navigation events, and user interactions
 * 
 * Features:
 * - Automatic page view tracking with GTM
 * - Route change detection
 * - Performance metrics
 * - User session tracking
 * - Scroll depth tracking
 * - Time on page tracking
 * - Exit intent detection
 * 
 * @author Earlybirds Properties Development Team
 * @version 2.0.0
 */

"use client";
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { trackPageView, trackEvent } from '@/utils/gtm';

const PageTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();
  const pageStartTime = useRef(Date.now());
  const scrollDepthTracked = useRef(new Set());
  const maxScrollDepth = useRef(0);

  // Track page views
  useEffect(() => {
    if (analytics.isInitialized && analytics.hasAnalyticsConsent) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      const title = typeof document !== 'undefined' ? document.title : '';
      
      // Reset tracking data for new page
      pageStartTime.current = Date.now();
      scrollDepthTracked.current.clear();
      maxScrollDepth.current = 0;
      
      // Track page view with enhanced context
      analytics.trackPageWithContext('Page View', {
        page_path: pathname,
        page_url: url,
        page_title: title,
        search_params: searchParams.toString(),
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screen_resolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
        viewport_size: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : ''
      });

      // Track with GTM as well
      trackPageView(pathname, {
        page_title: title,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: pathname
      });
    }
  }, [pathname, searchParams]);

  // Set up scroll depth tracking
  useEffect(() => {
    if (!analytics.hasAnalyticsConsent) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
      
      // Update max scroll depth
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;
      }
      
      // Track scroll milestones (25%, 50%, 75%, 90%, 100%)
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          analytics.trackScrollDepth(milestone);
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [analytics, pathname]);

  // Track time on page when leaving
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (analytics.hasAnalyticsConsent) {
        const timeOnPage = Math.round((Date.now() - pageStartTime.current) / 1000);
        
        // Track time on page and max scroll depth
        trackEvent('page_engagement', {
          time_on_page: timeOnPage,
          max_scroll_depth: maxScrollDepth.current,
          page_path: pathname,
          engagement_type: 'page_exit'
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && analytics.hasAnalyticsConsent) {
        const timeOnPage = Math.round((Date.now() - pageStartTime.current) / 1000);
        
        trackEvent('page_engagement', {
          time_on_page: timeOnPage,
          max_scroll_depth: maxScrollDepth.current,
          page_path: pathname,
          engagement_type: 'page_hidden'
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [analytics, pathname]);

  return null;
};

// Throttle function to limit scroll event frequency
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

export default PageTracker;