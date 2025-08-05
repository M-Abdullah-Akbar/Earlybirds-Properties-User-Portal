import React from 'react'
import Header from '@/components/headers/Header'
import Footer from '@/components/footer/Footer'
import Services from '@/components/services/Services'
import Cta from '@/components/common/Cta'
import WelcomeSection from '@/components/services/WelcomeSection'
import Hero from '@/components/services/Hero'

export const metadata = {
    title: "Services || Earlybird Real Estate LLC.",
    description: "Earlybird Real Estate LLC.",
};

export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Hero />
          <WelcomeSection />
          <Services />
          <div className="mt-5">
            <Cta />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
