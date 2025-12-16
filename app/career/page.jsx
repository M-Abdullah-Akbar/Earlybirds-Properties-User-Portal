//import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
//import Benefits from "@/components/career/Benefits";
import Jobs from "@/components/career/Jobs";
import PageTitle from "@/components/career/PageTitle";
//import Reviews from "@/components/career/Reviews";

import React from "react";

export const metadata = {
  title: "Careers at Earlybirds Properties | Join Our Team",
  description: "Explore career opportunities at Earlybirds Properties. Join a dynamic team and grow your career in the UAE real estate market.",
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <PageTitle />
        <div className="main-content">
          <Jobs />
          {/*<Benefits />
          <Reviews />
          <Cta />*/}
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
