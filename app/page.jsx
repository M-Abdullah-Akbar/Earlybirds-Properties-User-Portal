import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Partners from "@/components/home/Partners";
import Contact from "@/components/common/Contact";
import ProvideSection from "@/components/home/ProvideSection";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
//import Properties from "@/components/home/Properties";
import Testimonials from "@/components/common/Testimonials";
import React, { Suspense } from "react";
import AboutSection from "@/components/home/AboutSection";
import OffplanProjects from "@/components/home/OffplanProjects";
import CtaEnhanced from "@/components/common/CtaEnhanced";
import Facts from "@/components/home/Facts";

export const metadata = {
  title: "Buy, Sell & Rent Properties in Dubai | Earlybird",
  description: "Find luxury villas, apartments & commercial spaces in Dubai. Buy, sell or rent properties easily with Earlybird Properties.",
};

export default function Home() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Suspense fallback={<div className="hero-loading"><img src="/images/blank.png" alt="Luxury apartments and properties in Dubai skyline – Buy, Sell, Rent with Earlybird Properties" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}>
            <Hero />
          </Suspense>
          <AboutSection />
          <ProvideSection />
          {/*<Locations />*/}
          <OffplanProjects />
          <Facts />
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
