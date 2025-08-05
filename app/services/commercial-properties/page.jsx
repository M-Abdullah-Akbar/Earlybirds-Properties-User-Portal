import React from 'react'
import Header from '@/components/headers/Header'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/services/Hero'
import WelcomeSection from '@/components/services/WelcomeSection'
import Cta from '@/components/common/Cta'
import CommercialPropertiesAbout from '@/components/services/CommercialPropertiesAbout'

export const metadata = {
    title: "Commercial Properties || Earlybird Real Estate LLC.",
    description: "Earlybird Real Estate LLC.",
};

function CommercialProperties() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Hero />
          <WelcomeSection />
          <CommercialPropertiesAbout />
          <div className="mt-5">
            <Cta />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  )
}

export default CommercialProperties