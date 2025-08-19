import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";
import RentAbout from "@/components/rent/About";
import Faqs from "@/components/common/Faqs";

export const metadata = {
  title: "Rent || Earlybirds - Properties User Portal",
  description: "Earlybirds - Properties User Portal",
};

export default async function RentPage({ searchParams }) {

  const params = await searchParams;
  const propertyType = params?.propertyType || "";
  const emirate = params?.emirate || "";

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Properties 
              defaultGrid 
              propertyType="rent" 
              initialFilters={{
                propertyType: propertyType || "",
                emirate: emirate || ""
              }}
            />
            <RentAbout />
            <Faqs pageType="rent" />
            <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
