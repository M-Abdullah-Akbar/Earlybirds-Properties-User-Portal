"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import Services from '@/components/services/Services';
import WelcomeSection from "@/components/services/WelcomeSection";

export default function ServicesClient() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle hash scrolling when page loads or hash changes
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const id = hash.substring(1);
        
        // Wait for the element to be available in the DOM
        const scrollToElement = () => {
          const element = document.getElementById(id);
          
          if (element) {
            // Calculate header height dynamically
            const header = document.querySelector(".header");
            let headerHeight = 120; // Default fallback
            
            if (header) {
              // Get the actual height of the header
              const headerRect = header.getBoundingClientRect();
              headerHeight = headerRect.height;
              
              // If header is sticky/fixed, use its height, otherwise add some padding
              if (header.classList.contains("header-sticky") || 
                  header.classList.contains("fixed") || 
                  header.classList.contains("is-sticky")) {
                headerHeight = headerRect.height;
              } else {
                // If not sticky yet, still account for potential sticky header
                headerHeight = Math.max(headerRect.height, 120);
              }
            }
            
            // Calculate scroll position with header offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // Extra 20px padding
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
            return true;
          }
          return false;
        };

        // Try immediately
        if (!scrollToElement()) {
          // If element not found, try after a short delay (for client-side navigation)
          const timeoutId = setTimeout(() => {
            if (!scrollToElement()) {
              // Try one more time after animations might have loaded
              setTimeout(scrollToElement, 300);
            }
          }, 100);
          
          return () => clearTimeout(timeoutId);
        }
      }
    };

    // Handle initial load - wait for page to be fully rendered
    const timeoutId = setTimeout(handleHashScroll, 150);

    // Handle hash changes (e.g., when clicking links on the same page)
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [pathname]);

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content mb-10">
          <WelcomeSection />
          <Services />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}

