//import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import CtaEnhanced from "@/components/common/CtaEnhanced";
import Testimonials from "@/components/common/Testimonials";
import Faqs from "@/components/common/Faqs";
//import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Top UAE Property Questions | Earlybirds",
  description: "Got questions about buying, selling, renting, or off-plan properties in UAE? Earlybirds Properties answers all your real estate queries!",
};
export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Faqs pageType="faqs" />
          <CtaEnhanced />
          <Testimonials />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
