
import React from "react";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
//import Services from '@/components/services/Services'
//import Cta from "@/components/common/Cta";
import WelcomeSection from "@/components/services/WelcomeSection";
//import Hero from "@/components/services/Hero";
import CommercialPropertiesAbout from "@/components/services/CommercialPropertiesAbout";
import HolidayHomesAbout from "@/components/services/HolidayHomesAbout";
import MortgageAbout from "@/components/services/MortgageAbout";
import PropertyManagementAbout from "@/components/services/PropertyManagementAbout";

export const metadata = {
  title: "Services || Earlybirds - Real Estate",
  description: "Earlybirds - Real Estate",
};

export default function ServicesPage() {
  {
    /*useEffect(() => {
    // Handle hash navigation
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);*/
  }

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content mb-10">
          <WelcomeSection />
          {/*<Services />*/}
          <div id="commercial-properties">
            <CommercialPropertiesAbout />
          </div>
          <div id="holiday-homes">
            <HolidayHomesAbout />
          </div>
          <div id="mortgage">
            <MortgageAbout />
          </div>
          <div id="property-management">
            <PropertyManagementAbout />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
