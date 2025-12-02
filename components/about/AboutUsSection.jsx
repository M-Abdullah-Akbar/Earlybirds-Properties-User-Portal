"use client";
import React from "react";
import Image from "next/image";
// import SplitTextAnimation from "@/components/common/SplitTextAnimation";
//import DropdownSelect from "@/components/common/DropdownSelect";
export default function AboutUsSection() {
  return (
    <>
      <section className="section-pre-approved mt-5">
        <div className="tf-container">
          <div className="row flex items-center">
            <div className="col-lg-6">
              <div className="content">
                <div className="heading-section ">
                  <h2 className="title split-text effect-right">
                    From Our Founder&apos;s Vision
                  </h2>
                  <p className="text-1 split-text split-lines-transform">
                    At <a href="https://earlybirdsproperties.com/about-us" target="_blank">Early Bird Properties</a>, We think that real estate is more
                    than selling or buying. It&apos;s about assisting people
                    with beginning new chapters of their lives. When I started
                    this business, my goal was straightforward:{" "}
                    <strong>
                      &quot;to give each client an experience that is founded
                      upon trust, openness, and genuine commitment&quot;
                    </strong>
                  </p>
                  <p className="text-1 split-text split-lines-transform">
                    Early Bird Properties isn&apos;t simply a business,
                    it&apos;s a guarantee of dedication, creativity, and
                    outcomes. Our experience is fueled by a single cause: to
                    turn your property ambitions into reality, with satisfying,
                    and stress-free experience.
                  </p>
                </div>
                <div className="wrap-btn">
                  <h3 className="text-1 fw-6"><a href="https://www.instagram.com/official_zohaibs?igsh=MWhscGxjNG9qb2Y4OA==" target="_blank">Muhammad Zohaib Saleem</a></h3>
                  <h3 className="text-1 fw-6">
                    Founder & CEO, Early Bird Properties
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-wrap img-animation wow animate__animated">
                <Image
                  className="lazyload parallax-img"
                  data-src="/images/67ac5a91-6b33-491f-8de3-c60fdb894ccc1.jpg"
                  alt="Early Bird Properties: Trust, transparency, and commitment in real estate."
                  src="/images/Founder’s-Vision-at-Early-Bird-Properties-Trust-&-Real-Estate-Excellence.jpg"
                  width={300}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pre-approved mt-5">
        <div className="tf-container">
          <div className="row flex items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <div className="image-wrap img-animation wow animate__animated">
                <Image
                  className="lazyload parallax-img"
                  data-src="/images/Meet-the-Early-Bird-Properties-Team-Your-Real-Estate-Partners.jpg"
                  alt="The team at Early Bird Properties: Experts dedicated to your success."
                  src="/images/Meet-the-Early-Bird-Properties-Team-Your-Real-Estate-Partners.jpg"
                  width={300}
                  height={100}
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="content">
                <div className="heading-section ">
                  <h2 className="title split-text effect-right">Our Team</h2>
                  <p className="text-1 split-text split-lines-transform">
                    Behind every successful real estate journey is a team that
                    cares. At Early Bird Properties, we unite real estate
                    experts, market analysts, and client advisors who are
                    dedicated to converting opportunities into success stories.
                  </p>
                  <p className="text-1 split-text split-lines-transform">
                    Strength through diversity, each member of our team has
                    different skills and insights, which allows us to provide
                    individualized solutions for buyers, sellers, and
                    investors.You&apos;re not working with an agent here,
                    you&apos;re working with a partner who listens, understands,
                    and works in your best interest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
