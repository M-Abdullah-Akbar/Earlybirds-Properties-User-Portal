"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Partners() {
  const propertyTypes = [
    {
      type: "Apartment",
      image: "/images/IMG-20250813-WA0088.jpg",
      description: "Modern apartments with stunning city views"
    },
    {
      type: "Townhouse",
      image: "/images/IMG-20250813-WA0089.jpg", 
      description: "Contemporary townhouses with elegant design"
    },
    {
      type: "Villa",
      image: "/images/IMG-20250813-WA0090.jpg",
      description: "Luxurious villas with private amenities"
    }
  ];

  return (
    <section className="section-pre-approved mt-5">
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
              <div className="heading-section">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Find Your Dream Home in Dubai." />
                </h2>
              </div>
              
              <div className="text-content">
                <p className="text-1 split-text split-lines-transform text-color-default mb-3">
                  At Early Bird Properties, we present to you a well-selected range of luxury apartments, chic townhouses, and luxury villas available throughout the UAE.
                </p>
                
                <p className="text-1 split-text split-lines-transform text-color-default mb-3">
                  Are you looking for a dream home? Dubai’s property market is full of stylish, luxurious options. People who value elegance can find their comfort choice. Whether you’re chasing the high life or simply want to upgrade your lifestyle, let one of Dubai’s most trusted real estate experts guide you. Find the perfect place to call home and start living the refined life you deserve.

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
          height: 170px;
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

        @media (max-width: 991px) {
          .property-cards-container {
            padding-right: 0;
            margin-bottom: 40px;
          }
          
          .content-section {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
