'use client';

import { useEffect } from 'react';
import { setupPageTracking } from '@/utils/pageTracking';

export default function PageTrackingClient({ 
  pageName, 
  pageData = {}, 
  trackScrollDepth = true, 
  trackTimeOnPage = true, 
  trackExitIntent = false 
}) {
  useEffect(() => {
    // Setup comprehensive page tracking
    const cleanup = setupPageTracking(pageName, {
      pageData,
      trackScrollDepth,
      trackTimeOnPage,
      trackExitIntent
    });

    return cleanup;
  }, [pageName, pageData, trackScrollDepth, trackTimeOnPage, trackExitIntent]);

  return null; // This component only handles tracking
}