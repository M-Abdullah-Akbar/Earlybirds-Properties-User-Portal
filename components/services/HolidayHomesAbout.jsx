"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import ModalVideo from "@/components/common/ModalVideo";
import { useState } from "react";
export default function HolidayHomesAbout() {
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
                    Holiday Homes in Dubai
                  </h2>
                  <p className="text-1 text-color-default wow animate__fadeInUp animate__animated">
                    Earlybird Properties Holiday homes are all about giving you real properties with real experiences, so you can get first-hand glimpses of living in Dubai. As the business hub for the Middle East and as host to an endless list of ever more impressive tourist attractions, Dubai is taking the stage as the world’s most visited city for international travel in 2022. Whether you’re here for business or vacation, we’ll help you find the perfect place to call home. At the same time, Earlybird Properties Holiday homes operate on a revenue share basis with some of the industry’s most competitive rates. Our Landlords can rest assured that the success of their investment is in safe hands.
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
                    <SplitTextAnimation text="Maximize your returns with Holiday Homes in Dubai" />
                  </div>
                  <p className="tetx-1 text-color-default split-text split-lines-transform">
                    Dubai’s holiday homes market is booming, presenting investors and homeowners with unmatched opportunities for lucrative returns and lifestyle benefits. By investing in holiday homes, you can tap into a steady flow of rental income driven by the city’s thriving tourism sector, while also enjoying a luxurious retreat of your own. Whether you’re looking for sleek apartments in the heart of the city or spacious villas with stunning waterfront views, Dubai offers properties that perfectly cater to both short-term rental demands and personal leisure.
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
