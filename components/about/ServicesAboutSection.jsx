import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
export default function ServicesAboutSection() {
  return (
    <div className="section-help style-2 mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center gap-30 mb-56">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Our Services" />
              </h2>
              <p
                className="text-1 wow animate__fadeInUp animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                We make property easy and hassle-free at Early Bird Properties. We will assist you at each step if you are looking to buy, sell, or rent your property. We assist buyers in finding their ideal investment property. Sellers can rely on us for showcasing their property and linking them with serious purchasers for an optimal price.
              </p>
              <p
                className="text-1 wow animate__fadeInUp animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                We also simplify renting and leasing by connecting landlords with tenants and locating comfortable homes. Home financing can prove to be complicated at times, but our specialists are there to get you connected with our trusted lenders. If you are relocating to a new city, we have relocation assistance as well to ease your relocation. At Early Bird Properties, our aim is plain and simple: <strong>helping you make your real estate aspirations a reality with ease and confidence</strong>.
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
                    We deal with suitable commercial properties. Be it an office, showroom, or retail store, we find properties that provide optimal locations, high growth prospects, and full visibility to boost your business.
                  </p>
                  {/*<a href="/services#commercial-properties" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>*/}
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
                  Managing a property is very stressful. But we make it problem-free for you. From tenant searching and rent collection to normal maintenance and compliance with the law. We deal with everything so that your property remains profitable and in good condition at all times. 
                  </p>
                  {/*<a href="/services#property-management" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>*/}
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
                    Are you seeking a vacation home or short-term? Our holiday homes are picked with care, furnished to the highest standard, and in prime locations for ultimate comfort and convenience. Whether you're on a family break or a business trip, we ensure you feel at home.
                  </p>
                  {/*<a href="/services#holiday-homes" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>*/}
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
                    We make property financing more accessible with our guidance. We offer access to reliable lenders, competitive mortgage schemes, and step-by-step assistance through the approval process. We make sure to enable property ownership to be smooth and reachable to all.
                  </p>
                  {/*<a href="/services#mortgage" className="tf-btn-link color-3">
                    <span>Learn More</span>
                  </a>*/}
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
