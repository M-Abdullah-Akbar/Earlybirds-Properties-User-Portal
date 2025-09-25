import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
//import Cta from "@/components/common/Cta";
import Details from "@/components/propertyDetails/Details";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";
import Slider from "@/components/propertyDetails/Slider";
import React from "react";
import { propertyAPI } from "@/utils/api";
import { notFound } from "next/navigation";
import PropertyDetailClient from "@/components/propertyDetails/PropertyDetailClient";

export const metadata = {
  title: "Property Details || Earlybirds - Real Estate",
  description: "Earlybirds - Real Estate",
}; 

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;

  try {
    // Fetch property data from backend
    const response = await propertyAPI.getProperty(id);

    
    
    if (!response.success || !response.data?.property) {
      notFound();
    }

    const property = response.data.property;

    return (
      <>
        <PropertyDetailClient property={property} />
        <div id="wrapper">
          <Header />
          <div className="main-content mt-5">
            <Slider property={property} />
            <Details property={property} />
            <RelatedProperties property={property} />
          </div>
          <Footer parentClass="style-2" />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }
}
