"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Locations() {
  const dubaiLocations = [
    {
      id: 1,
      imageSrc: "/images/section/box-house-10.jpg",
      alt: "Downtown Dubai",
      title: "Downtown Dubai",
    },
    {
      id: 2,
      imageSrc: "/images/section/box-house-11.jpg",
      alt: "Dubai Marina",
      title: "Dubai Marina",
    },
    {
      id: 3,
      imageSrc: "/images/section/box-house-12.jpg",
      alt: "Palm Jumeirah",
      title: "Palm Jumeirah",
    },
  ];

  return (
    <section className="section-categories-neighborhoods mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="dubai-locations-container">
              {/* Left Panel - Dubai Skyline Image */}
              <div className="dubai-skyline-panel">
                <div className="skyline-image-container">
                  <Image
                    src="/images/section/box-house-13.jpg"
                    alt="Dubai Skyline"
                    width={600}
                    height={400}
                    className="skyline-image"
                  />
                  {/*<div className="explore-button">
                    <button className="btn-explore">
                      Explore More <i className="icon-arrow-right"></i>
                    </button>
                  </div>*/}
                  <div className="explore-button">
                    <Link
                      href="/properties"
                      className="tf-btn style-border pd-4"
                    >
                      Explore Properties
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Panel - Content and Location Cards */}
              <div className="dubai-content-panel">
                <div className="heading-section mb-48">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="Find the Best Residential Areas in Dubai" />
                  </h2>
                  <p
                    className="text-1 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1.5s"
                    data-wow-delay="0s"
                  >
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
                          <h6 className="text_white">
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

      <style jsx>{`
        .dubai-locations-container {
          display: flex;
          gap: 40px;
          align-items: stretch;
          padding: 40px;
          border-radius: 12px;
        }

        .dubai-skyline-panel {
          flex: 1;
          position: relative;
        }

        .skyline-image-container {
          position: relative;
          height: 100%;
          min-height: 400px;
        }

        .skyline-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .explore-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }

        .btn-explore {
          background: #000;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-explore:hover {
          background: #333;
          transform: translateY(-2px);
        }

        .dubai-content-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .heading-section {
          margin-bottom: 30px;
        }

        .heading-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
        }

        .heading-section p {
          font-size: 1.1rem;
          color: #666;
          margin: 0;
        }

        .dubai-location-cards {
          display: flex;
          gap: 20px;
          flex: 1;
        }

        .location-card {
          flex: 1;
          position: relative;
        }

        .card-image-container {
          position: relative;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
        }

        .location-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 20px;
          color: #fff;
        }

        .card-overlay h6 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .dubai-locations-container {
            flex-direction: column;
            padding: 20px;
          }

          .dubai-location-cards {
            flex-direction: column;
          }

          .heading-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
