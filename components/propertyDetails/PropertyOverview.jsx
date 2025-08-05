import React from "react";

export default function PropertyOverview({ property }) {
  return (
    <>
      <div className="heading flex justify-between">
        <div className="title text-5 fw-6 text-color-heading">
          {property.title}
        </div>
      </div>
      <div className="info flex justify-between">
        <div className="feature">
          <p className="location text-1 flex items-center gap-10">
            <i className="icon-location" />
            {property.location}
          </p>
          <ul className="meta-list flex">
            <li className="text-1 flex">
              <span>{property.beds}</span>Bed
            </li>
            <li className="text-1 flex">
              <span>{property.baths}</span>Bath
            </li>
            <li className="text-1 flex">
              <span>{property.sqft}</span>Sqft
            </li>
          </ul>
        </div>
      </div>
      <div className="info-detail">
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-HouseLine" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">ID:</div>
              <div className="text-1 text-color-heading">2297</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Bathtub" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Bathrooms:</div>
              <div className="text-1 text-color-heading">2 Rooms</div>
            </div>
          </div>
        </div>
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-SlidersHorizontal" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Type:</div>
              <div className="text-1 text-color-heading">Hourse</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Crop" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Land Size:</div>
              <div className="text-1 text-color-heading">2,000 SqFt</div>
            </div>
          </div>
        </div>
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Garage-1" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Garages</div>
              <div className="text-1 text-color-heading">1</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Hammer" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Year Built:</div>
              <div className="text-1 text-color-heading">2023</div>
            </div>
          </div>
        </div>
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Bed-2" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Bedrooms:</div>
              <div className="text-1 text-color-heading">2 Rooms</div>
            </div>
          </div>
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Ruler" />
            </div>
            <div className="content">
              <div className="text-4 text-color-default">Size:</div>
              <div className="text-1 text-color-heading">900 SqFt</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
