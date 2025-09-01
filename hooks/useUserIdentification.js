"use client";
import { useCallback } from 'react';
import analyticsService from '@/utils/analytics';
import { getVisitorId, getSessionId } from '@/components/analytics/UserTracker';

/**
 * Custom hook for user identification and tracking
 * Provides methods to identify users and track user-specific events
 */
export function useUserIdentification() {
  // Get current user identification data
  const getCurrentUserData = useCallback(() => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const userId = localStorage.getItem('earlybirds_user_id');
    const isAuthenticated = localStorage.getItem('earlybirds_user_authenticated') === 'true';

    return {
      visitorId,
      sessionId,
      userId,
      isAuthenticated
    };
  }, []);

  // Identify a user with traits
  const identifyUser = useCallback((userId, traits = {}) => {
    const { visitorId, sessionId } = getCurrentUserData();
    
    const userTraits = {
      visitorId,
      sessionId,
      identifiedAt: new Date().toISOString(),
      ...traits
    };

    analyticsService.identify(userId, userTraits);
  }, [getCurrentUserData]);

  // Track user preferences
  const trackUserPreferences = useCallback((preferences = {}) => {
    const userData = getCurrentUserData();
    
    analyticsService.track('User Preferences Updated', {
      ...userData,
      preferences,
      timestamp: new Date().toISOString()
    });
  }, [getCurrentUserData]);

  // Track user interests based on property views
  const trackUserInterests = useCallback((propertyData = {}) => {
    const userData = getCurrentUserData();
    
    // Extract interest signals from property data
    const interests = {
      propertyType: propertyData.propertyType,
      priceRange: propertyData.price ? getPriceRange(propertyData.price) : null,
      location: propertyData.location || propertyData.area,
      bedrooms: propertyData.bedrooms,
      amenities: propertyData.amenities || [],
      viewedAt: new Date().toISOString()
    };

    analyticsService.track('User Interest Signal', {
      ...userData,
      interests,
      propertyId: propertyData.id
    });

    // Update user traits with interests
    const existingInterests = JSON.parse(localStorage.getItem('earlybirds_user_interests') || '[]');
    existingInterests.push(interests);
    
    // Keep only last 50 interests to avoid storage bloat
    const recentInterests = existingInterests.slice(-50);
    localStorage.setItem('earlybirds_user_interests', JSON.stringify(recentInterests));

    // Analyze and update user profile with aggregated interests
    updateUserProfile(recentInterests);
  }, [getCurrentUserData]);

  // Track user behavior patterns
  const trackUserBehavior = useCallback((behaviorType, behaviorData = {}) => {
    const userData = getCurrentUserData();
    
    analyticsService.track('User Behavior', {
      ...userData,
      behaviorType,
      behaviorData,
      timestamp: new Date().toISOString()
    });
  }, [getCurrentUserData]);

  // Track user journey milestones
  const trackUserMilestone = useCallback((milestone, milestoneData = {}) => {
    const userData = getCurrentUserData();
    
    analyticsService.track('User Milestone', {
      ...userData,
      milestone,
      milestoneData,
      timestamp: new Date().toISOString()
    });

    // Store milestone in user's journey
    const milestones = JSON.parse(localStorage.getItem('earlybirds_user_milestones') || '[]');
    milestones.push({
      milestone,
      timestamp: new Date().toISOString(),
      ...milestoneData
    });
    localStorage.setItem('earlybirds_user_milestones', JSON.stringify(milestones));
  }, [getCurrentUserData]);

  // Track user engagement score
  const trackEngagementScore = useCallback((action, score = 1) => {
    const userData = getCurrentUserData();
    
    // Get current engagement score
    const currentScore = parseInt(localStorage.getItem('earlybirds_engagement_score') || '0');
    const newScore = currentScore + score;
    
    localStorage.setItem('earlybirds_engagement_score', newScore.toString());
    
    analyticsService.track('Engagement Score Updated', {
      ...userData,
      action,
      scoreChange: score,
      totalScore: newScore,
      timestamp: new Date().toISOString()
    });
  }, [getCurrentUserData]);

  // Get user segmentation data
  const getUserSegment = useCallback(() => {
    const interests = JSON.parse(localStorage.getItem('earlybirds_user_interests') || '[]');
    const milestones = JSON.parse(localStorage.getItem('earlybirds_user_milestones') || '[]');
    const engagementScore = parseInt(localStorage.getItem('earlybirds_engagement_score') || '0');
    const visitCount = parseInt(localStorage.getItem('earlybirds_visit_count') || '1');
    
    // Determine user segment based on behavior
    let segment = 'new_visitor';
    
    if (visitCount > 5) segment = 'returning_visitor';
    if (engagementScore > 50) segment = 'engaged_user';
    if (milestones.some(m => m.milestone === 'contact_form_submitted')) segment = 'lead';
    if (milestones.some(m => m.milestone === 'property_inquiry')) segment = 'hot_lead';
    
    return {
      segment,
      engagementScore,
      visitCount,
      interestCount: interests.length,
      milestoneCount: milestones.length
    };
  }, []);

  return {
    getCurrentUserData,
    identifyUser,
    trackUserPreferences,
    trackUserInterests,
    trackUserBehavior,
    trackUserMilestone,
    trackEngagementScore,
    getUserSegment
  };
}

// Helper function to categorize price ranges
function getPriceRange(price) {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  
  if (numPrice < 500000) return 'under_500k';
  if (numPrice < 1000000) return '500k_1m';
  if (numPrice < 2000000) return '1m_2m';
  if (numPrice < 5000000) return '2m_5m';
  return 'over_5m';
}

// Helper function to update user profile with aggregated interests
function updateUserProfile(interests) {
  if (!interests.length) return;
  
  // Aggregate interests
  const aggregated = {
    preferredPropertyTypes: {},
    preferredLocations: {},
    preferredPriceRanges: {},
    preferredBedrooms: {},
    commonAmenities: {}
  };
  
  interests.forEach(interest => {
    if (interest.propertyType) {
      aggregated.preferredPropertyTypes[interest.propertyType] = 
        (aggregated.preferredPropertyTypes[interest.propertyType] || 0) + 1;
    }
    
    if (interest.location) {
      aggregated.preferredLocations[interest.location] = 
        (aggregated.preferredLocations[interest.location] || 0) + 1;
    }
    
    if (interest.priceRange) {
      aggregated.preferredPriceRanges[interest.priceRange] = 
        (aggregated.preferredPriceRanges[interest.priceRange] || 0) + 1;
    }
    
    if (interest.bedrooms) {
      aggregated.preferredBedrooms[interest.bedrooms] = 
        (aggregated.preferredBedrooms[interest.bedrooms] || 0) + 1;
    }
    
    if (interest.amenities && Array.isArray(interest.amenities)) {
      interest.amenities.forEach(amenity => {
        aggregated.commonAmenities[amenity] = 
          (aggregated.commonAmenities[amenity] || 0) + 1;
      });
    }
  });
  
  // Store aggregated profile
  localStorage.setItem('earlybirds_user_profile', JSON.stringify(aggregated));
  
  // Update analytics identification with profile data
  const userData = {
    visitorId: getVisitorId(),
    sessionId: getSessionId()
  };
  
  analyticsService.identify(userData.visitorId, {
    userProfile: aggregated,
    profileUpdatedAt: new Date().toISOString()
  });
}

export default useUserIdentification;