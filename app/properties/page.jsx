import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Properties from "@/components/properties/Properties";
import React from "react";

export const metadata = {
  title:
    "Property List || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content ">
          <Properties defaultGrid />
          <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
