"use client";
import { useEffect } from 'react';
import analyticsService from '@/utils/analytics';
import { getVisitorId, getSessionId } from './UserTracker';

/**
 * AuthTracker component handles user authentication events
 * and updates analytics identification when users log in/out
 */
export default function AuthTracker({ user = null, isAuthenticated = false }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    if (isAuthenticated && user) {
      // User is logged in - identify with user data
      const userTraits = {
        email: user.email,
        name: user.name || user.fullName,
        userId: user.id || user._id,
        userType: user.userType || 'customer',
        phone: user.phone,
        createdAt: user.createdAt,
        lastLogin: new Date().toISOString(),
        visitorId,
        sessionId,
        isAuthenticated: true
      };

      // Remove undefined values
      Object.keys(userTraits).forEach(key => {
        if (userTraits[key] === undefined || userTraits[key] === null) {
          delete userTraits[key];
        }
      });

      analyticsService.identify(user.id || user._id || user.email, userTraits);

      // Track login event
      analyticsService.track('User Login', {
        userId: user.id || user._id,
        email: user.email,
        userType: user.userType || 'customer',
        loginMethod: 'email', // You can customize this based on your auth method
        visitorId,
        sessionId
      });

      // Store user info in localStorage for persistence
      localStorage.setItem('earlybirds_user_id', user.id || user._id || user.email);
      localStorage.setItem('earlybirds_user_authenticated', 'true');
    } else {
      // User is not logged in - identify as anonymous visitor
      const anonymousTraits = {
        visitorId,
        sessionId,
        isAuthenticated: false,
        userType: 'anonymous'
      };

      analyticsService.identify(visitorId, anonymousTraits);

      // Check if user was previously logged in (logout event)
      const wasAuthenticated = localStorage.getItem('earlybirds_user_authenticated') === 'true';
      const previousUserId = localStorage.getItem('earlybirds_user_id');

      if (wasAuthenticated && previousUserId) {
        // Track logout event
        analyticsService.track('User Logout', {
          userId: previousUserId,
          visitorId,
          sessionId
        });
      }

      // Clear user info from localStorage
      localStorage.removeItem('earlybirds_user_id');
      localStorage.removeItem('earlybirds_user_authenticated');
    }
  }, [user, isAuthenticated]);

  // This component doesn't render anything
  return null;
}

/**
 * Hook to track user authentication state changes
 */
export function useAuthTracking() {
  const trackUserAction = (action, userData = {}) => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const userId = localStorage.getItem('earlybirds_user_id');

    analyticsService.track(`User ${action}`, {
      userId,
      visitorId,
      sessionId,
      ...userData
    });
  };

  const trackRegistration = (user, registrationMethod = 'email') => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    analyticsService.track('User Registration', {
      userId: user.id || user._id,
      email: user.email,
      name: user.name || user.fullName,
      userType: user.userType || 'customer',
      registrationMethod,
      visitorId,
      sessionId
    });

    // Also identify the new user
    analyticsService.identify(user.id || user._id || user.email, {
      email: user.email,
      name: user.name || user.fullName,
      userId: user.id || user._id,
      userType: user.userType || 'customer',
      createdAt: user.createdAt || new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      visitorId,
      sessionId,
      isAuthenticated: true
    });
  };

  const trackPasswordReset = (email) => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    analyticsService.track('Password Reset Requested', {
      email,
      visitorId,
      sessionId
    });
  };

  const trackProfileUpdate = (updatedFields = []) => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const userId = localStorage.getItem('earlybirds_user_id');

    analyticsService.track('Profile Updated', {
      userId,
      updatedFields,
      visitorId,
      sessionId
    });
  };

  return {
    trackUserAction,
    trackRegistration,
    trackPasswordReset,
    trackProfileUpdate
  };
}