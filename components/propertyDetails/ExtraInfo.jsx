import React from "react";

export default function ExtraInfo({ property }) {


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

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Property Details
      </div>
      <div className="content">
        <p className="description text-1">
          {property?.description || 'No description available for this property.'}
        </p>
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

          {getBedrooms() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Beds</p>
              <p>{getBedrooms()}</p>
            </li>
          )}
          {getBathrooms() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Baths</p>
              <p>{getBathrooms()}</p>
            </li>
          )}
          {getPropertyStatus() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Status</p>
              <p>{getPropertyStatus()}</p>
            </li>
          )}
        </ul>
        <ul>
          {getArea() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Size</p>
              <p>{getArea()}</p>
            </li>
          )}
          {getYearBuilt() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Year built</p>
              <p>{getYearBuilt()}</p>
            </li>
          )}
          {getPropertyType() !== 'N/A' && (
            <li className="flex">
              <p className="fw-6">Type</p>
              <p>{getPropertyType()}</p>
            </li>
          )}
          {getParkingSpaces() !== 'N/A' && (
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
