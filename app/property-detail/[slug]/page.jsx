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

// Dynamic metadata will be generated using generateMetadata function 

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    // Fetch property data from backend
    const response = await propertyAPI.getProperty(slug);
    
    if (!response.success || !response.data?.property) {
      return {
        title: "Property Not Found | Earlybirds Properties",
        description: "The requested property could not be found.",
      };
    }

    const property = response.data.property;
    
    // Use META information from database for SEO
    return {
      title: property.metaTitle || `${property.title} | Earlybirds Properties`,
      description: property.metaDescription || `Discover ${property.title} in ${property.location?.area || property.location?.emirate || 'UAE'}. View details, photos, and contact information.`
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Property Details | Earlybirds Properties",
      description: "View property details on Earlybirds Properties.",
    };
  }
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;

  try {
    // Fetch property data from backend
    const response = await propertyAPI.getProperty(slug);

    
    
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
