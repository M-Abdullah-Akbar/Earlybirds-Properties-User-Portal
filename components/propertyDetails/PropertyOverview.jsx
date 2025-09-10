import React from "react";

export default function PropertyOverview({ property }) {
  // Helper function to get display location
  const getDisplayLocation = () => {
    if (typeof property.location === 'string') {
      return property.location;
    }
    if (property.location?.address) {
      return property.location.address;
    }
    const areaEmirate = `${property.area || ''} ${property.emirate || ''}`.trim();
    return areaEmirate || 'Location not specified';
  };

  // Helper function to get property ID
  const getPropertyId = () => {
    return property._id || property.id || 'N/A';
  };

  // Helper function to get property type
  const getPropertyType = () => {
    return property.propertyType || property.listingType || 'N/A';
  };

  // Helper function to get land size
  const getLandSize = () => {
    if (property.details?.landArea) {
      return `${property.details.landArea} ${property.details.areaUnit || 'SqFt'}`;
    }
    return 'N/A';
  };

  // Helper function to get parking spaces
  const getParkingSpaces = () => {
    if (property.details?.parking?.spaces) {
      return property.details.parking.spaces;
    }
    return 'N/A';
  };

  // Helper function to get year built
  const getYearBuilt = () => {
    return property.details?.yearBuilt || 'N/A';
  };

  // Helper function to check if a value should be displayed
  const shouldDisplay = (value) => {
    return value && value !== "N/A" && value !== "" && value !== 0 && value !== null && value !== undefined;
  };

  // Helper function to get bedrooms
  const getBedrooms = () => {
    return property.details?.bedrooms || property.bedrooms || 'N/A';
  };

  // Helper function to get bathrooms
  const getBathrooms = () => {
    return property.details?.bathrooms || property.bathrooms || 'N/A';
  };

  // Helper function to get area
  const getArea = () => {
    const area = property.details?.area || property.sqft || property.size;
    const unit = property.details?.areaUnit || 'SqFt';
    return area ? `${area} ${unit}` : 'N/A';
  };

  return (
    <>
      <div className="heading flex justify-between items-start">
        <div className="title-section flex-1">
          <div className="title text-5 fw-6 text-color-heading mb-2">
            {property.title}
          </div>
        </div>
      </div>
      <div className="info flex justify-between">
        <div className="feature">
          <p className="location text-1 flex items-center gap-10">
            <i className="icon-location" />
            {getDisplayLocation()}
          </p>
          <ul className="meta-list flex">
            {shouldDisplay(getBedrooms()) && (
              <li className="text-1 flex">
                <span>{getBedrooms()}</span>Bed
              </li>
            )}
            {shouldDisplay(getBathrooms()) && (
              <li className="text-1 flex">
                <span>{getBathrooms()}</span>Bath
              </li>
            )}
            {shouldDisplay(getArea()) && (
              <li className="text-1 flex">
                <span>{getArea()}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="info-detail">
        <div className="wrap-box">
          {/*<div className="box-icon">
            <div className="icons">
              <i className="icon-HouseLine" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">ID:</div>
              <div className="text-1 text-color-heading">{getPropertyId()}</div>
            </div>
          </div>*/}
          {shouldDisplay(getBedrooms()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Bed-2" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Bedrooms:</div>
                <div className="text-1 text-color-heading">{getBedrooms()} Rooms</div>
              </div>
            </div>
          )}
          {shouldDisplay(getBathrooms()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Bathtub" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Bathrooms:</div>
                <div className="text-1 text-color-heading">{getBathrooms()} Rooms</div>
              </div>
            </div>
          )}
        </div>
        <div className="wrap-box">
          {shouldDisplay(getPropertyType()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-SlidersHorizontal" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Type:</div>
                <div className="text-1 text-color-heading">{getPropertyType()}</div>
              </div>
            </div>
          )}
          {shouldDisplay(getParkingSpaces()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Garage-1" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Garages</div>
                <div className="text-1 text-color-heading">{getParkingSpaces()}</div>
              </div>
            </div>
          )}
        </div>
        <div className="wrap-box">
          {shouldDisplay(getArea()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Ruler" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Size:</div>
                <div className="text-1 text-color-heading">{getArea()}</div>
              </div>
            </div>
          )}
          {shouldDisplay(getLandSize()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Crop" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Land Size:</div>
                <div className="text-1 text-color-heading">{getLandSize()}</div>
              </div>
            </div>
          )}
        </div>
        <div className="wrap-box">
          {shouldDisplay(getYearBuilt()) && (
            <div className="box-icon">
              <div className="icons">
                <i className="icon-Hammer" />
              </div>
              <div className="content">
                <div className="text-4 text-color-default">Year Built:</div>
                <div className="text-1 text-color-heading">{getYearBuilt()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
