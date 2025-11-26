"use client";

import LazySection from "@/components/common/LazySection";
import Header from "@/components/headers/Header";
import Hero from "@/components/home/Hero";
import React, { Suspense, useEffect } from "react";
import { setupPageTracking } from "@/utils/pageTracking";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components to improve initial page load
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const ProvideSection = dynamic(
  () => import("@/components/home/ProvideSection"),
  {
    loading: () => <div style={{ minHeight: "200px" }} />,
  }
);
const OffplanProjects = dynamic(
  () => import("@/components/home/OffplanProjects"),
  {
    loading: () => <div style={{ minHeight: "200px" }} />,
  }
);
const Facts = dynamic(() => import("@/components/home/Facts"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const Brands = dynamic(() => import("@/components/home/Brands"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const Partners = dynamic(() => import("@/components/home/Partners"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const Testimonials = dynamic(() => import("@/components/common/Testimonials"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const Contact = dynamic(() => import("@/components/common/Contact"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});

export default function HomeClient() {
  useEffect(() => {
    // Setup comprehensive page tracking for home page
    const cleanup = setupPageTracking("home", {
      pageData: {
        page_type: "homepage",
        content_category: "real_estate",
        business_unit: "property_portal",
      },
      trackScrollDepth: true,
      trackTimeOnPage: true,
      trackExitIntent: true,
    });

    return cleanup;
  }, []);

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Hero />
          <LazySection>
            <AboutSection />
          </LazySection>
          <LazySection>
            <ProvideSection />
          </LazySection>
          {/*<Locations />*/}
          <LazySection  >
            <OffplanProjects />
          </LazySection>
          <LazySection>
            <Facts />
          </LazySection>
          <LazySection>
            <Brands />
          </LazySection>
          <LazySection>
            <Partners />
          </LazySection>
          <LazySection>
            <Testimonials />
          </LazySection>
          {/*<CtaEnhanced />*/}
          <LazySection>
            <Contact />
          </LazySection>
        </div>
        <LazySection>
          <Footer parentClass="style-2" />
        </LazySection>
      </div>
    </>
  );
}
