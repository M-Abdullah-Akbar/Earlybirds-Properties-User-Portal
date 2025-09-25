"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React, { useMemo } from "react";
import Properties from "@/components/properties/Properties";
import Contact from "@/components/common/Contact";
import Faqs from "@/components/common/Faqs";

export default function AreasClient() {
  // Memoize initialFilters to prevent unnecessary re-renders
  const initialFilters = useMemo(() => ({
    propertyType: "",
    emirate: ""
  }), []);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Faqs />
          <Properties 
            defaultGrid 
            propertyType="areas-in-uae" 
            initialFilters={initialFilters}
          />
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}