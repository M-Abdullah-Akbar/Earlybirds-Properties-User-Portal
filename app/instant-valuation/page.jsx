import Brands from "@/components/home/Brands";
//import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
import InstantValuationForm from "@/components/contact/InstantValuationForm";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Instant Property Valuation Online | Earlybirds",
  description: "Get instant, accurate property valuation online in minutes. Fast, reliable, and hassle-free service.",
};
export default function InstantValuationPage() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <InstantValuationForm />
          <About />
          <Brands />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
