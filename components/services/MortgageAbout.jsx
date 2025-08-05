"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import ModalVideo from "@/components/common/ModalVideo";
import { useState } from "react";
export default function MortgageAbout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="tf-spacing-7 pt-0 mt-5">
        <div className="box-about style-1">
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-6 left">
                <div className="heading-section mb-74 gap-33">
                  <h2 className="title split-text split-lines-rotation-x fw-5">
                    Mortgage Services in Dubai
                  </h2>
                  <p className="text-1 text-color-default wow animate__fadeInUp animate__animated">
                    As a completely free service, Earlybird Properties Services works for you to find a mortgage that fits your specific requirements. There are a lot of components to understand: interest rates, amount of borrowing, mortgage calculators, costs, fixed and variable products and more! Earlybird Properties Mortgage Service offers exclusive products and services which will save you thousands in upfront costs and interest throughout the duration of the loan. Whether you want to compare mortgage rates, work out ‘how much can I borrow?’ or establish what mortgage deals are available to you, our mortgage advisors have the skills, knowledge, and lender relationships to turn your property aspirations into a reality.
                  </p>
                </div>
                <div className="img-style img-custom-anim-left wow">
                  <Image
                    className="lazyload"
                    data-src="/images/section/section-about-5.jpg"
                    alt=""
                    src="/images/section/section-about-5.jpg"
                    width={440}
                    height={357}
                  />
                </div>
              </div>
              <div className="col-lg-6 right">
                <div className="wrap relative">
                  <div className="img-style img-custom-anim-right wow">
                    <Image
                      className="lazyload"
                      data-src="/images/section/section-about-6.jpg"
                      alt=""
                      src="/images/section/section-about-6.jpg"
                      width={620}
                      height={509}
                    />
                  </div>
                  {/* <div className="widget-video style-2">
                    <div className="wrap-icon">
                      <div className="text-circle">
                        <svg className="textcircle" viewBox="0 0 500 500">
                          <defs>
                            <path
                              id="textcircle"
                              d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                            />
                          </defs>
                          <text>
                            <textPath xlinkHref="#textcircle" textLength={900}>
                              find the dream home Proty real estate *
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <a
                        className="video-icon popup-youtube"
                        onClick={() => setIsOpen(true)}
                      >
                        <i aria-hidden="true" className="icon-play-1" />
                      </a>
                    </div>
                  </div> */}
                </div>
                <div className="content mt-5">
                  <div className="text-17 text-color-heading fw-6 mb-27 split-text effect-right">
                    <SplitTextAnimation text="Unlock your Dream Home!" />
                  </div>
                  <p className="tetx-1 text-color-default split-text split-lines-transform">
                    At Early Birds Properties, we also understand the importance of finding the right mortgage solution tailored to your specific needs. Whether you're purchasing a new home, refinancing, or exploring investment opportunities, we've partnered with industry-leading mortgage experts to provide personalized and competitive options. Our goal is to simplify the mortgage process, ensuring you have a clear path toward achieving your financial and property goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        videoId={"XHOmBV4js_E"}
      />{" "}
    </>
  );
}
