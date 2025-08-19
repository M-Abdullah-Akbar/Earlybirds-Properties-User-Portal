import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";

export const metadata = {
  title: "Developers in UAE || Earlybirds - Real Estate",
  description: "Earlybirds - Real Estate",
};
export default function DeveloperInUaePage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Properties defaultGrid />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
