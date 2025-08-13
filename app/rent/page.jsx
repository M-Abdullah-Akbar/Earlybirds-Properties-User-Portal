import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Cta from "@/components/common/Cta";
import Properties from "@/components/properties/Properties";
import RentAbout from "@/components/rent/About";

export const metadata = {
  title: "Rent || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
            <Properties defaultGrid propertyType="rent" />
            <RentAbout />
            <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
