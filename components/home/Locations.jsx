"use client";
import React from "react";
import Image from "next/image";
// import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Locations() {
  const dubaiLocations = [
    {
      id: 1,
      imageSrc: "/images/IMG-20250813-WA0081.jpg",
      alt: "Downtown Dubai",
      title: "Downtown Dubai",
    },
    {
      id: 2,
      imageSrc: "/images/IMG-20250813-WA0079.jpg",
      alt: "Dubai Marina",
      title: "Dubai Marina",
    },
    {
      id: 3,
      imageSrc: "/images/IMG-20250813-WA0082.jpg",
      alt: "Palm Jumeirah",
      title: "Palm Jumeirah",
    },
  ];

  return (
    <section className="section-pre-approved mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="dubai-locations-container">
              {/* Left Panel - Dubai Skyline Image */}
              <div className="dubai-skyline-panel order-lg-1 order-2">
                <div className="skyline-image-container">
                  <Image
                    src="/images/IMG-20250813-WA0080.jpg"
                    alt="Dubai Skyline"
                    width={600}
                    height={400}
                    className="skyline-image"
                  />
                  <div className="explore-button">
                    <Link
                      href="/properties"
                      className="tf-btn bg-color-primary pd-4"
                    >
                      Explore Properties
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Panel - Content and Location Cards */}
              <div className="dubai-content-panel">
                <div className="heading-section">
                  <h2 className="title split-text effect-right">
                    Find the Best Residential Areas in Dubai
                  </h2>
                  <p className="text-1 split-text split-lines-transform text-color-default">
                    Top Areas In Dubai, UAE
                  </p>
                </div>

                {/* Location Cards */}
                <div className="dubai-location-cards">
                  {dubaiLocations.map((location) => (
                    <div className="location-card" key={location.id}>
                      <div className="card-image-container">
                        <Image
                          src={location.imageSrc}
                          alt={location.alt}
                          width={300}
                          height={200}
                          className="location-image"
                        />
                        <div className="card-overlay">
                          <h6 className="text-white">
                            <Link href={`/properties`}>{location.title}</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles moved to _locations.scss */}
    </section>
  );
}
