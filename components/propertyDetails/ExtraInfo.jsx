"use client"
import React, { useState, useEffect } from "react";
import { renderTiptapJson } from '@/utils/tiptap-html-renderer';
// SCSS is imported globally in the main.scss file

export default function ExtraInfo({ property }) {
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionHtml, setDescriptionHtml] = useState("");

  // Helper function to check if a value should be displayed
  const shouldDisplay = (value) => {
    return value && value !== "N/A" && value !== "" && value !== 0 && value !== null && value !== undefined;
  };


  // Helper function to get property ID
  const getPropertyId = () => {
    return property?._id || property?.id || 'N/A';
  };

  // Helper function to get property type
  const getPropertyType = () => {
    return property?.propertyType || property?.listingType || 'N/A';
  };

  // Helper function to get property status
  const getPropertyStatus = () => {
    return property?.status || 'Available';
  };

  // Helper function to get area
  const getArea = () => {
    const area = property?.details?.area || property?.sqft || property?.size;
    const unit = property?.details?.areaUnit || 'SqFt';
    return area ? `${area} ${unit}` : 'N/A';
  };

  // Helper function to get bedrooms
  const getBedrooms = () => {
    return property?.details?.bedrooms || property?.bedrooms || 'N/A';
  };

  // Helper function to get bathrooms
  const getBathrooms = () => {
    return property?.details?.bathrooms || property?.bathrooms || 'N/A';
  };

  // Helper function to get year built
  const getYearBuilt = () => {
    return property?.details?.yearBuilt || 'N/A';
  };

  // Helper function to get parking spaces
  const getParkingSpaces = () => {
    return property?.details?.parking?.spaces || 'N/A';
  };

  // Helper function to get total rooms
  const getTotalRooms = () => {
    const beds = getBedrooms();
    const baths = getBathrooms();
    if (beds === 'N/A' && baths === 'N/A') return 'N/A';
    const totalBeds = beds === 'N/A' ? 0 : parseInt(beds);
    const totalBaths = baths === 'N/A' ? 0 : parseInt(baths);
    return totalBeds + totalBaths;
  };

  // Process property description when property data changes
  useEffect(() => {
    // Reset state when property changes or is undefined
    if (!property) {
      setIsLoading(true);
      setDescriptionHtml('');
      return;
    }

    // Set loading state
    setIsLoading(true);
    
    try {
      // Short timeout to ensure UI shows loading state
      setTimeout(() => {
        // Validate property description
        if (property.description) {
          // Check if description is valid (not empty or malformed)
          const isValidDescription = (
            typeof property.description === 'object' || 
            (typeof property.description === 'string' && property.description.trim() !== '')
          );
          
          if (isValidDescription) {
            // Convert JSON description to HTML using the official TipTap HTML renderer
            const html = renderTiptapJson(property.description);
            
            // Additional validation to ensure HTML was generated
            if (html && html.trim() !== '') {
              setDescriptionHtml(html);
            } else {
              console.warn('Generated HTML is empty or invalid');
              setDescriptionHtml('');
            }
          } else {
            console.warn('Property description is empty or invalid');
            setDescriptionHtml('');
          }
        } else {
          setDescriptionHtml('');
        }
        
        // Complete loading
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error processing property description:', error);
      setDescriptionHtml('');
      setIsLoading(false);
    }
  }, [property]);

  return (
    <>
      <div className="content">
        {isLoading ? (
          <div className="loading-placeholder">
            <div className="loading-line"></div>
            <div className="loading-line"></div>
            <div className="loading-line"></div>
          </div>
        ) : descriptionHtml ? (
          <div 
            className="description text-1" 
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        ) : (
          <p className="description text-1">
            No description available for this property.
          </p>
        )}
        {/*<a href="#" className="tf-btn-link style-hover-rotate">
          <span>Read More </span>
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2348_5612)">
              <path
                d="M1.66732 9.99999C1.66732 14.6024 5.39828 18.3333 10.0007 18.3333C14.603 18.3333 18.334 14.6024 18.334 9.99999C18.334 5.39762 14.603 1.66666 10.0007 1.66666C5.39828 1.66666 1.66732 5.39762 1.66732 9.99999Z"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6.66666L10 13.3333"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66732 10L10.0007 13.3333L13.334 10"
                stroke="#F1913D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2348_5612">
                <rect
                  width={20}
                  height={20}
                  fill="white"
                  transform="translate(20) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>*/}
      </div>
      <div className="box">
        <ul>
          {/*<li className="flex">
            <p className="fw-6">ID</p>
            <p>#{getPropertyId()}</p>
          </li>*/}

          {shouldDisplay(getBedrooms()) && (
            <li className="flex">
              <p className="fw-6">Beds</p>
              <p>{getBedrooms()}</p>
            </li>
          )}
          {shouldDisplay(getBathrooms()) && (
            <li className="flex">
              <p className="fw-6">Baths</p>
              <p>{getBathrooms()}</p>
            </li>
          )}
          {shouldDisplay(getPropertyStatus()) && (
            <li className="flex">
              <p className="fw-6">Status</p>
              <p>{getPropertyStatus()}</p>
            </li>
          )}
        </ul>
        <ul>
          {shouldDisplay(getArea()) && (
            <li className="flex">
              <p className="fw-6">Size</p>
              <p>{getArea()}</p>
            </li>
          )}
          {shouldDisplay(getYearBuilt()) && (
            <li className="flex">
              <p className="fw-6">Year built</p>
              <p>{getYearBuilt()}</p>
            </li>
          )}
          {shouldDisplay(getPropertyType()) && (
            <li className="flex">
              <p className="fw-6">Type</p>
              <p>{getPropertyType()}</p>
            </li>
          )}
          {shouldDisplay(getParkingSpaces()) && (
            <li className="flex">
              <p className="fw-6">Garage</p>
              <p>{getParkingSpaces()}</p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
