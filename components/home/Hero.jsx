import React, { Suspense } from "react";
import Image from "next/image";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <div
      className="page-title home02"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* LCP Image - Critical for performance, must be in initial HTML */}
      {/* Positioned to match original background-image behavior */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/Buy-and-Rent-Properties-in-Dubai-Earlybird-Properties.jpg"
          alt="Luxury properties in Dubai - Buy, Rent, and Invest with Earlybird Properties"
          fill
          priority
          fetchPriority="high"
          quality={85}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
          }}
          sizes="100vw"
        />
      </div>
      {/* CSS ::after pseudo-element handles the overlay automatically */}
      <div className="tf-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-12">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">Earlybird Properties</h1>
                <p className="h6 fw-4" style={{ whiteSpace: "nowrap" }}>
                  Own Tomorrow’s Dubai, Today
                </p>
              </div>
              <Suspense
                fallback={
                  <div
                    className="widget-tabs style-1"
                    style={{ minHeight: "200px" }}
                  ></div>
                }
              >
                <HeroSearch />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
