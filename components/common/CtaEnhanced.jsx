import React from "react";
import SplitTextAnimation from "./SplitTextAnimation";
import Image from "next/image";

function CtaEnhanced() {
  return (
    <div className="wg-appraisal ">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="heading-section mb-30">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Are You Selling Or" />
                  <br />
                  <SplitTextAnimation text="Renting Your Property?" />
                </h2>
                <p
                  className="text-1 split-text split-lines-transform"
                  data-wow-duration="1.5s"
                >
                  Thousands of luxury home enthusiasts just like you visit our
                  website.
                </p>
              </div>
              <a href="/book-a-consultation" className="tf-btn bg-color-primary fw-7 pd-11">
                Request your free appraisal
              </a>
              <div
                className="person wow animate__fadeInRight animate__animated"
                data-wow-duration="2s"
              >
                <Image
                  alt=""
                  src="/images/person-1.webp"
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
