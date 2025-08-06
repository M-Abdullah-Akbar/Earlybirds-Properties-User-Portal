"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Partners() {
  const propertyTypes = [
    {
      type: "Apartment",
      image: "/images/section/box-house-10.jpg",
      description: "Modern apartments with stunning city views"
    },
    {
      type: "Townhouse",
      image: "/images/section/box-house-11.jpg", 
      description: "Contemporary townhouses with elegant design"
    },
    {
      type: "Villa",
      image: "/images/section/box-house-12.jpg",
      description: "Luxurious villas with private amenities"
    }
  ];

  return (
    <section className="section-property-types">
      <div className="tf-container">
        <div className="row align-items-center">
          {/* Left Section - Property Type Cards */}
          <div className="col-lg-6">
            <div className="property-cards-container">
              <div className="row g-4">
                {propertyTypes.map((property, index) => (
                  <div key={index} className="col-md-4">
                    <div className="property-card">
                      <div className="property-image">
                        <Image
                          src={property.image}
                          alt={property.type}
                          width={300}
                          height={400}
                          className="img-fluid"
                        />
                        <div className="property-overlay">
                          <h3 className="property-type">{property.type}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="col-lg-6">
            <div className="content-section">
              <div className="heading-section mb-4">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Find Your Dream Home in Dubai." />
                </h2>
              </div>
              
              <div className="text-content">
                <p className="text-1 mb-3">
                  Explore the finest properties in Dubai and embrace a lifestyle of unmatched luxury and comfort!
                </p>
                
                <p className="text-1 mb-3">
                  Tamani Properties, a leading real estate company in Dubai, offers a diverse range of premium apartments, townhouses, and villas for sale across the UAE.
                </p>
                
                <p className="text-1 mb-4">
                  Looking for the perfect home? Dubai's real estate market presents incredible opportunities for those who value elegance and sophistication. Whether you're a luxury seeker or simply want to elevate your living experience, trust one of Dubai's most reputable real estate agencies to guide you. Find your dream home and step into a world of refined living today!
                </p>
              </div>

              <div className="text-center mt-5">
                <Link href="/properties" className="tf-btn style-border pd-4">
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-property-types {
          padding: 80px 0;
          background-color: white;
        }

        .property-cards-container {
          padding-right: 30px;
        }

        .property-card {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-5px);
        }

        .property-image {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .property-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .property-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          padding: 20px;
          text-align: center;
        }

        .property-type {
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .content-section {
          padding-left: 30px;
        }

        .heading-section .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: black;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .text-content .text-1 {
          font-size: 16px;
          line-height: 1.6;
          color: black;
          margin-bottom: 1rem;
        }

        .cta-section {
          margin-top: 2rem;
        }

        .tf-btn {
          display: inline-block;
          padding: 15px 30px;
          background-color: #2c3e50;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
        }

        .tf-btn:hover {
          background-color: #34495e;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          color: white;
          text-decoration: none;
        }

        @media (max-width: 991px) {
          .property-cards-container {
            padding-right: 0;
            margin-bottom: 40px;
          }
          
          .content-section {
            padding-left: 0;
          }
          
          .heading-section .title {
            font-size: 2rem;
          }
        }

        @media (max-width: 767px) {
          .section-property-types {
            padding: 60px 0;
          }
          
          .heading-section .title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
