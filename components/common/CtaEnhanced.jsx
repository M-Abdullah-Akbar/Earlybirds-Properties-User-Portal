"use client";
import React from "react";
// import SplitTextAnimation from "./SplitTextAnimation";
import Image from "next/image";
import { usePathname } from "next/navigation";

function CtaEnhanced() {
  const pathname = usePathname();

  // Determine the appropriate href and button text based on the current page
  const getCtaDetails = () => {
    if (pathname.includes("/sell")) {
      return {
        href: "/instant-valuation",
        text: "Get your instant valuation",
      };
    } else if (
      pathname.includes("/buy") ||
      pathname.includes("/rent") ||
      pathname.includes("/off-plan-properties")
    ) {
      return {
        href: "/book-a-consultation",
        text: "Book a Consultation",
      };
    }
    return {
      href: "/book-a-consultation",
      text: "Book a Consultation",
    }; // Default fallback
  };

  const ctaDetails = getCtaDetails();

  return (
    <div className="wg-appraisal ">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="heading-section mb-30">
                <h2 className="title split-text effect-right">
                  Are You Selling Or
                  <br />
                  Renting Your Property?
                </h2>
                <p
                  className="text-1 split-text split-lines-transform"
                  data-wow-duration="1.5s"
                >
                  Thousands of luxury home enthusiasts just like you <a href="https://earlybirdsproperties.com/" target="_blank">visit our
                  website</a>.
                </p>
              </div>
              <a
                href={ctaDetails.href}
                className="tf-btn bg-color-primary fw-7 pd-11"
              >
                {ctaDetails.text}
              </a>
              <div
                className="person wow animate__fadeInRight animate__animated"
                data-wow-duration="2s"
              >
                <Image
                  alt=""
                  src="/images/Founder’s-Vision-at-Early-Bird-Properties-Trust-&-Real-Estate-Excellence(Background-removed).png"
                  width={366}
                  height={491}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CtaEnhanced;
