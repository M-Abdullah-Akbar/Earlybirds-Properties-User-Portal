import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
//import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";
import Contact from "@/components/common/Contact";
//import AreasInUaeAbout from "@/components/areas-in-uae/About";

import Faqs from "@/components/common/Faqs";


export const metadata = {
  title: "Areas in UAE || Earlybirds - Real Estate",
  description: "Earlybirds - Real Estate",
};
export default function AreasInUaePage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Faqs />
            <Properties defaultGrid propertyType="areas-in-uae" 
              initialFilters={{
                propertyType: "",
                emirate: ""
              }} />
            <Contact />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
