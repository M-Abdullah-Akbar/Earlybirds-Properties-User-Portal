import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Enhanced Google Analytics 4 and GTM Tracking Utilities
 * Comprehensive tracking for real estate portal
 * Uses Google Tag Manager (GTM) for event tracking
 */

// Initialize GTM Data Layer
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }
};

// Enhanced Page View Tracking with additional context
export const trackPageView = (path, additionalData = {}) => {
  try {
    const pageData = {
      event: 'page_view',
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      page_path: path,
      content_group1: getContentGroup(path),
      content_group2: getPageType(path),
      ...additionalData
    };

    sendGTMEvent(pageData);
    
    // Also push to data layer for GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(pageData);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Helper function to determine content group based on path
const getContentGroup = (path) => {
  if (path.includes('/buy')) return 'Buy Properties';
  if (path.includes('/sell')) return 'Sell Properties';
  if (path.includes('/rent')) return 'Rent Properties';
  if (path.includes('/off-plan')) return 'Off-Plan Properties';
  if (path.includes('/property-detail')) return 'Property Details';
  if (path.includes('/contact')) return 'Contact';
  if (path.includes('/about')) return 'About';
  if (path.includes('/services')) return 'Services';
  if (path.includes('/blog')) return 'Blog';
  if (path === '/') return 'Home';
  return 'Other';
};

// Helper function to determine page type
const getPageType = (path) => {
  if (path === '/') return 'homepage';
  if (path.includes('/property-detail')) return 'property_detail';
  if (path.includes('/properties') || path.includes('/buy') || path.includes('/sell') || path.includes('/rent')) return 'listing';
  if (path.includes('/contact') || path.includes('/book-a-consultation')) return 'contact';
  return 'informational';
};

// Enhanced Property View Tracking with ecommerce data
export const trackPropertyView = (propertyId, propertyData = {}) => {
  try {
    const eventData = {
      event: 'view_item',
      ecommerce: {
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      price: propertyData.price,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property view:', error);
  }
};

// Enhanced Search Tracking with detailed parameters
export const trackSearch = (searchTerm, searchData = {}) => {
  try {
    const eventData = {
      event: 'search',
      search_term: searchTerm,
      search_results: searchData.resultsCount || 0,
      property_type: searchData.propertyType || '',
      listing_type: searchData.listingType || '',
      location: searchData.location || '',
      min_price: searchData.minPrice || 0,
      max_price: searchData.maxPrice || 0,
      bedrooms: searchData.bedrooms || '',
      bathrooms: searchData.bathrooms || '',
      area_min: searchData.areaMin || 0,
      area_max: searchData.areaMax || 0,
      search_filters_applied: Object.keys(searchData).length > 1
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking search:', error);
  }
};

// Track contact form submissions
export const trackContactForm = (formType, propertyId = null) => {
  try {
    sendGTMEvent({
      event: 'form_submit',
      form_type: formType,
      form_category: 'contact',
      property_id: propertyId,
    });
  } catch (error) {
    console.error('Error tracking contact form:', error);
  }
};

// Track consultation bookings
export const trackConsultationBooking = (consultationType, propertyId = null) => {
  try {
    sendGTMEvent({
      event: 'book_consultation',
      consultation_type: consultationType,
      property_id: propertyId,
      value: 1,
    });
  } catch (error) {
    console.error('Error tracking consultation booking:', error);
  }
};

// Track property favorites/wishlist
export const trackPropertyFavorite = (propertyId, action) => {
  try {
    sendGTMEvent({
      event: action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist',
      item_id: propertyId,
      item_category: 'property',
    });
  } catch (error) {
    console.error('Error tracking property favorite:', error);
  }
};

// Track property comparison
export const trackPropertyComparison = (propertyIds) => {
  try {
    sendGTMEvent({
      event: 'compare_properties',
      property_ids: propertyIds,
      comparison_count: propertyIds.length,
    });
  } catch (error) {
    console.error('Error tracking property comparison:', error);
  }
};

// Track filter usage
export const trackFilterUsage = (filterType, filterValue) => {
  try {
    sendGTMEvent({
      event: 'filter_applied',
      filter_type: filterType,
      filter_value: filterValue,
    });
  } catch (error) {
    console.error('Error tracking filter usage:', error);
  }
};

// Track navigation clicks
export const trackNavigation = (linkText, destination) => {
  try {
    sendGTMEvent({
      event: 'navigation_click',
      link_text: linkText,
      link_destination: destination,
    });
  } catch (error) {
    console.error('Error tracking navigation:', error);
  }
};

// Track social media shares
export const trackSocialShare = (platform, contentType, contentId) => {
  try {
    sendGTMEvent({
      event: 'share',
      method: platform,
      content_type: contentType,
      content_id: contentId,
    });
  } catch (error) {
    console.error('Error tracking social share:', error);
  }
};

// Track file downloads
export const trackFileDownload = (fileName, fileType, propertyId = null) => {
  try {
    sendGTMEvent({
      event: 'file_download',
      file_name: fileName,
      file_type: fileType,
      property_id: propertyId,
    });
  } catch (error) {
    console.error('Error tracking file download:', error);
  }
};

// Track video interactions
export const trackVideoInteraction = (action, videoTitle, duration = null) => {
  try {
    sendGTMEvent({
      event: 'video_' + action,
      video_title: videoTitle,
      video_duration: duration,
    });
  } catch (error) {
    console.error('Error tracking video interaction:', error);
  }
};

// Track user engagement
export const trackEngagement = (engagementType, value = 1) => {
  try {
    sendGTMEvent({
      event: 'engagement',
      engagement_type: engagementType,
      value: value,
    });
  } catch (error) {
    console.error('Error tracking engagement:', error);
  }
};

// Track errors
export const trackError = (errorType, errorMessage, page) => {
  try {
    sendGTMEvent({
      event: 'exception',
      error_type: errorType,
      error_message: errorMessage,
      page: page,
      fatal: false,
    });
  } catch (error) {
    console.error('Error tracking error:', error);
  }
};

// Track custom events
export const trackCustomEvent = (eventName, parameters = {}) => {
  try {
    sendGTMEvent({
      event: eventName,
      ...parameters,
    });
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
};

// Enhanced Ecommerce Tracking Functions

// Track property inquiry (lead generation)
export const trackPropertyInquiry = (propertyId, propertyData = {}, inquiryType = 'general') => {
  try {
    const eventData = {
      event: 'generate_lead',
      ecommerce: {
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      inquiry_type: inquiryType,
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      price: propertyData.price,
      lead_value: propertyData.price ? propertyData.price * 0.03 : 0 // Estimated commission
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property inquiry:', error);
  }
};

// Track property viewing appointment booking
export const trackViewingAppointment = (propertyId, propertyData = {}, appointmentType = 'physical') => {
  try {
    const eventData = {
      event: 'book_appointment',
      ecommerce: {
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      appointment_type: appointmentType, // 'physical', 'virtual', 'video_call'
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      price: propertyData.price,
      conversion_value: propertyData.price ? propertyData.price * 0.05 : 0
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking viewing appointment:', error);
  }
};

// Track property offer submission
export const trackPropertyOffer = (propertyId, propertyData = {}, offerAmount = 0) => {
  try {
    const eventData = {
      event: 'submit_offer',
      ecommerce: {
        currency: 'AED',
        value: offerAmount || propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      offer_amount: offerAmount,
      asking_price: propertyData.price,
      offer_percentage: propertyData.price ? (offerAmount / propertyData.price * 100).toFixed(2) : 0,
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      conversion_value: offerAmount * 0.03 // Estimated commission on offer
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property offer:', error);
  }
};

// Track mortgage calculator usage
export const trackMortgageCalculation = (propertyId, calculationData = {}) => {
  try {
    const eventData = {
      event: 'mortgage_calculation',
      property_id: propertyId,
      property_price: calculationData.propertyPrice || 0,
      down_payment: calculationData.downPayment || 0,
      loan_amount: calculationData.loanAmount || 0,
      interest_rate: calculationData.interestRate || 0,
      loan_term: calculationData.loanTerm || 0,
      monthly_payment: calculationData.monthlyPayment || 0,
      engagement_value: 1
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking mortgage calculation:', error);
  }
};

// Track property list creation (for agents)
export const trackPropertyListing = (propertyData = {}) => {
  try {
    const eventData = {
      event: 'create_listing',
      ecommerce: {
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyData.id || 'new_listing',
          item_name: propertyData.title || 'New Property Listing',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      price: propertyData.price,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
      listing_value: propertyData.price || 0
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property listing:', error);
  }
};

// Track conversion events (sale/rental agreement)
export const trackPropertyConversion = (propertyId, propertyData = {}, conversionType = 'sale') => {
  try {
    const eventData = {
      event: 'purchase',
      ecommerce: {
        transaction_id: `${propertyId}_${Date.now()}`,
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      conversion_type: conversionType, // 'sale', 'rental', 'lease'
      property_type: propertyData.propertyType,
      listing_type: propertyData.listingType,
      location: propertyData.location,
      final_price: propertyData.price,
      commission_earned: propertyData.price ? propertyData.price * 0.03 : 0
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property conversion:', error);
  }
};

// Track user registration/signup
export const trackUserRegistration = (userType = 'buyer', registrationMethod = 'email') => {
  try {
    const eventData = {
      event: 'sign_up',
      method: registrationMethod,
      user_type: userType, // 'buyer', 'seller', 'agent', 'investor'
      registration_value: 10 // Estimated value of a registered user
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking user registration:', error);
  }
};

// Track newsletter subscription with enhanced data
export const trackNewsletterSubscription = (subscriptionType = 'general', userInterests = []) => {
  try {
    const eventData = {
      event: 'newsletter_signup',
      subscription_type: subscriptionType,
      user_interests: userInterests.join(','),
      subscription_value: 5,
      engagement_score: userInterests.length * 2
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking newsletter subscription:', error);
  }
};

// Track property saved searches
export const trackSavedSearch = (searchCriteria = {}) => {
  try {
    const eventData = {
      event: 'save_search',
      property_type: searchCriteria.propertyType || '',
      listing_type: searchCriteria.listingType || '',
      location: searchCriteria.location || '',
      min_price: searchCriteria.minPrice || 0,
      max_price: searchCriteria.maxPrice || 0,
      bedrooms: searchCriteria.bedrooms || '',
      bathrooms: searchCriteria.bathrooms || '',
      search_value: 3,
      engagement_level: 'high'
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking saved search:', error);
  }
};

// Custom Dimensions and Metrics for Property-Specific Data

// Initialize custom dimensions for GTM/GA4
export const initializeCustomDimensions = () => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      // Set up custom dimensions for property data
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: {
          'custom_dimension_1': 'property_type',
          'custom_dimension_2': 'listing_type', 
          'custom_dimension_3': 'location_emirate',
          'custom_dimension_4': 'location_area',
          'custom_dimension_5': 'price_range',
          'custom_dimension_6': 'bedroom_count',
          'custom_dimension_7': 'bathroom_count',
          'custom_dimension_8': 'property_size_range',
          'custom_dimension_9': 'user_type',
          'custom_dimension_10': 'search_intent'
        }
      });
    }
  } catch (error) {
    console.error('Error initializing custom dimensions:', error);
  }
};

// Helper function to categorize price ranges
export const getPriceRange = (price) => {
  if (!price || price === 0) return 'Not Specified';
  
  const priceNum = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price;
  
  if (priceNum < 500000) return 'Under 500K AED';
  if (priceNum < 1000000) return '500K - 1M AED';
  if (priceNum < 2000000) return '1M - 2M AED';
  if (priceNum < 5000000) return '2M - 5M AED';
  if (priceNum < 10000000) return '5M - 10M AED';
  return 'Above 10M AED';
};

// Helper function to categorize property sizes
export const getPropertySizeRange = (area) => {
  if (!area || area === 0) return 'Not Specified';
  
  const areaNum = typeof area === 'string' ? parseFloat(area.replace(/[^0-9.-]+/g, '')) : area;
  
  if (areaNum < 500) return 'Under 500 sqft';
  if (areaNum < 1000) return '500 - 1000 sqft';
  if (areaNum < 1500) return '1000 - 1500 sqft';
  if (areaNum < 2500) return '1500 - 2500 sqft';
  if (areaNum < 5000) return '2500 - 5000 sqft';
  return 'Above 5000 sqft';
};

// Helper function to extract emirate from location
export const getEmirate = (location) => {
  if (!location) return 'Not Specified';
  
  const locationLower = location.toLowerCase();
  
  if (locationLower.includes('dubai')) return 'Dubai';
  if (locationLower.includes('abu dhabi')) return 'Abu Dhabi';
  if (locationLower.includes('sharjah')) return 'Sharjah';
  if (locationLower.includes('ajman')) return 'Ajman';
  if (locationLower.includes('ras al khaimah') || locationLower.includes('rak')) return 'Ras Al Khaimah';
  if (locationLower.includes('fujairah')) return 'Fujairah';
  if (locationLower.includes('umm al quwain') || locationLower.includes('uaq')) return 'Umm Al Quwain';
  
  return 'Other';
};

// Helper function to extract area from location
export const getLocationArea = (location) => {
  if (!location) return 'Not Specified';
  
  // Extract area from location string (assuming format like "Downtown Dubai, Dubai" or "Marina, Dubai")
  const parts = location.split(',');
  return parts[0]?.trim() || location;
};

// Enhanced tracking with custom dimensions
export const trackPropertyViewWithDimensions = (propertyId, propertyData = {}) => {
  try {
    const customDimensions = {
      property_type: propertyData.propertyType || 'Not Specified',
      listing_type: propertyData.listingType || 'Not Specified',
      location_emirate: getEmirate(propertyData.location),
      location_area: getLocationArea(propertyData.location),
      price_range: getPriceRange(propertyData.price),
      bedroom_count: propertyData.bedrooms ? `${propertyData.bedrooms} Bedrooms` : 'Not Specified',
      bathroom_count: propertyData.bathrooms ? `${propertyData.bathrooms} Bathrooms` : 'Not Specified',
      property_size_range: getPropertySizeRange(propertyData.area)
    };

    const eventData = {
      event: 'view_item_enhanced',
      ecommerce: {
        currency: 'AED',
        value: propertyData.price || 0,
        items: [{
          item_id: propertyId,
          item_name: propertyData.title || 'Property',
          item_category: propertyData.propertyType || 'Property',
          item_category2: propertyData.listingType || 'Unknown',
          item_category3: propertyData.location || 'UAE',
          price: propertyData.price || 0,
          quantity: 1
        }]
      },
      property_id: propertyId,
      ...customDimensions,
      // Additional metrics
      property_value_per_sqft: propertyData.price && propertyData.area ? 
        Math.round(propertyData.price / propertyData.area) : 0,
      days_on_market: propertyData.daysOnMarket || 0,
      view_count: propertyData.viewCount || 0
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property view with dimensions:', error);
  }
};

// Enhanced search tracking with custom dimensions
export const trackSearchWithDimensions = (searchTerm, searchData = {}) => {
  try {
    const customDimensions = {
      property_type: searchData.propertyType || 'All Types',
      listing_type: searchData.listingType || 'All Listings',
      location_emirate: getEmirate(searchData.location),
      location_area: getLocationArea(searchData.location),
      price_range: searchData.minPrice || searchData.maxPrice ? 
        `${searchData.minPrice || 0} - ${searchData.maxPrice || 'Max'} AED` : 'Any Price',
      bedroom_count: searchData.bedrooms || 'Any',
      bathroom_count: searchData.bathrooms || 'Any',
      property_size_range: searchData.areaMin || searchData.areaMax ? 
        `${searchData.areaMin || 0} - ${searchData.areaMax || 'Max'} sqft` : 'Any Size',
      search_intent: determineSearchIntent(searchData)
    };

    const eventData = {
      event: 'search_enhanced',
      search_term: searchTerm,
      search_results: searchData.resultsCount || 0,
      ...customDimensions,
      // Search metrics
      search_filters_count: Object.keys(searchData).filter(key => 
        searchData[key] && searchData[key] !== '' && searchData[key] !== 'Any'
      ).length,
      search_specificity: calculateSearchSpecificity(searchData)
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking search with dimensions:', error);
  }
};

// Helper function to determine search intent
const determineSearchIntent = (searchData) => {
  if (searchData.listingType === 'buy') return 'Purchase Intent';
  if (searchData.listingType === 'rent') return 'Rental Intent';
  if (searchData.listingType === 'sell') return 'Selling Intent';
  if (searchData.propertyType === 'commercial') return 'Commercial Intent';
  if (searchData.propertyType === 'off-plan') return 'Investment Intent';
  return 'General Browsing';
};

// Helper function to calculate search specificity score
const calculateSearchSpecificity = (searchData) => {
  let score = 0;
  
  if (searchData.propertyType && searchData.propertyType !== 'Any') score += 1;
  if (searchData.listingType && searchData.listingType !== 'Any') score += 1;
  if (searchData.location) score += 2;
  if (searchData.minPrice || searchData.maxPrice) score += 2;
  if (searchData.bedrooms) score += 1;
  if (searchData.bathrooms) score += 1;
  if (searchData.areaMin || searchData.areaMax) score += 1;
  
  if (score <= 2) return 'Low Specificity';
  if (score <= 5) return 'Medium Specificity';
  return 'High Specificity';
};

// Track user behavior patterns with custom metrics
export const trackUserBehaviorMetrics = (behaviorData = {}) => {
  try {
    const eventData = {
      event: 'user_behavior_analysis',
      session_duration: behaviorData.sessionDuration || 0,
      pages_viewed: behaviorData.pagesViewed || 0,
      properties_viewed: behaviorData.propertiesViewed || 0,
      searches_performed: behaviorData.searchesPerformed || 0,
      filters_used: behaviorData.filtersUsed || 0,
      favorites_added: behaviorData.favoritesAdded || 0,
      inquiries_made: behaviorData.inquiriesMade || 0,
      user_engagement_score: calculateEngagementScore(behaviorData),
      user_intent_score: calculateIntentScore(behaviorData)
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking user behavior metrics:', error);
  }
};

// Helper function to calculate engagement score
const calculateEngagementScore = (behaviorData) => {
  let score = 0;
  
  score += (behaviorData.sessionDuration || 0) / 60; // Minutes to points
  score += (behaviorData.pagesViewed || 0) * 2;
  score += (behaviorData.propertiesViewed || 0) * 3;
  score += (behaviorData.searchesPerformed || 0) * 2;
  score += (behaviorData.filtersUsed || 0) * 1;
  score += (behaviorData.favoritesAdded || 0) * 5;
  score += (behaviorData.inquiriesMade || 0) * 10;
  
  return Math.round(score);
};

// Helper function to calculate purchase intent score
const calculateIntentScore = (behaviorData) => {
  let score = 0;
  
  if (behaviorData.propertiesViewed > 5) score += 2;
  if (behaviorData.searchesPerformed > 3) score += 2;
  if (behaviorData.filtersUsed > 2) score += 1;
  if (behaviorData.favoritesAdded > 0) score += 3;
  if (behaviorData.inquiriesMade > 0) score += 5;
  if (behaviorData.sessionDuration > 600) score += 2; // More than 10 minutes
  
  if (score <= 3) return 'Low Intent';
  if (score <= 8) return 'Medium Intent';
  return 'High Intent';
};

// Track property market metrics
export const trackPropertyMarketMetrics = (propertyData = {}) => {
  try {
    const eventData = {
      event: 'property_market_analysis',
      property_id: propertyData.id,
      market_segment: determineMarketSegment(propertyData),
      price_per_sqft: propertyData.price && propertyData.area ? 
        Math.round(propertyData.price / propertyData.area) : 0,
      market_position: determineMarketPosition(propertyData),
      property_age: propertyData.yearBuilt ? new Date().getFullYear() - propertyData.yearBuilt : 0,
      amenities_count: propertyData.amenities ? propertyData.amenities.length : 0,
      location_score: calculateLocationScore(propertyData.location),
      investment_potential: calculateInvestmentPotential(propertyData)
    };

    sendGTMEvent(eventData);
  } catch (error) {
    console.error('Error tracking property market metrics:', error);
  }
};

// Helper functions for market analysis
const determineMarketSegment = (propertyData) => {
  const price = propertyData.price || 0;
  
  if (price < 1000000) return 'Entry Level';
  if (price < 3000000) return 'Mid Market';
  if (price < 10000000) return 'Premium';
  return 'Luxury';
};

const determineMarketPosition = (propertyData) => {
  // This would typically compare against market averages
  // For now, using basic logic
  const pricePerSqft = propertyData.price && propertyData.area ? 
    propertyData.price / propertyData.area : 0;
  
  if (pricePerSqft < 800) return 'Below Market';
  if (pricePerSqft < 1200) return 'Market Rate';
  return 'Above Market';
};

const calculateLocationScore = (location) => {
  if (!location) return 0;
  
  const locationLower = location.toLowerCase();
  
  // Premium locations get higher scores
  if (locationLower.includes('downtown') || locationLower.includes('marina') || 
      locationLower.includes('palm jumeirah') || locationLower.includes('business bay')) {
    return 10;
  }
  
  if (locationLower.includes('dubai') || locationLower.includes('abu dhabi')) {
    return 8;
  }
  
  return 5; // Default score
};

const calculateInvestmentPotential = (propertyData) => {
  let score = 0;
  
  if (propertyData.listingType === 'off-plan') score += 3;
  if (propertyData.propertyType === 'apartment') score += 2;
  if (propertyData.amenities && propertyData.amenities.length > 10) score += 2;
  
  const locationScore = calculateLocationScore(propertyData.location);
  score += Math.floor(locationScore / 2);
  
  if (score <= 3) return 'Low Potential';
  if (score <= 6) return 'Medium Potential';
  return 'High Potential';
};