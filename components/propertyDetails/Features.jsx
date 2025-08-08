import React from "react";

export default function Features({ property }) {
  // Get amenities from property data
  const amenities = property?.amenities || [];
  
  // If no amenities, show default ones
  const defaultAmenities = [
    "Smoke alarm",
    "Carbon monoxide alarm", 
    "First aid kit",
    "Self check-in with lockbox",
    "Security cameras",
    "Hangers",
    "Bed linens",
    "Extra pillows & blankets",
    "Iron",
    "TV with standard cable",
    "Refrigerator",
    "Microwave",
    "Dishwasher",
    "Coffee maker"
  ];

  const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities;

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
      <div className="wrap-feature">
        {column1.length > 0 && (
          <div className="box-feature">
            <ul>
              {column1.map((amenity, index) => (
                <li key={index} className="feature-item">{amenity}</li>
              ))}
            </ul>
          </div>
        )}
        {column2.length > 0 && (
          <div className="box-feature">
            <ul>
              {column2.map((amenity, index) => (
                <li key={index} className="feature-item">{amenity}</li>
              ))}
            </ul>
          </div>
        )}
        {column3.length > 0 && (
          <div className="box-feature">
            <ul>
              {column3.map((amenity, index) => (
                <li key={index} className="feature-item">{amenity}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
