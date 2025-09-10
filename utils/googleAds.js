/**
 * Google Ads Conversion Tracking Utility
 * Handles conversion tracking through Google Tag Manager
 */

import { pushToDataLayer } from './gtm';
import { getUserContext } from './customDimensions';

// Google Ads conversion types
const CONVERSION_TYPES = {
  LEAD_GENERATION: 'lead_generation',
  PROPERTY_INQUIRY: 'property_inquiry',
  TOUR_BOOKING: 'tour_booking',
  CONSULTATION_BOOKING: 'consultation_booking',
  PHONE_CALL: 'phone_call',
  EMAIL_CONTACT: 'email_contact',
  FORM_SUBMISSION: 'form_submission',
  PROPERTY_VIEW: 'property_view',
  WISHLIST_ADD: 'wishlist_add',
  MORTGAGE_CALCULATOR: 'mortgage_calculator',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  ACCOUNT_REGISTRATION: 'account_registration'
};

// Conversion value calculations
const calculateConversionValue = (conversionType, data = {}) => {
  const { propertyPrice, propertyType, userType } = data;
  
  switch (conversionType) {
    case CONVERSION_TYPES.PROPERTY_INQUIRY:
      // Base value on property price (0.1% of property value)
      return propertyPrice ? Math.min(propertyPrice * 0.001, 1000) : 50;
    
    case CONVERSION_TYPES.TOUR_BOOKING:
      // Higher value for tour bookings
      return propertyPrice ? Math.min(propertyPrice * 0.002, 2000) : 100;
    
    case CONVERSION_TYPES.CONSULTATION_BOOKING:
      return 150;
    
    case CONVERSION_TYPES.LEAD_GENERATION:
      return userType === 'premium' ? 200 : 75;
    
    case CONVERSION_TYPES.PHONE_CALL:
      return 25;
    
    case CONVERSION_TYPES.EMAIL_CONTACT:
      return 20;
    
    case CONVERSION_TYPES.ACCOUNT_REGISTRATION:
      return 30;
    
    case CONVERSION_TYPES.NEWSLETTER_SIGNUP:
      return 10;
    
    default:
      return 1;
  }
};

// Track Google Ads conversion
export const trackConversion = (conversionType, conversionData = {}) => {
  try {
    const {
      conversionId,
      conversionLabel,
      conversionValue,
      currency = 'USD',
      propertyId,
      propertyPrice,
      propertyType,
      customValue,
      ...additionalData
    } = conversionData;
    
    // Calculate conversion value if not provided
    const finalValue = customValue || conversionValue || calculateConversionValue(conversionType, {
      propertyPrice,
      propertyType,
      userType: getUserContext().user_type
    });
    
    // Prepare conversion data
    const conversionPayload = {
      event: 'conversion',
      conversion_type: conversionType,
      conversion_id: conversionId,
      conversion_label: conversionLabel,
      value: finalValue,
      currency: currency,
      transaction_id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...getUserContext(),
      ...additionalData
    };
    
    // Add property-specific data if available
    if (propertyId) {
      conversionPayload.property_id = propertyId;
      conversionPayload.property_price = propertyPrice;
      conversionPayload.property_type = propertyType;
    }
    
    // Push to data layer
    pushToDataLayer(conversionPayload);
    
    // Also send as gtag event for direct tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId ? `${conversionId}/${conversionLabel}` : undefined,
        value: finalValue,
        currency: currency,
        transaction_id: conversionPayload.transaction_id
      });
    }
    
    console.log('Conversion tracked:', conversionPayload);
    
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
};

// Track lead generation conversion
export const trackLeadGeneration = (leadData = {}) => {
  const {
    source = 'website',
    medium = 'organic',
    campaign,
    leadType = 'general',
    propertyId,
    propertyPrice,
    propertyType,
    formName,
    ...additionalData
  } = leadData;
  
  trackConversion(CONVERSION_TYPES.LEAD_GENERATION, {
    lead_source: source,
    lead_medium: medium,
    lead_campaign: campaign,
    lead_type: leadType,
    form_name: formName,
    propertyId,
    propertyPrice,
    propertyType,
    ...additionalData
  });
};

// Track property inquiry conversion
export const trackPropertyInquiryConversion = (inquiryData = {}) => {
  const {
    propertyId,
    propertyPrice,
    propertyType,
    inquiryType = 'general',
    contactMethod = 'form',
    ...additionalData
  } = inquiryData;
  
  trackConversion(CONVERSION_TYPES.PROPERTY_INQUIRY, {
    propertyId,
    propertyPrice,
    propertyType,
    inquiry_type: inquiryType,
    contact_method: contactMethod,
    ...additionalData
  });
};

// Track tour booking conversion
export const trackTourBookingConversion = (tourData = {}) => {
  const {
    propertyId,
    propertyPrice,
    propertyType,
    tourType = 'physical',
    tourDate,
    tourTime,
    ...additionalData
  } = tourData;
  
  trackConversion(CONVERSION_TYPES.TOUR_BOOKING, {
    propertyId,
    propertyPrice,
    propertyType,
    tour_type: tourType,
    tour_date: tourDate,
    tour_time: tourTime,
    ...additionalData
  });
};

// Track consultation booking conversion
export const trackConsultationBookingConversion = (consultationData = {}) => {
  const {
    consultationType = 'general',
    consultationDate,
    consultationTime,
    consultationMethod = 'phone',
    ...additionalData
  } = consultationData;
  
  trackConversion(CONVERSION_TYPES.CONSULTATION_BOOKING, {
    consultation_type: consultationType,
    consultation_date: consultationDate,
    consultation_time: consultationTime,
    consultation_method: consultationMethod,
    ...additionalData
  });
};

// Track phone call conversion
export const trackPhoneCallConversion = (callData = {}) => {
  const {
    phoneNumber,
    callSource = 'website',
    propertyId,
    ...additionalData
  } = callData;
  
  trackConversion(CONVERSION_TYPES.PHONE_CALL, {
    phone_number: phoneNumber,
    call_source: callSource,
    propertyId,
    ...additionalData
  });
};

// Track email contact conversion
export const trackEmailContactConversion = (emailData = {}) => {
  const {
    emailAddress,
    emailSubject,
    emailSource = 'website',
    propertyId,
    ...additionalData
  } = emailData;
  
  trackConversion(CONVERSION_TYPES.EMAIL_CONTACT, {
    email_address: emailAddress,
    email_subject: emailSubject,
    email_source: emailSource,
    propertyId,
    ...additionalData
  });
};

// Track form submission conversion
export const trackFormSubmissionConversion = (formData = {}) => {
  const {
    formName,
    formType = 'contact',
    formFields = [],
    propertyId,
    ...additionalData
  } = formData;
  
  trackConversion(CONVERSION_TYPES.FORM_SUBMISSION, {
    form_name: formName,
    form_type: formType,
    form_fields: formFields.join(','),
    propertyId,
    ...additionalData
  });
};

// Track account registration conversion
export const trackAccountRegistrationConversion = (registrationData = {}) => {
  const {
    registrationMethod = 'email',
    userType = 'buyer',
    referralSource,
    ...additionalData
  } = registrationData;
  
  trackConversion(CONVERSION_TYPES.ACCOUNT_REGISTRATION, {
    registration_method: registrationMethod,
    user_type: userType,
    referral_source: referralSource,
    ...additionalData
  });
};

// Track newsletter signup conversion
export const trackNewsletterSignupConversion = (signupData = {}) => {
  const {
    signupSource = 'website',
    signupLocation = 'footer',
    emailAddress,
    ...additionalData
  } = signupData;
  
  trackConversion(CONVERSION_TYPES.NEWSLETTER_SIGNUP, {
    signup_source: signupSource,
    signup_location: signupLocation,
    email_address: emailAddress,
    ...additionalData
  });
};

// Enhanced conversion tracking with attribution
export const trackConversionWithAttribution = (conversionType, conversionData = {}) => {
  try {
    // Get attribution data from URL parameters or session storage
    const urlParams = new URLSearchParams(window.location.search);
    const attributionData = {
      utm_source: urlParams.get('utm_source') || sessionStorage.getItem('utm_source'),
      utm_medium: urlParams.get('utm_medium') || sessionStorage.getItem('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign'),
      utm_term: urlParams.get('utm_term') || sessionStorage.getItem('utm_term'),
      utm_content: urlParams.get('utm_content') || sessionStorage.getItem('utm_content'),
      gclid: urlParams.get('gclid') || sessionStorage.getItem('gclid'),
      fbclid: urlParams.get('fbclid') || sessionStorage.getItem('fbclid')
    };
    
    // Store attribution data for future conversions
    Object.entries(attributionData).forEach(([key, value]) => {
      if (value) {
        sessionStorage.setItem(key, value);
      }
    });
    
    // Track conversion with attribution data
    trackConversion(conversionType, {
      ...conversionData,
      ...attributionData
    });
    
  } catch (error) {
    console.error('Error tracking conversion with attribution:', error);
    // Fallback to regular conversion tracking
    trackConversion(conversionType, conversionData);
  }
};

// Utility to set up conversion tracking for common elements
export const setupConversionTracking = () => {
  if (typeof window === 'undefined') return;
  
  // Track phone number clicks
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[href^="tel:"]');
    if (target) {
      const phoneNumber = target.href.replace('tel:', '');
      trackPhoneCallConversion({ phoneNumber, callSource: 'website_link' });
    }
  });
  
  // Track email clicks
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[href^="mailto:"]');
    if (target) {
      const emailAddress = target.href.replace('mailto:', '');
      trackEmailContactConversion({ emailAddress, emailSource: 'website_link' });
    }
  });
};

// Export conversion types for use in components
export { CONVERSION_TYPES };

// Export all tracking functions
export default {
  trackConversion,
  trackLeadGeneration,
  trackPropertyInquiryConversion,
  trackTourBookingConversion,
  trackConsultationBookingConversion,
  trackPhoneCallConversion,
  trackEmailContactConversion,
  trackFormSubmissionConversion,
  trackAccountRegistrationConversion,
  trackNewsletterSignupConversion,
  trackConversionWithAttribution,
  setupConversionTracking,
  CONVERSION_TYPES
};