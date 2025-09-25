"use client";
//import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React, { useEffect, useMemo } from "react";
import Properties from "@/components/properties/Properties";
import { setupPageTracking } from "@/utils/pageTracking";

export default function PropertiesClient({ searchParams }) {
  const params = React.use(searchParams);
  const propertyType = params?.propertyType || "";
  const emirate = params?.emirate || "";
  const listingType = params?.listingType || "";

  // Memoize initialFilters to prevent unnecessary re-renders
  const initialFilters = useMemo(() => {
    const filters = {};
    if (propertyType) filters.propertyType = propertyType;
    if (emirate) filters.emirate = emirate;
    if (listingType) filters.listingType = listingType;
    return filters;
  }, [propertyType, emirate, listingType]);

  useEffect(() => {
    // Setup comprehensive page tracking for properties page
    const cleanup = setupPageTracking('all_properties', {
      pageData: {
        page_type: 'listing',
        content_category: 'all_properties',
        business_unit: 'property_portal',
        initial_property_type: propertyType,
        initial_emirate: emirate,
        initial_listing_type: listingType
      },
      trackScrollDepth: true,
      trackTimeOnPage: true
    });

    return cleanup;
  }, [propertyType, emirate, listingType]);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content ">
          <Properties defaultGrid initialFilters={initialFilters} />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
