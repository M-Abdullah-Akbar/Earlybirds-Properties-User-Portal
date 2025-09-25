import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Hero from "@/components/sell/Hero";
import About from "@/components/sell/About";
import Faqs from "@/components/common/Faqs";
import CtaEnhanced from "@/components/common/CtaEnhanced";
import Testimonials from "@/components/common/Testimonials";
import SellClient from "@/components/sell/SellClient";

export const metadata = {
  title: "Sell Property in UAE | Earlybirds",
  description: "Sell your UAE property fast with Earlybirds Properties. Get expert help & top market value for your home or investment.",
};

export default function SellPage() {

  return (
    <>
      <SellClient />
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Hero />
        <div className="main-content overflow-hidden">
          <About />
          <Faqs pageType="sell" />
          <CtaEnhanced />
          <Testimonials />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
