"use client";
import { useEffect } from "react";
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
import Script from "next/script";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
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
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S4QBVTS4KN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S4QBVTS4KN');
        `}
      </Script>
      <body className="popup-loader">
        <AnalyticsProvider>
          <PageTracker />
          <UserTracker />
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
