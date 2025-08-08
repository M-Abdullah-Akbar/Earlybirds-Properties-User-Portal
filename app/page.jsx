import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Partners from "@/components/home/Partners";
import Contact from "@/components/home/Contact";
import HelpSection from "@/components/home/HelpSection";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
import Properties from "@/components/home/Properties";
import Testimonials from "@/components/sell/Testimonials";
import React from "react";
import AboutSection from "@/components/home/AboutSection";
import OffplanProjects from "@/components/home/OffplanProjects";

export const metadata = {
  title: "Home || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Hero />
        <div className="main-content overflow-hidden">
          {/* <Properties title="Properties For Sale" />
          <Properties title="Properties For Rent" /> */}
          <AboutSection />
          <OffplanProjects />
          <HelpSection />
          <Locations />
          <Partners />
          <Testimonials />
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
