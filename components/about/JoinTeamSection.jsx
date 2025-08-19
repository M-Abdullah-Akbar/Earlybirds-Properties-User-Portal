"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
//import DropdownSelect from "@/components/common/DropdownSelect";
export default function JoinTeamSection() {

  return (
    <>
      <section className="section-pre-approved mt-5">
        <div className="tf-container">
          <div className="row flex items-center">
            <div className="col-lg-6">
              <div className="content">
                <div className="heading-section ">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="Interested in Joining Our Team?" />
                  </h2>
                  <p className="text-1 split-text split-lines-transform">
                    At Early Bird Properties, we’re always looking for passionate and customer-focused individuals who want to grow in the real estate industry. If you’re someone who values integrity, innovation, and teamwork, we’d love to hear from you.
                  </p>
                </div>
                <div className="wrap-btn">
                  <a href="/contact-us" className="tf-btn bg-color-primary pd-6 fw-7">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-wrap img-animation wow animate__animated">
                <Image
                  className="lazyload parallax-img"
                  data-src="/images/9151e7e7-488e-4da8-8f29-b0aaff5f8bfe.jpg"
                  alt=""
                  src="/images/9151e7e7-488e-4da8-8f29-b0aaff5f8bfe.jpg"
                  width={300}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
