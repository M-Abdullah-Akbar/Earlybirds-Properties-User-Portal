"use client";
import Brands from "@/components/home/Brands";
import About from "@/components/contact/About";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React, { useEffect } from "react";
import Contact from "@/components/common/Contact";
import { setupPageTracking } from "@/utils/pageTracking";

export default function ContactClient() {
  useEffect(() => {
    // Setup comprehensive page tracking for contact us page
    const cleanup = setupPageTracking('contact_us', {
      pageData: {
        page_type: 'contact',
        content_category: 'contact_form',
        business_unit: 'property_portal'
      },
      trackScrollDepth: true,
      trackTimeOnPage: true,
      trackExitIntent: true
    });

    return cleanup;
  }, []);

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Contact />
          <About />
          <Brands />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}