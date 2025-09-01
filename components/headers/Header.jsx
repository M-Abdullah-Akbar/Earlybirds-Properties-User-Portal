"use client";
import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import { useAnalytics } from "@/contexts/AnalyticsContext";
export default function Header8() {
  const { trackClick, trackNavigation } = useAnalytics();

  const handleLogoClick = () => {
    trackClick({
      element_type: 'logo',
      element_text: 'Earlybirds Properties Logo',
      page_location: window.location.pathname
    });
    trackNavigation({
      destination: '/',
      source: 'header_logo'
    });
  };

  const handleConsultationClick = () => {
    trackClick({
      element_type: 'cta_button',
      element_text: 'Book a Consultation',
      page_location: window.location.pathname
    });
    trackNavigation({
      destination: '/book-a-consultation',
      source: 'header_cta'
    });
  };

  const handleValuationClick = () => {
    trackClick({
      element_type: 'cta_button',
      element_text: 'Instant Valuation',
      page_location: window.location.pathname
    });
    trackNavigation({
      destination: '/instant-valuation',
      source: 'header_cta'
    });
  };

  return (
    <header id="header-main" className="header style-7">
      <div className="header-inner">
        <div className="header-inner-wrap">
          <div className="header-logo">
            <Link href={`/`} className="site-logo" onClick={handleLogoClick}>
              <img
                className="logo_header"
                alt="Earlybirds-Properties-Logo"
                data-light="/images/logo/Earlybird_Logo.png"
                data-dark="/images/logo/Earlybird_Logo.png"
                src="/images/logo/Earlybird_Logo.png"
              />
            </Link>
          </div>
          <nav className="main-menu style-1">
            <ul className="navigation">
              <Nav />
            </ul>
          </nav>
          <div className="header-right">
            <div className="btn-add">
              <Link
                className="tf-btn style-border rounded-cycle height-3 pd-23"
                href={`/book-a-consultation`}
                onClick={handleConsultationClick}
              >
                Book a Consultation
                <span>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7H17V17"
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </span>
              </Link>
            </div>
            <div className="btn-add">
              <Link
                className="tf-btn style-border rounded-cycle height-3 pd-23"
                href={`/instant-valuation`}
                onClick={handleValuationClick}
              >
                Instant Valuation 
                <span>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7H17V17"
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </span>
              </Link>
            </div>
            <div
              className="mobile-button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu-mobile"
              aria-controls="menu-mobile"
            >
              <i className="icon-menu" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
