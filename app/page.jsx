import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import About from "@/components/home/About";
import Brands from "@/components/home/Brands";
import Contact from "@/components/home/Contact";
import HelpSection from "@/components/home/HelpSection";
import Hero from "@/components/home/Hero";
import Properties3 from "@/components/home/Properties";
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
          <Properties3 />
          <About />
          <HelpSection />
          <Brands />
          <Testimonials />
          <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
