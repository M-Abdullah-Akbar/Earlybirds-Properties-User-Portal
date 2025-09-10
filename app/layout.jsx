"use client";
import { useEffect, Suspense } from "react";
import "../public/main.scss";
import "odometer/themes/odometer-theme-default.css"; // Import theme
import "photoswipe/style.css";
import "rc-slider/assets/index.css";
import "../public/css/scroll-fix.css"; // Import scroll fix styles
import "../public/css/testimonial-google-icon.css"; // Import Google icon styles

import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import SettingsHandler from "@/components/common/SettingsHandler";
import FloatingWhatsapp from "@/components/common/FloatingWhatsapp";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";

import PageTracker from "@/components/analytics/PageTracker";
import UserTracker from "@/components/analytics/UserTracker";
import ConsentManager from "@/components/analytics/ConsentManager";
import EventTracker from "@/components/analytics/EventTracker";
// Monitoring will be dynamically imported for client-side usage
// Google Ads will be dynamically imported for client-side usage
import Script from "next/script";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  
  if (typeof window !== "undefined") {
    import("bootstrap/dist/js/bootstrap.esm").then((module) => {
      // Module is imported, you can access any exported functionality if
    });
  }
  useEffect(() => {
    // Close any open modal
    const bootstrap = require("bootstrap"); // dynamically import bootstrap
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Close any open offcanvas
    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const WOW = require("@/utils/wow");
    const wow = new WOW.default({
      animateClass: "animated",
      offset: 100,
      mobile: true,
      live: false,
    });
    wow.init();
  }, [pathname]);
  useEffect(() => {
    const handleSticky = () => {
      const navbar = document.querySelector(".header");
      if (navbar) {
        if (window.scrollY > 120) {
          navbar.classList.add("fixed");
          navbar.classList.add("header-sticky");
        } else {
          navbar.classList.remove("fixed");
          navbar.classList.remove("header-sticky");
        }
        if (window.scrollY > 300) {
          navbar.classList.add("is-sticky");
        } else {
          navbar.classList.remove("is-sticky");
        }
      }
    };

    window.addEventListener("scroll", handleSticky);
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Earlybirds Properties - UAE Real Estate</title>
        <meta name="description" content="Find your dream property in UAE with Earlybirds Properties" />
        
        {/* Initialize dataLayer before GTM */}
        <Script id="gtm-datalayer-init" strategy="beforeInteractive">
          {`
            // Initialize dataLayer with enhanced user and session data
            window.dataLayer = window.dataLayer || [];
            
            // Enhanced dataLayer initialization with comprehensive tracking data
            window.dataLayer.push({
              'event': 'datalayer_initialized',
              'site_name': 'Earlybirds Properties',
              'site_version': '1.0.0',
              'environment': '${process.env.NODE_ENV || 'production'}',
              'page_type': 'website',
              'content_group1': 'Real Estate Portal',
              'content_group2': 'User Portal',
              'user_properties': {
                'user_type': 'anonymous',
                'session_start': new Date().toISOString(),
                'device_type': /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
                'browser_name': navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                               navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                               navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
                'screen_resolution': screen.width + 'x' + screen.height,
                'viewport_size': window.innerWidth + 'x' + window.innerHeight,
                'color_depth': screen.colorDepth,
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
                'language': navigator.language,
                'platform': navigator.platform
              },
              'technical_properties': {
                'connection_type': navigator.connection ? navigator.connection.effectiveType : 'unknown',
                'cookie_enabled': navigator.cookieEnabled,
                'java_enabled': navigator.javaEnabled ? navigator.javaEnabled() : false,
                'referrer': document.referrer || 'direct'
              }
            });
            
            // Initialize monitoring systems
            if (typeof window !== 'undefined') {
              // Dynamic import to ensure client-side availability
              import('@/utils/monitoring').then(({ initializeMonitoring }) => {
                initializeMonitoring();
              }).catch(err => console.warn('Monitoring initialization failed:', err));
              
              import('@/utils/googleAds').then((googleAdsModule) => {
                const googleAds = googleAdsModule.default;
                googleAds.setupConversionTracking();
              }).catch(err => console.warn('Google Ads initialization failed:', err));
            }
            
            // Performance tracking initialization
            window.dataLayer.push({
              'event': 'performance_init',
              'performance_data': {
                'navigation_type': performance.navigation ? performance.navigation.type : 'unknown',
                'connection_downlink': navigator.connection ? navigator.connection.downlink : 'unknown',
                'memory': navigator.deviceMemory || 'unknown'
              }
            });
          `}
        </Script>
        
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        
        {/* Fallback Google Analytics (if GTM fails) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-fallback" strategy="afterInteractive">
          {`
            window.gtag = window.gtag || function(){dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'user_type',
                'custom_parameter_2': 'session_duration',
                'custom_parameter_3': 'device_category'
              }
            });
          `}
        </Script>
      </head>
      <body className="popup-loader">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <AnalyticsProvider>
          <Suspense fallback={null}>
            <PageTracker />
          </Suspense>
          <UserTracker />
          <EventTracker />
          <ConsentManager />
          {children}
          <MobileMenu />
          <BackToTop />
          <SettingsHandler />
          <FloatingWhatsapp />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
