import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";

export const metadata = {
  title: "Areas in UAE || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Properties defaultGrid propertyType="areas-in-uae" 
              initialFilters={{
                propertyType: "",
                emirate: ""
              }} />
            <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
