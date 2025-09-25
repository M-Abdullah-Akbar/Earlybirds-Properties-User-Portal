"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Partners from "@/components/home/Partners";
import Contact from "@/components/common/Contact";
import ProvideSection from "@/components/home/ProvideSection";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
import Testimonials from "@/components/common/Testimonials";
import React, { Suspense, useEffect } from "react";
import AboutSection from "@/components/home/AboutSection";
import OffplanProjects from "@/components/home/OffplanProjects";
import Facts from "@/components/home/Facts";
import Brands from "@/components/home/Brands";
import { setupPageTracking } from "@/utils/pageTracking";
import Image from "next/image";

export default function HomeClient() {
  useEffect(() => {
    // Setup comprehensive page tracking for home page
    const cleanup = setupPageTracking('home', {
      pageData: {
        page_type: 'homepage',
        content_category: 'real_estate',
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
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Suspense fallback={<div className="hero-loading"><Image src="/images/blank.png" alt="Luxury apartments and properties in Dubai skyline – Buy, Sell, Rent with Earlybird Properties" fill style={{ objectFit: 'cover' }} /></div>}>
            <Hero />
          </Suspense>
          <AboutSection />
          <ProvideSection />
          {/*<Locations />*/}
          <OffplanProjects />
          <Facts />
          <Brands />
          <Partners />
          <Testimonials />
          {/*<CtaEnhanced />*/}
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}