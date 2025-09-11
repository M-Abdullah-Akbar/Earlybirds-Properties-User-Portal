import Image from "next/image";
import Link from "next/link";
import React from "react";

import CurrencyConverter from "@/components/common/CurrencyConverter";

export default function PropertyListItems({ properties = [], showItems }) {
  
  // If no properties provided, return empty
  if (!properties || properties.length === 0) {
    return null;
  }

  // Limit items if showItems is specified
  const displayProperties = showItems
    ? properties.slice(0, showItems)
    : properties;

  return (
    <>
      {displayProperties.map((property, i) => (
        <div key={property._id || property.id || i} className="box-house style-list hover-img">
          <div className="image-wrap">
            <Link href={`/property-detail/${property._id || property.id}`}>
              <Image
                className="lazyload"
                alt={property.title || property.name}
                src={property.images?.[0]?.url || property.imageSrc || "/images/section/placeholder.jpg"}
                width={600}
                height={401}
              />
            </Link>
            <ul className="box-tag flex gap-8">
              {property.featured && (
                <li className="flat-tag text-4 bg-main fw-6 text_white">
                  Featured
                </li>
              )}
              {(property.listingType || property.propertyType) && (
                <li className="flat-tag text-4 bg-3 fw-6 text_white">
                  {(property.listingType || property.propertyType) === 'sale' ? 'For Sale' : 
                   (property.listingType || property.propertyType) === 'rent' ? 'For Rent' :
                   (property.listingType || property.propertyType) === 'off plan' ? 'Off Plan' : 
                   'For Sale'}
                </li>
              )}
            </ul>
            {/*<div className="list-btn flex gap-8">
              <a href="#" className="btn-icon save hover-tooltip">
                <i className="icon-save" />
                <span className="tooltip">Add Favorite</span>
              </a>
              <a href="#" className="btn-icon find hover-tooltip">
                <i className="icon-find-plus" />
                <span className="tooltip">Quick View</span>
              </a>
            </div>*/}
          </div>
          <div className="content">
            <h5 className="title">
              <Link 
                href={`/property-detail/${property._id || property.id}`}
              >
                {property.title || property.name}
              </Link>
            </h5>
            <p className="location text-1 flex items-center gap-6">
              <i className="icon-location" /> 
              {typeof property.location === 'string' ? property.location : 
               property.location?.address || 
               `${property.area || ''} ${property.emirate || ''}`.trim() || 
               'Location not specified'}
            </p>
            <ul className="meta-list flex">
              {(property.details?.bedrooms || property.beds) && (
                <li className="text-1 flex">
                  <span>{property.details?.bedrooms || property.beds}</span>Beds
                </li>
              )}
              {(property.details?.bathrooms || property.baths) && (
                <li className="text-1 flex">
                  <span>{property.details?.bathrooms || property.baths}</span>Baths
                </li>
              )}
              {(property.details?.area || property.sqft) && (
                <li className="text-1 flex">
                  <span>{property.details?.area || property.sqft}</span>Sqft
                </li>
              )}
            </ul>
            <div className="bot flex justify-between items-center">
              {property.price && (property.listingType || property.propertyType) !== 'off plan' && (
                <div className="price-wrapper">
                  <CurrencyConverter 
                    price={property.price} 
                    baseCurrency="AED"
                    className="currency-converter-wrapper"
                    compact={true}
                  />
                </div>
              )}
              <div className="wrap-btn flex">
                <Link
                  href={`/property-detail/${property._id || property.id}`}
                  className="tf-btn style-border pd-4"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
