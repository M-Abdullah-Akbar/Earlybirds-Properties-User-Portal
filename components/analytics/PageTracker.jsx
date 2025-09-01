"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/contexts/AnalyticsContext';

const PageTracker = () => {
  const pathname = usePathname();
  const analytics = useAnalytics();

  useEffect(() => {
    if (pathname && analytics.isReady()) {
      // Get page title and other metadata
      const pageTitle = typeof document !== 'undefined' ? document.title : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';
      
      // Track page view with enhanced context
      analytics.trackPageWithContext(pathname, {
        title: pageTitle,
        referrer: referrer,
        path: pathname,
        url: typeof window !== 'undefined' ? window.location.href : '',
        search: typeof window !== 'undefined' ? window.location.search : '',
        hash: typeof window !== 'undefined' ? window.location.hash : ''
      });

      // Track specific page types based on pathname
      if (pathname === '/') {
        analytics.trackWithContext('Home Page Viewed');
      } else if (pathname.startsWith('/property-detail/')) {
        const propertyId = pathname.split('/').pop();
        analytics.trackPropertyView(propertyId, {
          source: 'direct_url',
          referrer: referrer
        });
      } else if (pathname.startsWith('/properties')) {
        analytics.trackWithContext('Properties Listing Viewed', {
          listingType: 'all_properties'
        });
      } else if (pathname.startsWith('/search')) {
        analytics.trackWithContext('Search Page Viewed');
      } else if (pathname.startsWith('/contact')) {
        analytics.trackWithContext('Contact Page Viewed');
      } else if (pathname.startsWith('/about')) {
        analytics.trackWithContext('About Page Viewed');
      }
    }
  }, [pathname, analytics]);

  // This component doesn't render anything
  return null;
};

export default PageTracker;