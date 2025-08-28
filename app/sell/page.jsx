import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Hero from "@/components/sell/Hero";
import About from "@/components/sell/About";
import Testimonials from "@/components/common/Testimonials";
import Faqs from "@/components/common/Faqs";
import React from "react";
import CtaEnhanced from "@/components/common/CtaEnhanced";

export const metadata = {
  title: "Sell Property in UAE | Earlybirds",
  description: "Sell your UAE property fast with Earlybirds Properties. Get expert help & top market value for your home or investment.",
};
export default function SellPage() {

  return (
    <>
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
