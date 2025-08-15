import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";
import BuyAbout from "@/components/buy/About";

export const metadata = {
  title: "Buy || Earlybirds - Properties User Portal",
  description: "Earlybirds - Properties User Portal",
};

export default async function Buy({ searchParams }) {
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
              propertyType="sale" 
              initialFilters={{
                propertyType: propertyType || "",
                emirate: emirate || ""
              }}
            />
            <BuyAbout />
            <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
