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

export const metadata = {
  title: "Home || Earlybirds - Real Estate React",
  description: "Earlybirds - Real Estate React",
};

export default function Home() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Suspense fallback={<div className="hero-loading">Loading...</div>}>
            <Hero />
          </Suspense>
          <AboutSection />
          <ProvideSection />
          <Locations />
          <OffplanProjects />
          <Partners />
          <Testimonials />
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
