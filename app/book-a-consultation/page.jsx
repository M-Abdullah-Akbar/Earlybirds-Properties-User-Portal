import Brands from "@/components/home/Brands";
//import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
import BookConsultationForm from "@/components/contact/BookConsultationForm";
import PageTrackingClient from "@/components/common/PageTrackingClient";

import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Free Expert Consultation | Earlybirds Property",
  description: "Book your free consultation today. Get expert advice and personalized solutions for your property needs.",
};
export default function BookConsultationPage() {
  return (
    <>
      <PageTrackingClient 
        pageName="book_consultation"
        pageData={{
          page_type: 'form',
          content_category: 'consultation_booking',
          business_unit: 'property_portal'
        }}
        trackScrollDepth={true}
        trackTimeOnPage={true}
        trackExitIntent={true}
      />
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <BookConsultationForm />
          <About />
          <Brands />
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
