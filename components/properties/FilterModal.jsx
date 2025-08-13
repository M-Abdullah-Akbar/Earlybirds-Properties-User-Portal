"use client";
import Slider from "rc-slider";
import React, { useState, useEffect } from "react";
import { locationAPI, staticDataAPI } from "@/utils/api";

export default function FilterModal({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([100000, 5000000]);
  const [sizeRange, setSizeRange] = useState([200, 5000]);
  const [filters, setFilters] = useState({
    propertyType: "",
    emirate: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: []
  });
  
  const [emirates, setEmirates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load emirates
      const emiratesResponse = await locationAPI.getEmirates();
      if (emiratesResponse.success) {
        setEmirates(emiratesResponse.data || []);
      }

      // Load property types
      const typesResponse = await staticDataAPI.getPropertyTypes();
      if (typesResponse.success) {
        setPropertyTypes(typesResponse.data || []);
      }
    } catch (error) {
      console.error("Error loading filter data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load areas when emirate changes
  const handleEmirateChange = async (emirate) => {
    setFilters(prev => ({ ...prev, emirate, area: "" }));
    setAreas([]);
    
    if (emirate) {
      try {
        const response = await locationAPI.getAreas(emirate);
        if (response.success) {
          setAreas(response.data || []);
        }
      } catch (error) {
        console.error("Error loading areas:", error);
      }
    }
  };

  // Apply filters
  const applyFilters = () => {
    const filterParams = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    
    if (onFilterChange) {
      onFilterChange(filterParams);
    }
    
    // Close modal
    const modal = document.getElementById('modalFilter');
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([100000, 5000000]);
    setSizeRange([200, 5000]);
    setFilters({
      propertyType: "",
      emirate: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      amenities: []
    });
    setAreas([]);
  };

  return (
    <div className="modal modal-filter fade" id="modalFilter">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="wd-search-form style-3">
            <div className="title-box">
              <h4>Advanced Search</h4>
              <span
                className="close-modal icon-close"
                data-bs-dismiss="modal"
              />
            </div>
            
            <div className="group-price">
              <div className="widget-price">
                <div className="box-title-price">
                  <span className="title-price">Price (AED)</span>
                  <div className="caption-price">
                    <span>from</span>{" "}
                    <span className="value fw-6" id="slider-range-value1">
                      {priceRange[0].toLocaleString()}
                    </span>{" "}
                    <span>to</span>
                    <span className="value fw-6" id="slider-range-value2">
                      {" "}
                      {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
                <Slider
                  range
                  max={10000000}
                  min={0}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>
              <div className="widget-price">
                <div className="box-title-price">
                  <span className="title-price">Size range (sqft)</span>
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
                  max={10000}
                  min={0}
                  value={sizeRange}
                  onChange={setSizeRange}
                />
              </div>
            </div>
            
            <div className="group-select">
              <div className="box-select">
                <div className="nice-select" tabIndex={0}>
                  <span className="current">
                    {filters.propertyType || "Property Type"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={() => setFilters(prev => ({ ...prev, propertyType: "" }))}
                    >
                      Any Type
                    </li>
                    {propertyTypes.map((type, index) => (
                      <li 
                        key={index}
                        data-value={type} 
                        className="option"
                        onClick={() => setFilters(prev => ({ ...prev, propertyType: type }))}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div className="nice-select" tabIndex={0}>
                  <span className="current">
                    {filters.emirate || "Emirate"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={() => handleEmirateChange("")}
                    >
                      Any Emirate
                    </li>
                    {emirates.map((emirate, index) => (
                      <li 
                        key={index}
                        data-value={emirate} 
                        className="option"
                        onClick={() => handleEmirateChange(emirate)}
                      >
                        {emirate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div className="nice-select" tabIndex={0}>
                  <span className="current">
                    {filters.area || "Area"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={() => setFilters(prev => ({ ...prev, area: "" }))}
                    >
                      Any Area
                    </li>
                    {areas.map((area, index) => (
                      <li 
                        key={index}
                        data-value={area} 
                        className="option"
                        onClick={() => setFilters(prev => ({ ...prev, area }))}
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div className="nice-select" tabIndex={0}>
                  <span className="current">
                    {filters.bedrooms || "Bedrooms"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={() => setFilters(prev => ({ ...prev, bedrooms: "" }))}
                    >
                      Any
                    </li>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <li 
                        key={num}
                        data-value={num} 
                        className="option"
                        onClick={() => setFilters(prev => ({ ...prev, bedrooms: num }))}
                      >
                        {num}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div className="nice-select" tabIndex={0}>
                  <span className="current">
                    {filters.bathrooms || "Bathrooms"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={() => setFilters(prev => ({ ...prev, bathrooms: "" }))}
                    >
                      Any
                    </li>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <li 
                        key={num}
                        data-value={num} 
                        className="option"
                        onClick={() => setFilters(prev => ({ ...prev, bathrooms: num }))}
                      >
                        {num}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="group-checkbox">
              <div className="title text-4 fw-6">Amenities:</div>
              <div className="group-amenities">
                {[
                  "Parking", "Gym", "Pool", "Garden", "Balcony", "Elevator", 
                  "Security", "Central AC", "Furnished", "Pet Friendly"
                ].map((amenity, index) => (
                  <fieldset key={index} className="checkbox-item style-1 mt-12">
                    <label>
                      <span className="text-4">{amenity}</span>
                      <input 
                        type="checkbox" 
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              amenities: [...prev.amenities, amenity]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              amenities: prev.amenities.filter(a => a !== amenity)
                            }));
                          }
                        }}
                      />
                      <span className="btn-checkbox" />
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            
            <div className="group-btn flex gap-12 mt-24">
              <button 
                className="tf-btn style-1 w-full"
                onClick={applyFilters}
                disabled={loading}
              >
                {loading ? "Loading..." : "Apply Filters"}
              </button>
              <button 
                className="tf-btn style-border w-full"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
