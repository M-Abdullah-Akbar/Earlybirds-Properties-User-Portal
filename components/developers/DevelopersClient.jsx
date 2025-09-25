"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React, { useMemo } from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";

export default function DevelopersClient() {
  // Memoize initialFilters to prevent unnecessary re-renders
  const initialFilters = useMemo(() => ({}), []);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Properties 
            defaultGrid 
            initialFilters={initialFilters}
          />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}