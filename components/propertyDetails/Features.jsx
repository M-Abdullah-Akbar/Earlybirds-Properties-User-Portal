import React from "react";

export default function Features({ property }) {
  // Helper function to check if amenities should be displayed
  const hasValidAmenities = (amenities) => {
    return amenities && Array.isArray(amenities) && amenities.length > 0 && 
           amenities.some(amenity => amenity && amenity.trim() !== "" && amenity !== "N/A");
  };

  // Filter out invalid amenities
  const filterValidAmenities = (amenities) => {
    return amenities.filter(amenity => amenity && amenity.trim() !== "" && amenity !== "N/A");
  };

  // Use property amenities if available and valid, otherwise don't show any
  const displayAmenities = hasValidAmenities(property?.amenities) 
    ? filterValidAmenities(property.amenities)
    : null;

  // If no valid amenities, don't render the component
  if (!displayAmenities) {
    return null;
  }

  // Split amenities into columns (3 columns)
  const itemsPerColumn = Math.ceil(displayAmenities.length / 3);
  const column1 = displayAmenities.slice(0, itemsPerColumn);
  const column2 = displayAmenities.slice(itemsPerColumn, itemsPerColumn * 2);
  const column3 = displayAmenities.slice(itemsPerColumn * 2);

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Amenities And Features
      </div>
      <div className="box-amenities">
        <div className="wrap-feature">
          {column1.length > 0 && (
            <div className="box-feature">
              <ul>
                {column1.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}
          {column2.length > 0 && (
            <div className="box-feature">
              <ul>
                {column2.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}
          {column3.length > 0 && (
            <div className="box-feature">
              <ul>
                {column3.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
