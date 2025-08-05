import React from 'react'
import Header from '@/components/headers/Header'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/services/Hero'
import WelcomeSection from '@/components/services/WelcomeSection'
import Cta from '@/components/common/Cta'
import PropertyManagementAbout from '@/components/services/PropertyManagementAbout'

export const metadata = {
    title: "Property Management || Proty - Real Estate React Nextjs Template",
    description: "Proty - Real Estate React Nextjs Template",
};

function PropertyManagement() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Hero />
          <WelcomeSection />
          <PropertyManagementAbout />
          <div className="mt-5">
            <Cta />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  )
}

export default PropertyManagement