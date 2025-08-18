import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Hero from "@/components/sell/Hero";
import About from "@/components/sell/About";
import Testimonials from "@/components/sell/Testimonials";
import React from "react";

export const metadata = {
  title: "Sell || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function Sell() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <Hero />
        <div className="main-content overflow-hidden">
          <About />
          <Testimonials />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
