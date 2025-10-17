"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React, { useEffect, useMemo } from "react";
//import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";
import BuyAbout from "@/components/buy/About";
import Faqs from "@/components/common/Faqs";
import CtaEnhanced from "@/components/common/CtaEnhanced";
import { setupPageTracking } from "@/utils/pageTracking";

export default function BuyClient({ propertyType = "", emirate = "" }) {

  // Memoize initialFilters to prevent unnecessary re-renders
  const initialFilters = useMemo(() => {
    const filters = {};
    if (propertyType) filters.propertyType = propertyType;
    if (emirate) filters.emirate = emirate;
    return filters;
  }, [propertyType, emirate]);

  useEffect(() => {
    // Setup comprehensive page tracking for buy page
    const cleanup = setupPageTracking('buy_properties', {
      pageData: {
        page_type: 'listing',
        content_category: 'buy_properties',
        business_unit: 'property_portal',
        initial_property_type: propertyType,
        initial_emirate: emirate
      },
      trackScrollDepth: true,
      trackTimeOnPage: true
    });

    return cleanup;
  }, [propertyType, emirate]);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Properties 
              defaultGrid 
              propertyType="sale" 
              initialFilters={initialFilters}
            />
            <BuyAbout />
            <Faqs pageType="buy" />
            <CtaEnhanced />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}