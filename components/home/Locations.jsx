"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Locations() {
  const dubaiLocations = [
    {
      id: 1,
      imageSrc: "/images/photo-1531586024505-b040066c2d5b.jpeg",
      alt: "Downtown Dubai",
      title: "Downtown Dubai",
    },
    {
      id: 2,
      imageSrc: "/images/photo-1531586024505-b040066c2d5b.jpeg",
      alt: "Dubai Marina",
      title: "Dubai Marina",
    },
    {
      id: 3,
      imageSrc: "/images/photo-1531586024505-b040066c2d5b.jpeg",
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
              <div className="dubai-skyline-panel">
                <div className="skyline-image-container">
                  <Image
                    src="/images/a32f87e3-fa14-49d7-9b57-6609b895530e.jpg"
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
                    <SplitTextAnimation text="Find the Best Residential Areas in Dubai" />
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

        .dubai-content-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .heading-section {
          margin-bottom: 30px;
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
          padding: 20px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          text-align: center;
        }

        .card-overlay h6 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
          letter-spacing: 0.5px;
        }

        .card-overlay h6 a {
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .card-overlay h6 a:hover {
          color: #f0f0f0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 1);
        }

        @media (max-width: 768px) {
          .dubai-locations-container {
            flex-direction: column;
            padding: 20px;
          }

          .dubai-location-cards {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
