'use client';

import { useEffect } from 'react';
import { setupPageTracking } from '@/utils/pageTracking';

export default function AboutUsClient() {
  useEffect(() => {
    // Setup comprehensive page tracking for about us page
    const cleanup = setupPageTracking('about_us', {
      pageData: {
        page_type: 'about',
        content_category: 'company_info',
        business_unit: 'property_portal'
      },
      trackScrollDepth: true,
      trackTimeOnPage: true
    });

    return cleanup;
  }, []);

  return null; // This component only handles tracking
}