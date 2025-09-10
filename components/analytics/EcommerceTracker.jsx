/**
 * Enhanced Ecommerce Tracking Component
 * Tracks property-related ecommerce events for real estate platform
 * 
 * Features:
 * - Property view tracking
 * - Property inquiry tracking
 * - Favorite/wishlist tracking
 * - Property comparison tracking
 * - Lead generation tracking
 * - Booking/appointment tracking
 * - Property search tracking
 * - Filter usage tracking
 * 
 * @author Earlybirds Properties Development Team
 * @version 1.0.0
 */

"use client";
import React from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { trackEcommerce, trackEvent } from '@/utils/gtm';

// Custom hook for ecommerce tracking
export const useEcommerceTracking = () => {
  const analytics = useAnalytics();

  // Track property view (equivalent to product view)
  const trackPropertyView = (property) => {
    if (!analytics.hasAnalyticsConsent) return;

    const ecommerceData = {
      currency: 'USD',
      value: property.price || 0,
      items: [{
        item_id: property.id,
        item_name: property.title || property.name,
        item_category: property.type || 'property',
        item_category2: property.subType || '',
        item_category3: property.location?.city || '',
        item_category4: property.location?.state || '',
        item_category5: property.location?.country || '',
        price: property.price || 0,
        quantity: 1,
        item_brand: property.developer || property.agent?.name || '',
        item_variant: property.bedrooms ? `${property.bedrooms}BR` : '',
        custom_parameters: {
          property_size: property.size || '',
          property_age: property.yearBuilt ? new Date().getFullYear() - property.yearBuilt : '',
          listing_type: property.listingType || '',
          property_status: property.status || ''
        }
      }]
    };

    analytics.trackEcommerceEvent('view_item', ecommerceData);
    
    // Also track as custom event with additional context
    analytics.trackWithContext('property_viewed', {
      property_id: property.id,
      property_type: property.type,
      property_price: property.price,
      property_location: `${property.location?.city}, ${property.location?.state}`,
      view_source: 'detail_page'
    });
  };

  // Track property list view
  const trackPropertyListView = (properties, listContext = {}) => {
    if (!analytics.hasAnalyticsConsent || !properties.length) return;

    const items = properties.map((property, index) => ({
      item_id: property.id,
      item_name: property.title || property.name,
      item_category: property.type || 'property',
      item_category2: property.subType || '',
      item_list_id: listContext.listId || 'property_search_results',
      item_list_name: listContext.listName || 'Property Search Results',
      index: index,
      price: property.price || 0,
      quantity: 1
    }));

    const ecommerceData = {
      item_list_id: listContext.listId || 'property_search_results',
      item_list_name: listContext.listName || 'Property Search Results',
      items: items
    };

    analytics.trackEcommerceEvent('view_item_list', ecommerceData);
  };

  // Track property inquiry (lead generation)
  const trackPropertyInquiry = (property, inquiryType, inquiryData = {}) => {
    if (!analytics.hasAnalyticsConsent) return;

    const ecommerceData = {
      currency: 'USD',
      value: property.price || 0,
      items: [{
        item_id: property.id,
        item_name: property.title || property.name,
        item_category: property.type || 'property',
        price: property.price || 0,
        quantity: 1
      }]
    };

    // Track as generate_lead event
    analytics.trackEcommerceEvent('generate_lead', ecommerceData);
    
    // Track detailed inquiry event
    analytics.trackWithContext('property_inquiry', {
      property_id: property.id,
      inquiry_type: inquiryType, // 'contact', 'tour_request', 'info_request', etc.
      property_price: property.price,
      property_type: property.type,
      inquiry_method: inquiryData.method || 'form',
      user_type: inquiryData.userType || 'prospect',
      lead_score: inquiryData.leadScore || 0
    });
  };

  // Track property to favorites/wishlist
  const trackAddToWishlist = (property) => {
    if (!analytics.hasAnalyticsConsent) return;

    const ecommerceData = {
      currency: 'USD',
      value: property.price || 0,
      items: [{
        item_id: property.id,
        item_name: property.title || property.name,
        item_category: property.type || 'property',
        price: property.price || 0,
        quantity: 1
      }]
    };

    analytics.trackEcommerceEvent('add_to_wishlist', ecommerceData);
    
    analytics.trackWithContext('property_favorited', {
      property_id: property.id,
      property_type: property.type,
      property_price: property.price
    });
  };

  // Track property comparison
  const trackPropertyComparison = (properties) => {
    if (!analytics.hasAnalyticsConsent || !properties.length) return;

    const items = properties.map(property => ({
      item_id: property.id,
      item_name: property.title || property.name,
      item_category: property.type || 'property',
      price: property.price || 0,
      quantity: 1
    }));

    analytics.trackWithContext('property_comparison', {
      property_count: properties.length,
      property_ids: properties.map(p => p.id),
      comparison_type: 'side_by_side'
    });
  };

  // Track property search
  const trackPropertySearch = (searchParams, resultCount) => {
    if (!analytics.hasAnalyticsConsent) return;

    analytics.trackEcommerceEvent('search', {
      search_term: searchParams.query || '',
      search_results: resultCount || 0
    });
    
    analytics.trackWithContext('property_search', {
      search_query: searchParams.query || '',
      search_location: searchParams.location || '',
      price_min: searchParams.priceMin || 0,
      price_max: searchParams.priceMax || 0,
      property_type: searchParams.propertyType || '',
      bedrooms: searchParams.bedrooms || '',
      bathrooms: searchParams.bathrooms || '',
      result_count: resultCount || 0,
      filters_applied: Object.keys(searchParams).length - 1 // excluding query
    });
  };

  // Track appointment/tour booking
  const trackTourBooking = (property, tourData = {}) => {
    if (!analytics.hasAnalyticsConsent) return;

    const ecommerceData = {
      currency: 'USD',
      value: property.price || 0,
      items: [{
        item_id: property.id,
        item_name: property.title || property.name,
        item_category: property.type || 'property',
        price: property.price || 0,
        quantity: 1
      }]
    };

    // Track as conversion event
    analytics.trackEcommerceEvent('begin_checkout', ecommerceData);
    
    analytics.trackWithContext('tour_booked', {
      property_id: property.id,
      tour_type: tourData.tourType || 'in_person', // 'in_person', 'virtual', 'self_guided'
      tour_date: tourData.date || '',
      tour_time: tourData.time || '',
      property_price: property.price,
      booking_source: tourData.source || 'website'
    });
  };

  // Track property contact form submission
  const trackPropertyContact = (property, contactData = {}) => {
    if (!analytics.hasAnalyticsConsent) return;

    trackPropertyInquiry(property, 'contact_form', {
      method: 'contact_form',
      ...contactData
    });
  };

  // Track property share
  const trackPropertyShare = (property, shareMethod) => {
    if (!analytics.hasAnalyticsConsent) return;

    analytics.trackWithContext('property_shared', {
      property_id: property.id,
      share_method: shareMethod, // 'email', 'facebook', 'twitter', 'whatsapp', 'copy_link'
      property_type: property.type,
      property_price: property.price
    });
  };

  // Track mortgage calculator usage
  const trackMortgageCalculator = (property, calculationData) => {
    if (!analytics.hasAnalyticsConsent) return;

    analytics.trackWithContext('mortgage_calculated', {
      property_id: property.id,
      property_price: property.price,
      loan_amount: calculationData.loanAmount || 0,
      down_payment: calculationData.downPayment || 0,
      interest_rate: calculationData.interestRate || 0,
      loan_term: calculationData.loanTerm || 30,
      monthly_payment: calculationData.monthlyPayment || 0
    });
  };

  // Track filter usage
  const trackFilterUsage = (filterType, filterValue, resultCount) => {
    if (!analytics.hasAnalyticsConsent) return;

    analytics.trackWithContext('search_filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      result_count: resultCount || 0
    });
  };

  return {
    trackPropertyView,
    trackPropertyListView,
    trackPropertyInquiry,
    trackAddToWishlist,
    trackPropertyComparison,
    trackPropertySearch,
    trackTourBooking,
    trackPropertyContact,
    trackPropertyShare,
    trackMortgageCalculator,
    trackFilterUsage
  };
};

// HOC for automatic property tracking
export const withPropertyTracking = (WrappedComponent) => {
  return function PropertyTrackingComponent(props) {
    const ecommerceTracking = useEcommerceTracking();
    
    return (
      <WrappedComponent 
        {...props} 
        ecommerceTracking={ecommerceTracking}
      />
    );
  };
};

// Component for tracking property list views
export const PropertyListTracker = ({ properties, listContext }) => {
  const { trackPropertyListView } = useEcommerceTracking();
  
  React.useEffect(() => {
    if (properties && properties.length > 0) {
      trackPropertyListView(properties, listContext);
    }
  }, [properties, listContext, trackPropertyListView]);
  
  return null;
};

// Component for tracking individual property views
export const PropertyViewTracker = ({ property }) => {
  const { trackPropertyView } = useEcommerceTracking();
  
  React.useEffect(() => {
    if (property) {
      trackPropertyView(property);
    }
  }, [property, trackPropertyView]);
  
  return null;
};

export default useEcommerceTracking;