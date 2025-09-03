"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { propertyAPI } from "@/utils/api";

export default function RelatedProperties({ property }) {
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      if (!property) return;
      
      try {
        setLoading(true);
        console.log("Fetching related properties for:", property.title);
        
        // Get properties with same listing type, excluding current property
        const response = await propertyAPI.getProperties({
          listingType: property.listingType,
          status: 'available',
          limit: 10
        });
        
        if (response.success && response.data?.properties) {
          // Filter out the current property
          const filtered = response.data.properties.filter(p => p._id !== property._id);
          setRelatedProperties(filtered.slice(0, 4)); // Show max 4 properties
          console.log("Found related properties:", filtered.length);
        }
      } catch (error) {
        console.error("Error fetching related properties:", error);
        setRelatedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProperties();
  }, [property]);

  if (loading) {
    return (
      <section className="section-similar-properties tf-spacing-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section mb-32">
                <h2 className="title">Similar Properties</h2>
              </div>
              <div className="text-center">
                <p>Loading similar properties...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (relatedProperties.length === 0) {
    return (
      <section className="section-similar-properties tf-spacing-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section mb-32">
                <h2 className="title">Similar Properties</h2>
              </div>
              <div className="text-center">
                <p>No similar properties found at the moment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-similar-properties tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section mb-32">
              <h2 className="title">Similar Properties ({relatedProperties.length})</h2>
            </div>
            <div className="row">
              {relatedProperties.map((prop) => (
                <div key={prop._id} className="col-lg-3 col-md-6 mb-4">
                  <div className="box-house hover-img">
                    <div className="image-wrap">
                      <Link href={`/property-detail/${prop._id}`}>
                        <Image
                          src={prop.images?.[0]?.url || '/images/section/property-detail-3.jpg'}
                          alt={prop.title}
                          width={400}
                          height={300}
                          className="w-100"
                        />
                      </Link>
                      <ul className="box-tag flex gap-8">
                        {prop.featured && (
                          <li className="flat-tag text-4 bg-main fw-6 text_white">Featured</li>
                        )}
                        {prop.listingType === 'sale' && (
                          <li className="flat-tag text-4 bg-3 fw-6 text_white">For Sale</li>
                        )}
                        {prop.listingType === 'rent' && (
                          <li className="flat-tag text-4 bg-2 fw-6 text_white">For Rent</li>
                        )}
                        {prop.listingType === 'off plan' && (
                          <li className="flat-tag text-4 bg-1 fw-6 text_white">Off Plan</li>
                        )}
                      </ul>
                    </div>
                    <div className="content">
                      <h5 className="title">
                        <Link href={`/property-detail/${prop._id}`}>
                          {prop.title}
                        </Link>
                      </h5>
                      <p className="location text-1 flex items-center gap-8">
                        <i className="icon-location" />
                        {prop.location?.address || prop.location || 'Location not specified'}
                      </p>
                      <ul className="meta-list flex">
                        {(prop.details?.bedrooms || 0) > 0 && (
                          <li className="text-1 flex">
                            <span>{prop.details?.bedrooms}</span>Beds
                          </li>
                        )}
                        {(prop.details?.bathrooms || 0) > 0 && (
                          <li className="text-1 flex">
                            <span>{prop.details?.bathrooms}</span>Baths
                          </li>
                        )}
                        {(prop.details?.area || 0) > 0 && (
                          <li className="text-1 flex">
                            <span>{prop.details?.area}</span>Sqft
                          </li>
                        )}
                      </ul>
                      <div className="bot flex justify-between items-center">
                        {prop.price && (prop.listingType || prop.propertyType) !== 'off plan' && (
                          <h5 className="price">
                            {prop.price}
                          </h5>
                        )}
                        <div className="wrap-btn flex">
                          <Link
                            href={`/property-detail/${prop._id}`}
                            className="tf-btn style-border pd-4"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
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
