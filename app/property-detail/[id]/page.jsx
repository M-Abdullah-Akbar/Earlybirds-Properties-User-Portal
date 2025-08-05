import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Cta from "@/components/common/Cta";
import Details from "@/components/propertyDetails/Details";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";
import Slider from "@/components/propertyDetails/Slider";
import React from "react";
import { allProperties } from "@/data/properties";  

export const metadata = {
  title: "Property Details || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
}; 
export default async function page({ params }) {
  const { id } = await params;

  const property =
    allProperties.filter((elm) => elm.id == id)[0] || allProperties[0];

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Slider />
          <Details property={property} />
          <RelatedProperties />
          <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
