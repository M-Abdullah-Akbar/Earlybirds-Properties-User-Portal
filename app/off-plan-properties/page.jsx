import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Properties from "@/components/home/Properties";
import About from "@/components/off-plan/About";
import React from "react";

export const metadata = {
  title: "Off Plan Properties || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function OffPlanProperties() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Properties title="Off-plan properties for sale in Dubai with EarlyBirds Properties" />
          <About />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
