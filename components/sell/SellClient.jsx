'use client';

import { useEffect } from 'react';
import { setupPageTracking } from '@/utils/pageTracking';

export default function SellClient() {
  useEffect(() => {
    // Setup comprehensive page tracking for sell page
    const cleanup = setupPageTracking('sell_properties', {
      pageData: {
        page_type: 'service',
        content_category: 'sell_properties',
        business_unit: 'property_portal'
      },
      trackScrollDepth: true,
      trackTimeOnPage: true,
      trackExitIntent: true
    });

    return cleanup;
  }, []);

  return null; // This component only handles tracking
}