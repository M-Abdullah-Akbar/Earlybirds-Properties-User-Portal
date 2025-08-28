import React from "react";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import Services from '@/components/services/Services';
import WelcomeSection from "@/components/services/WelcomeSection";

export const metadata = {
  title: "Real Estate Services UAE | Earlybirds",
  description: "Explore real estate services by Earlybirds Properties: buying, selling, renting, and off-plan investments across UAE.",
};

export default function ServicesPage() {

  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content mb-10">
          <WelcomeSection />
          <Services />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
