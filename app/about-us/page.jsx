import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import { aboutData } from "@/data/about";
import Testimonials from "@/components/common/Testimonials";
import Brands from "@/components/home/Brands";
import AboutUsSection from "@/components/about/AboutUsSection";
import JoinTeamSection from "@/components/about/JoinTeamSection";
import ServicesAboutSection from "@/components/about/ServicesAboutSection";
import AboutUsClient from "@/components/about/AboutUsClient";

export const metadata = {
  title: "About Earlybirds Properties | UAE",
  description: "Learn about Earlybirds Properties, a trusted UAE real estate company helping clients buy, sell, rent, and invest in properties.",
};

export default async function AboutUsPage({ params }) {
  const { id } = await params;
  const agency = aboutData.filter((elm) => elm.id == id)[0] || aboutData[0];

  return (
    <>
      <AboutUsClient />
      <div id="wrapper">
        <Header />
        <div className="main-content mt-5">
          {/*<AboutDetails agency={agency} />*/}
          <AboutUsSection />
          <ServicesAboutSection />
          <JoinTeamSection />
          <Brands />
          <Testimonials />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
