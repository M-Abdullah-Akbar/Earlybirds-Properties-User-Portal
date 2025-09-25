"use client";

import { useEffect, useRef, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import Slider from "rc-slider";
import { trackFilterUsage, trackCustomEvent } from "@/utils/analytics";

export default function SearchForm({ parentClass = "wd-search-form" }) {
  const searchFormRef = useRef();
  const [priceRange, setPriceRange] = useState([100, 700]);
  const [sizeRange, setSizeRange] = useState([200, 820]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    province: '',
    rooms: '',
    bathrooms: '',
    bedrooms: ''
  });

  useEffect(() => {
    const searchFormToggler = document.querySelector(".searchFormToggler");

    const handleToggle = () => {
      searchFormRef.current.classList.toggle("show");
      
      // Track search form toggle
      trackCustomEvent('search_form_toggle', {
        action: searchFormRef.current.classList.contains("show") ? 'open' : 'close',
        form_type: 'advanced_search'
      });
    };

    if (searchFormToggler) {
      searchFormToggler.addEventListener("click", handleToggle);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (searchFormToggler) {
        searchFormToggler.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  // Track price range changes
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    
    // Track price filter usage
    trackFilterUsage('price_range', {
      min_price: newRange[0],
      max_price: newRange[1],
      range_span: newRange[1] - newRange[0],
      filter_type: 'price_slider'
    });
  };

  // Track size range changes
  const handleSizeRangeChange = (newRange) => {
    setSizeRange(newRange);
    
    // Track size filter usage
    trackFilterUsage('size_range', {
      min_size: newRange[0],
      max_size: newRange[1],
      range_span: newRange[1] - newRange[0],
      filter_type: 'size_slider'
    });
  };

  // Track dropdown selections
  const handleDropdownChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));

    // Track dropdown filter usage
    trackFilterUsage('dropdown_filter', {
      filter_type: filterType,
      selected_value: value,
      filter_category: 'property_specifications'
    });
  };

  // Track amenity selections
  const handleAmenityChange = (amenity, isChecked) => {
    let updatedAmenities;
    if (isChecked) {
      updatedAmenities = [...selectedAmenities, amenity];
    } else {
      updatedAmenities = selectedAmenities.filter(item => item !== amenity);
    }
    
    setSelectedAmenities(updatedAmenities);

    // Track amenity filter usage
    trackFilterUsage('amenity_filter', {
      amenity_name: amenity,
      action: isChecked ? 'add' : 'remove',
      total_selected: updatedAmenities.length,
      selected_amenities: updatedAmenities
    });
  };

  // Amenities list for easier management
  const amenities = [
    "Bed linens",
    "Carbon alarm", 
    "Check-in lockbox",
    "Coffee maker",
    "Dishwasher",
    "Fireplace",
    "Extra pillows",
    "First aid kit",
    "Hangers",
    "Iron",
    "Microwave",
    "Refrigerator",
    "Security cameras",
    "Smoke alarm"
  ];

  return (
    <div className={parentClass} ref={searchFormRef}>
      <div className="group-price">
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Price range</span>
            <div className="caption-price">
              <span>from</span>{" "}
              <span className="value fw-6" id="slider-range-value1">
                ${priceRange[0].toLocaleString()}
              </span>{" "}
              <span>to</span>
              <span className="value fw-6" id="slider-range-value2">
                {" "}
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
        </div>
        <div className="widget-price">
          <div className="box-title-price">
            <span className="title-price">Size range</span>
            <div className="caption-price">
              <span>from</span>{" "}
              <span className="value fw-6" id="slider-range-value01">
                {sizeRange[0]}
              </span>{" "}
              <span>to</span>{" "}
              <span className="value fw-6" id="slider-range-value02">
                {sizeRange[1]}
              </span>
            </div>
          </div>
          <Slider
            range
            max={1000}
            min={0}
            value={sizeRange}
            onChange={handleSizeRangeChange}
          />
        </div>
      </div>
      <div className=" group-select">
        <div className="box-select">
          <DropdownSelect
            options={[
              "Province / States",
              "California",
              "Texas",
              "Florida",
              "New York",
              "Illinois",
              "Washington",
              "Pennsylvania",
            ]}
            addtionalParentClass=""
            onSelectionChange={(value) => handleDropdownChange('province', value)}
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Rooms", "1", "2", "3", "4", "5", "6", "7", "8"]}
            addtionalParentClass=""
            onSelectionChange={(value) => handleDropdownChange('rooms', value)}
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Bath: Any", "1", "2", "3"]}
            addtionalParentClass=""
            onSelectionChange={(value) => handleDropdownChange('bathrooms', value)}
          />
        </div>
        <div className="box-select">
          <DropdownSelect
            options={["Beds: Any", "1", "2", "3", "4", "5", "6"]}
            addtionalParentClass=""
            onSelectionChange={(value) => handleDropdownChange('bedrooms', value)}
          />
        </div>
      </div>
      <div className="group-checkbox">
        <div className=" title text-4 fw-6">Amenities:</div>
        <div className="group-amenities ">
          {amenities.map((amenity, index) => (
            <fieldset key={amenity} className={`checkbox-item style-1 ${index > 0 ? 'mt-12' : ''}`}>
              <label>
                <span className="text-4">{amenity}</span>
                <input 
                  type="checkbox" 
                  onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                  checked={selectedAmenities.includes(amenity)}
                />
                <span className="btn-checkbox" />
              </label>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
}
