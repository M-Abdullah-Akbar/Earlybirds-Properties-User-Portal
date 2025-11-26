"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import SettingsHandler from "@/components/common/SettingsHandler";
import FloatingWhatsapp from "@/components/common/FloatingWhatsapp";
import { trackPageView } from "@/utils/analytics";

// Lazy load heavy dependencies
let bootstrapLoaded = false;
let wowInstance = null;
let wowModulePromise = null;

const loadBootstrap = async () => {
  if (!bootstrapLoaded && typeof window !== "undefined") {
    try {
      await import("bootstrap/dist/js/bootstrap.esm");
      bootstrapLoaded = true;
    } catch (error) {
      console.error("Failed to load Bootstrap:", error);
    }
  }
};

const initWOW = async () => {
  if (typeof window === "undefined") return;

  try {
    if (!wowModulePromise) {
      wowModulePromise = import("@/utils/wow");
    }
    const WOW = await wowModulePromise;
    // Re-create instance on every call so new DOM nodes are registered
    wowInstance = new WOW.default({
      animateClass: "animated",
      offset: 100,
      mobile: true,
      live: false,
    });
    wowInstance.init();
  } catch (error) {
    console.error("Failed to initialize WOW.js:", error);
  }
};

// Load non-critical CSS asynchronously
const loadNonCriticalCSS = () => {
  if (typeof window !== "undefined") {
    // Load other non-critical CSS
    const cssFiles = [
      "/css/odometer-theme-default.css",
      "/css/photoswipe.css",
      "/css/rc-slider.css",
      "/css/scroll-fix.css",
      "/css/testimonial-google-icon.css",
      "/css/lexkit-styles.css",
    ];

    cssFiles.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.media = "print";
      link.onload = function () {
        this.media = "all";
      };
      document.head.appendChild(link);
    });
  }
};

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showNonCritical, setShowNonCritical] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Delay non-critical components to prioritize TBT
    const timer = setTimeout(() => {
      setShowNonCritical(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize data layer for GTM
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }, []);

  // Load non-critical CSS after initial render
  useEffect(() => {
    // Delay CSS loading to prioritize critical rendering
    const timer = setTimeout(() => {
      loadNonCriticalCSS();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Load Bootstrap lazily after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      loadBootstrap();
    }, 3500); // Delayed to 3.5s to prioritize TBT
    return () => clearTimeout(timer);
  }, []);

  // Handle Bootstrap modals and offcanvas on route change
  useEffect(() => {
    const handleRouteChange = async () => {
      // Wait for Bootstrap to be available
      if (bootstrapLoaded || typeof window !== "undefined") {
        try {
          const bootstrap = await import("bootstrap");
          const modalElements = document.querySelectorAll(".modal.show");
          modalElements.forEach((modal) => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
              modalInstance.hide();
            }
          });

          const offcanvasElements =
            document.querySelectorAll(".offcanvas.show");
          offcanvasElements.forEach((offcanvas) => {
            const offcanvasInstance =
              bootstrap.Offcanvas.getInstance(offcanvas);
            if (offcanvasInstance) {
              offcanvasInstance.hide();
            }
          });
        } catch (error) {
          // Bootstrap not loaded yet, ignore
        }
      }
    };

    handleRouteChange();
  }, [pathname]);

  // Initialize / re-run WOW animations on route changes (post hydration)
  useEffect(() => {
    if (!isHydrated) return;
    let timer;
    const frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => {
        initWOW();
      }, 2000); // Delayed to 2s
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isHydrated, pathname]);

  // Optimized sticky header with throttling
  useEffect(() => {
    let ticking = false;

    const handleSticky = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navbar = document.querySelector(".header");
          if (navbar) {
            const scrollY = window.scrollY;
            if (scrollY > 120) {
              navbar.classList.add("fixed", "header-sticky");
            } else {
              navbar.classList.remove("fixed", "header-sticky");
            }
            if (scrollY > 300) {
              navbar.classList.add("is-sticky");
            } else {
              navbar.classList.remove("is-sticky");
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleSticky, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);

  return (
    <>
      {children}
      {showNonCritical && (
        <>
          <MobileMenu />
          <SettingsHandler />
        </>
      )}
      <BackToTop />
      <FloatingWhatsapp />
    </>
  );
}
