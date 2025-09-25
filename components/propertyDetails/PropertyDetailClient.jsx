'use client';

import { useEffect } from 'react';
import { setupPageTracking } from '@/utils/pageTracking';

export default function PropertyDetailClient({ property }) {
  useEffect(() => {
    if (property) {
      // Setup comprehensive page tracking for property detail page
      const cleanup = setupPageTracking('property_detail', {
        pageData: {
          page_type: 'property_detail',
          content_category: 'property_view',
          business_unit: 'property_portal',
          property_id: property.id,
          property_type: property.propertyType,
          listing_type: property.listingType,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms
        },
        trackScrollDepth: true,
        trackTimeOnPage: true,
        trackExitIntent: true
      });

      return cleanup;
    }
  }, [property]);

  return null; // This component only handles tracking
}