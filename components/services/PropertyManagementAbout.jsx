"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import ModalVideo from "@/components/common/ModalVideo";
import { useState } from "react";
export default function PropertyManagementAbout() {
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
                    Property Management in Dubai
                  </h2>
                  <p className="text-1 text-color-default wow animate__fadeInUp animate__animated">
                    We manage, so YOU don’t have to. With an established track record from both past & present customers, Earlybird Property Management provide a bespoke service to each client, backed by experienced advisors who are knowledgeable, passionate & dynamic about Dubai’s real estate Property Management. Having a property manager is a hassle & stress-free way to maximise your ROI. It’s a one-stop shop of comprehensive service; from marketing, management, and everything in between. We provide you with progress updates anywhere, anytime via a smart property management portal and you get peace of mind knowing that your investment & tenants are in good hands.
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
                    <SplitTextAnimation text="Property Management" />
                  </div>
                  <p className="tetx-1 text-color-default split-text split-lines-transform">
                    At Early Birds Properties, we don’t just handle property management—we redefine it. Our dedicated team ensures your investment thrives by offering comprehensive services that include tenant screening, rent collection, maintenance coordination, and more. With our efficient property management solutions, you can enjoy peace of mind while maximizing your returns. Visit Early Birds Properties Property Management to see how our expert team can simplify the complexities of managing your property. With us, you gain more than a service—you gain a reliable partner committed to your success. Start your hassle-free property management experience today!
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
