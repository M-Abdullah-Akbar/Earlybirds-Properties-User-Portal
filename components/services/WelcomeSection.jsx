import React from "react";
//import Image from "next/image";
// import SplitTextAnimation from "@/components/common/SplitTextAnimation";
export default function WelcomeSection() {
  return (
    <div className="text-with-img style-2 mt-5">
      <div className="tf-container">
        <div className="row">
          {/*<div className="col-lg-6">
            <div className="wrap-img relative">
              <div className="img-style main">
                <Image
                  className="lazyload"
                  data-src="/images/section/section-about-3.jpg"
                  alt=""
                  src="/images/section/section-about-3.jpg"
                  width={550}
                  height={481}
                />
              </div>
              <div className="img-style sub scroll-tranform">
                <Image
                  className="lazyload"
                  data-src="/images/section/section-about-4.jpg"
                  alt=""
                  src="/images/section/section-about-4.jpg"
                  width={290}
                  height={316}  
                />
              </div>
            </div>
          </div>*/}
          <div className="col-lg-12">
            <div className="content">
              <div className="heading-section mb-32 gap-30">
                <h2 className="title split-text effect-right fw-5">
                  Our Services
                </h2>
                <p
                  className="text-1 text-color-default wow animate__fadeInUp animate__animated"
                  data-wow-duration="1.5s"
                  data-wow-delay="0s"
                >
                  We make property easy and hassle-free at <a href="https://earlybirdsproperties.com/" target="_blank">Early Bird Properties</a>. We will assist you at each step if you are looking
                  to <a href="https://earlybirdsproperties.com/buy" target="_blank">buy</a>, <a href="https://earlybirdsproperties.com/sell" target="_blank">sell</a>, or <a href="https://earlybirdsproperties.com/rent" target="_blank">rent</a> your property. We assist buyers in
                  finding their ideal <a href="https://www.bayut.com/property/details-12950689.html" target="_blank">investment property</a>. Sellers can rely on
                  us for showcasing their property and linking them with serious
                  purchasers for an optimal price.
                </p>
                <p
                  className="text-1 text-color-default wow animate__fadeInUp animate__animated"
                  data-wow-duration="1.5s"
                  data-wow-delay="0s"
                >
                  We also simplify renting and leasing by connecting landlords
                  with tenants and locating comfortable homes. Home financing
                  can prove to be complicated at times, but our specialists are
                  there to get you connected with our trusted lenders. If you
                  are relocating to a new city, we have relocation assistance as
                  well to ease your relocation. At <a href="https://www.instagram.com/earlybirdsproperties/" target="_blank">Early Bird Properties</a>, our
                  aim is plain and simple:{" "}
                  <strong>
                    helping you make your real estate aspirations a reality with
                    ease and confidence.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
