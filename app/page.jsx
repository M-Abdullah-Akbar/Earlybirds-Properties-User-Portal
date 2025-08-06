import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Partners from "@/components/home/Partners";
//import About from "@/components/home/About";
import Brands from "@/components/home/Brands";
import Contact from "@/components/home/Contact";
import HelpSection from "@/components/home/HelpSection";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
import Properties from "@/components/home/Properties";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

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
          <Properties title="Properties For Sale" />
          <Properties title="Properties For Rent" />
          {/*<About />*/}
          <HelpSection />
          <Locations />
          {/*<Brands />*/}
          <Partners />
          <Testimonials />
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
