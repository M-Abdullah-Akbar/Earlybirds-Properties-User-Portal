"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Link from "next/link";

export default function Partners() {
  const propertyTypes = [
    {
      type: "Apartment",
      image: "/images/Luxury-Apartments.jpg",
      alt: "Luxury apartments, for sale in Dubai, available through EarlyBird Properties."
    },
    {
      type: "Townhouse",
      image: "/images/Townhouse.jpg", 
      alt: "Luxury Townhouse, for sale in Dubai, available through EarlyBird Properties."
    },
    {
      type: "Villa",
      image: "/images/Villas-in-Dubai.jpg",
      alt: "Elegant villas, for sale in Dubai, available through EarlyBird Properties."
    }
  ];

  return (
    <section className="section-pre-approved mt-5">
      <div className="tf-container">
        <div className="row align-items-center">
          {/* Left Section - Property Type Cards */}
          <div className="col-lg-6 order-lg-1 order-2">
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
                          height={300}
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
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="content-section">
              <div className="heading-section">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Find Your Dream Home in Dubai." />
                </h2>
              </div>
              
              <div className="text-content">
                <p className="text-1 split-text split-lines-transform text-color-default mb-3">
                  At <Link href="/about-us">Early Bird Properties</Link>, we present to you a well-selected range of luxury {" "}<a href="https://www.bayut.com/property/details-12950689.html" target="_blank">apartments</a>{""}, chic townhouses, and luxury villas available throughout the UAE.
                </p>
                
                <p className="text-1 split-text split-lines-transform text-color-default mb-3">
                  Are you looking for a <Link href="/buy">dream home</Link>? Dubai’s property market is full of stylish, luxurious options. People who value elegance can find their comfort choice. Whether you’re chasing the high life or simply want to upgrade your lifestyle, let one of Dubai’s most trusted real estate experts guide you. Find the perfect place to call home and start living the refined life you deserve.

                </p>
              </div>

              <div className="text-center mt-5">
                <Link href="/buy" className="tf-btn style-border pd-4">
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles moved to _partners.scss */}
    </section>
  );
}
