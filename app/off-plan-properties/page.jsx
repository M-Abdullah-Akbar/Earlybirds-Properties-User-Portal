
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Properties from "@/components/properties/Properties";
//import About from "@/components/off-plan/About";
import React from "react";

export const metadata = {
  title: "Off-Plan Properties || Earlybirds - Properties User Portal",
  description: "Earlybirds - Properties User Portal",
};


export default function OffPlanProperties({ searchParams }) {
  const propertyType = searchParams?.propertyType || "";
  const emirate = searchParams?.emirate || "";

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content overflow-hidden">
          <Properties 
            defaultGrid 
            propertyType="off-plan" 
            initialFilters={{
              propertyType: propertyType || "",
              emirate: emirate || ""
            }}
          />
          {/* <About /> */}
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
