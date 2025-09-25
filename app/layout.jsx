"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Critical CSS - load immediately (compiled CSS, not SCSS)
import "../public/css/main.css";

// Non-critical CSS - load asynchronously to prevent render blocking
const loadNonCriticalCSS = () => {
  if (typeof window !== "undefined") {
    // Load non-critical CSS asynchronously
    const cssFiles = [
      "/css/odometer-theme-default.css",
      "/css/photoswipe.css", 
      "/css/rc-slider.css",
      "/css/scroll-fix.css",
      "/css/testimonial-google-icon.css"
    ];
    
    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function() { this.media = 'all'; };
      document.head.appendChild(link);
    });
  }
};

import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import SettingsHandler from "@/components/common/SettingsHandler";
import FloatingWhatsapp from "@/components/common/FloatingWhatsapp";
import { GoogleTagManager } from '@next/third-parties/google';
import { trackPageView } from "@/utils/analytics";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Initialize data layer for GTM and load non-critical CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      // Load non-critical CSS after initial render
      loadNonCriticalCSS();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);
  
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://earlybirds-properties.com${pathname}`} />
        
        {/* Enhanced preconnect and dns-prefetch for critical origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.earlybirdsproperties.com" />
        
        {/* Additional preconnects for performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://unpkg.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/css/main.css" as="style" />
        
        {/* Optimize resource loading */}
        <link rel="preload" href="/icons/icomoon/fonts/icomoon.woff?6ufuj" as="font" type="font/woff" crossOrigin="anonymous" />
        
        {/* Preload LCP hero background image */}
        <link 
          rel="preload" 
          href="/images/Buy-and-Rent-Properties-in-Dubai-Earlybird-Properties.jpg" 
          as="image" 
          fetchPriority="high"
        />
        
        {/* GTM Data Layer Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: false
              });
            `,
          }}
        />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body className="popup-loader">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}
        <MobileMenu />
        <BackToTop />
        <SettingsHandler />
        <FloatingWhatsapp />
        
        {/* Additional GTM script for enhanced tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced ecommerce and custom event tracking setup
              window.gtag = window.gtag || function(){dataLayer.push(arguments);};
              
              // Set default parameters for all events
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                custom_map: {
                  'custom_parameter_1': 'property_type',
                  'custom_parameter_2': 'listing_type',
                  'custom_parameter_3': 'location'
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
