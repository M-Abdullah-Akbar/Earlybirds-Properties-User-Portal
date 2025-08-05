import React from 'react'
import Header from '@/components/headers/Header'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/services/Hero'
import WelcomeSection from '@/components/services/WelcomeSection'
import Cta from '@/components/common/Cta'
import HolidayHomesAbout from '@/components/services/HolidayHomesAbout'

export const metadata = {
    title: "Holiday Homes || Proty - Real Estate React Nextjs Template",
    description: "Proty - Real Estate React Nextjs Template",
};

function HolidayHomes() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Hero />
          <WelcomeSection />
          <HolidayHomesAbout />
          <div className="mt-5">
            <Cta />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  )
}

export default HolidayHomes