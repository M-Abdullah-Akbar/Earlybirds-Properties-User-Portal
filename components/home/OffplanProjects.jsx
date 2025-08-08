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
      imageSrc: "/images/section/box-house-10.jpg",
      alt: "Dubai Skyline",
      propertyCount: "1739",
    },
    {
      id: 2,
      city: "ABU DHABI",
      imageSrc: "/images/section/box-house-11.jpg",
      alt: "Abu Dhabi Skyline",
      propertyCount: "207",
    },
    {
      id: 3,
      city: "SHARJAH",
      imageSrc: "/images/section/box-house-12.jpg",
      alt: "Sharjah Skyline",
      propertyCount: "137",
    },
    {
      id: 4,
      city: "RAS AL KHAIMAH",
      imageSrc: "/images/section/box-house-13.jpg",
      alt: "Ras Al Khaimah Skyline",
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
                <SplitTextAnimation text="Offplan Projects" />
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
                        {city.city}
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
