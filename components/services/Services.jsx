import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
export default function Services() {
  return (
    <div className="section-help style-3 tf-spacing-7 pb-0 mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center gap-30 mb-56">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Have a look at our services" />
              </h2>
              <p
                className="text-1 wow animate__fadeInUp animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                Our vision is to be the premier real estate company,
                recognized for our unwavering commitment to <br />
                excellence, innovation, and community impact. We aspire to
                create lasting value for our clients, employees, and <br />
                the communities we serve.
              </p>
            </div>
            <div className="tf-grid-layout md-col-2 mb-6">
              <div
                className="icons-box style-3 wow animate__zoomIn animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                <div className="tf-icon">
                  <i className="icon-agent-2" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/services#commercial-properties">Commercial Properties</a>
                  </h5>
                  <p className="text-1">
                    Looking for expert commercial property agents in Dubai to help you secure the perfect investment?
                  </p>
                  <a href="/services#commercial-properties" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
              <div
                className="icons-box style-3 wow animate__zoomIn animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                <div className="tf-icon">
                  <i className="icon-location-4" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/services#property-management">Property Management</a>
                  </h5>
                  <p className="text-1">
                  We manage, so YOU don’t have to. At Early Birds Properties, we don’t just handle property management—we redefine it. 
                  </p>
                  <a href="/services#property-management" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
              <div
                className="icons-box style-3 wow animate__zoomIn animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                <div className="tf-icon">
                  <i className="icon-house-1" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/services#holiday-homes">Holiday Homes</a>
                  </h5>
                  <p className="text-1">
                    Explore our curated selection of holiday homes in Dubai at Early Birds Properties and secure an investment designed to deliver exceptional value.
                  </p>
                  <a href="/services#holiday-homes" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
              <div
                className="icons-box style-3 wow animate__zoomIn animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                <div className="tf-icon">
                  <i className="icon-find-2" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/services#mortgage">Mortgage</a>
                  </h5>
                  <p className="text-1">
                    At Early Birds Properties, we also understand the importance of finding the right mortgage solution tailored to your specific needs.
                  </p>
                  <a href="/services#mortgage" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item text-center">
        <Image
          alt=""
          src="/images/section/section-help.png"
          width={1875}
          height={153}
        />
      </div>
    </div>
  );
}
