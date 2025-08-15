import Brands from "@/components/home/Brands";
import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Contact || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Contact />
          <About />
          <Brands />
          <Cta />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
