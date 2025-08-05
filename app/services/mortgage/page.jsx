import React from 'react'
import Header from '@/components/headers/Header'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/services/Hero'
import WelcomeSection from '@/components/services/WelcomeSection'
import Cta from '@/components/common/Cta'
import MortgageAbout from '@/components/services/MortgageAbout'

export const metadata = {
    title: "Mortgage || Proty - Real Estate React Nextjs Template",
    description: "Proty - Real Estate React Nextjs Template",
};

function Mortgage() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          <Hero />
          <WelcomeSection />
          <MortgageAbout />
          <div className="mt-5">
            <Cta />
          </div>
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  )
}

export default Mortgage