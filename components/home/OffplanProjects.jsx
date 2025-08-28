"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function OffplanProjects() {
  const offplanCities = [
    {
      id: 1,
      city: "DUBAI",
      imageSrc: "/images/Off-Plan-Projects-in-dubai.jpeg",
      pageUrl: "/off-plan-properties?emirate=Dubai",
      alt: "Off-plan property developments in dubai. Discover new investment opportunities with EarlyBird Properties.",
      propertyCount: "1739",
    },
    {
      id: 2,
      city: "ABU DHABI",
      imageSrc: "/images/Off-Plan-Projects-in-abu-dhabi.jpeg",
      pageUrl: "/off-plan-properties?emirate=Abu+Dhabi",
      alt: "Off-plan property developments in Abu Dhabi. Discover new investment opportunities with EarlyBird Properties.",
      propertyCount: "207",
    },
    {
      id: 3,
      city: "SHARJAH",
      imageSrc: "/images/Off-Plan-Projects-in-sharjah.jpeg",
      pageUrl: "/off-plan-properties?emirate=Sharjah",
      alt: "Off-plan property developments in Sharjah. Discover new investment opportunities with EarlyBird Properties.",
      propertyCount: "137",
    },
    {
      id: 4,
      city: "RAS AL KHAIMAH",
      imageSrc: "/images/Off-Plan-Projects-in-Ras-Al-khaimah.jpg",
      pageUrl: "/off-plan-properties?emirate=Ras+Al+Khaimah",
      alt: "Off-plan property developments in Ras al khaimah. Discover new investment opportunities with EarlyBird Properties",
      propertyCount: "67",
    },
  ];

  return (
    <section className="section-categories-neighborhoods mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            {/* Heading Section */}
            <div className="heading-section mb-48">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Off Plan Projects" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                New off-plan developments
              </p>
            </div>

            {/* City Cards Grid */}
            <div className="row">
              {offplanCities.map((city) => (
                <div key={city.id} className="col-lg-3 col-md-6 col-sm-12">
                  <div className="box-house ">
                    <div className="image-wrap">
                      <Image
                        src={city.imageSrc}
                        alt={city.alt}
                        width={400}
                        height={300}
                        className="lazyload"
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: '16px'
                        }}
                      />
                      {/* Property Count Overlay */}
                      <div className="box-tag" style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        padding: '20px',
                        borderRadius: '0 0 16px 16px'
                      }}>
                        <h6 className="text_white fw-6" style={{
                          margin: '0',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          {city.propertyCount} + Properties
                        </h6>
                      </div>
                    </div>
                    {/* City Name */}
                    <div className="box-location" style={{
                      marginTop: '15px',
                      textAlign: 'center',
                    }}>
                      <h6 className="text-1 fw-6">
                        <Link href={city.pageUrl}>{city.city}</Link>
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
