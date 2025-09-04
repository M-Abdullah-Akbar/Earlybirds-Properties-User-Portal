import Brands from "@/components/home/Brands";
//import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
//import InstantValuationForm from "@/components/contact/InstantValuationForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Contact from "@/components/common/Contact";

export const metadata = {
  title: "Contact Earlybirds Properties | UAE",
  description: "Get in touch with Earlybirds Properties for property inquiries, sales, rentals, or off-plan projects. Expert support in UAE real estate.",
};
export default function ContactUsPage() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Contact />
          <About />
          <Brands />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
