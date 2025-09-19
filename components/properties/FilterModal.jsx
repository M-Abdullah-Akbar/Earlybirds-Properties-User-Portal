"use client";
import Slider from "rc-slider";
import React, { useState, useEffect } from "react";
import { propertyAPI, locationAPI } from "@/utils/api";
import CurrencyConverter from "../common/CurrencyConverter";

export default function FilterModal({ onFilterChange, onResultsUpdate, listingType = "" }) {
  const [priceRange, setPriceRange] = useState([100000, 5000000]);
  const [sizeRange, setSizeRange] = useState([200, 5000]);
  const [filters, setFilters] = useState({
    propertyType: "",
    emirate: "",
    area: ""
  });
  
  const [emirates, setEmirates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  
  // Dropdown open states
  const [openDropdowns, setOpenDropdowns] = useState({
    propertyType: false,
    emirate: false,
    area: false
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nice-select')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      console.log("Loading initial filter data...");
      
      // Load emirates from static data (since backend doesn't provide this for users)
      console.log("Loading emirates...");
      const emiratesResponse = await locationAPI.getEmirates();
      console.log("Emirates response:", emiratesResponse);
      if (emiratesResponse.success) {
        setEmirates(emiratesResponse.data || []);
        console.log("Emirates loaded:", emiratesResponse.data);
      } else {
        console.error("Failed to load emirates:", emiratesResponse);
      }

      // Load property types from static data
      console.log("Loading property types...");
      const propertyTypes = [
        "apartment", "villa", "townhouse", "penthouse", 
        "studio", "office"
      ];
      setPropertyTypes(propertyTypes);
      console.log("Property types loaded:", propertyTypes);
    } catch (error) {
      console.error("Error loading filter data:", error);
    } finally {
      setLoading(false);
      console.log("Initial data loading completed");
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

  // Toggle dropdown
  const toggleDropdown = (dropdownName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({
      propertyType: false,
      emirate: false,
      area: false
    });
  };

  // Handle dropdown option selection
  const handleOptionSelect = (dropdownName, value) => {
    setFilters(prev => ({ ...prev, [dropdownName]: value }));
    
    // Special handling for emirate change
    if (dropdownName === 'emirate') {
      handleEmirateChange(value);
    }
    
    // Special handling for property type change
    if (dropdownName === 'propertyType') {
      // Property type change handling (amenities removed)
    }
    
    // Close the dropdown
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownName]: false
    }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, dropdownName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown(dropdownName);
    } else if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  };

  // Utility function to safely render property data
  const safeRender = (value, fallback = '') => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'object') {
      // Handle location objects specifically
      if (value.address || value.area || value.emirate) {
        return value.address || `${value.area || ''} ${value.emirate || ''}`.trim() || 'Location not specified';
      }
      // For other objects, return fallback
      return fallback;
    }
    return String(value);
  };

  // Check if current filters would be valid
  const areFiltersValid = () => {
    const allFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      listingType: listingType
    };
    
    const validation = validateFilters(allFilters);
    return validation.isValid;
  };

  // Get active filters summary
  const getActiveFiltersSummary = () => {
    const activeFilters = [];
    
    if (filters.propertyType) {
      activeFilters.push(`Type: ${filters.propertyType}`);
    }
    if (filters.emirate) {
      activeFilters.push(`Emirate: ${filters.emirate}`);
    }
    if (filters.area) {
      activeFilters.push(`Area: ${filters.area}`);
    }
    if (priceRange[0] !== 100000 || priceRange[1] !== 5000000) {
      activeFilters.push(`Price: AED ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`);
    }
    if (sizeRange[0] !== 200 || sizeRange[1] !== 5000) {
      activeFilters.push(`Size: ${sizeRange[0]} - ${sizeRange[1]} sqft`);
    }
    
    return activeFilters;
  };

  // Validate that at least one filter is selected
  const validateFilters = (filterParams) => {
    const hasPropertyType = filterParams.propertyType && filterParams.propertyType.trim() !== '';
    const hasEmirate = filterParams.emirate && filterParams.emirate.trim() !== '';
    const hasArea = filterParams.area && filterParams.area.trim() !== '';
    
    // Check if price range has been modified from default
    const defaultMinPrice = 100000;
    const defaultMaxPrice = 5000000;
    const hasPriceRange = filterParams.minPrice !== defaultMinPrice || filterParams.maxPrice !== defaultMaxPrice;
    
    // Check if size range has been modified from default
    const defaultMinSize = 200;
    const defaultMaxSize = 5000;
    const hasSizeRange = filterParams.minSize !== defaultMinSize || filterParams.maxSize !== defaultMaxSize;

    // Check if at least one meaningful filter is applied
    const hasFilters = hasPropertyType || hasEmirate || hasArea || hasPriceRange || hasSizeRange;

    if (!hasFilters) {
      return {
        isValid: false,
        error: "At least one filter field is required. Please select property type, emirate, area, price range, or size range."
      };
    }

    return { isValid: true };
  };

  // Fetch filtered results from backend
  const fetchFilteredResults = async (filterParams) => {
    try {
      setFilterLoading(true);
      setError(null);
      
      // Validate filters first
      const validation = validateFilters(filterParams);
      if (!validation.isValid) {
        setError(validation.error);
        setResults([]);
        setTotalResults(0);
        return;
      }
      
      // Prepare API parameters with listing type context
      const apiParams = {
        status: 'available',
        page: 1,
        limit: 20, // Show first 20 results
        // Include listing type from page context if not already in filterParams
        ...({ listingType: listingType }),
        ...filterParams
      };

      // Remove empty values and handle special cases
      Object.keys(apiParams).forEach(key => {
        if (apiParams[key] === "" || apiParams[key] === null || apiParams[key] === undefined) {
          delete apiParams[key];
        }
        // Handle arrays
        if (Array.isArray(apiParams[key]) && apiParams[key].length === 0) {
          delete apiParams[key];
        }
      });

      // Handle amenities array - convert to text search for backend
      // if (apiParams.amenities && apiParams.amenities.length > 0) { // This state is removed
      //   // For now, we'll search by amenities as a text field
      //   // Backend can be enhanced to support array-based amenity filtering
      //   apiParams.amenities = apiParams.amenities.join(', ');
      // }

      // Handle bathrooms filter - map to backend field
      // if (apiParams.bathrooms) { // This state is removed
      //   apiParams['details.bathrooms'] = apiParams.bathrooms;
      //   delete apiParams.bathrooms;
      // }

      // Handle bedrooms filter - map to backend field
      // if (apiParams.bedrooms) { // This state is removed
      //   apiParams['details.bedrooms'] = apiParams.bedrooms;
      //   delete apiParams.bedrooms;
      // }

      // Handle property type - map to listingType for backend
      // if (apiParams.propertyType) {
      //   apiParams.listingType = apiParams.propertyType;
      //   delete apiParams.propertyType;
      // }

      // Keep price and size as direct parameters (don't convert to MongoDB objects)
      // The backend expects: minPrice, maxPrice, minSize, maxSize
      if (apiParams.minPrice) {
        apiParams.minPrice = Number(apiParams.minPrice);
      }
      if (apiParams.maxPrice) {
        apiParams.maxPrice = Number(apiParams.maxPrice);
      }
      if (apiParams.minSize) {
        apiParams.minSize = Number(apiParams.minSize);
      }
      if (apiParams.maxSize) {
        apiParams.maxSize = Number(apiParams.maxSize);
      }

      // Keep location fields as is - backend expects emirate and area directly
      // No transformation needed

      // Validate and clean parameters
      const validatedParams = {};
      Object.keys(apiParams).forEach(key => {
        const value = apiParams[key];
        
        // Skip undefined, null, empty strings, and empty arrays
        if (value === undefined || value === null || value === '' || 
            (Array.isArray(value) && value.length === 0)) {
          return;
        }
        
        // Handle numeric values (price and size ranges)
        if (['minPrice', 'maxPrice', 'minSize', 'maxSize'].includes(key)) {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue >= 0) {
            validatedParams[key] = numValue;
          }
          return;
        }
        
        // Handle other parameters
        validatedParams[key] = value;
      });

      console.log("Final validated API params:", validatedParams);
      console.log("API params type check:", {
        minPrice: { value: validatedParams.minPrice, type: typeof validatedParams.minPrice },
        maxPrice: { value: validatedParams.maxPrice, type: typeof validatedParams.maxPrice },
        minSize: { value: validatedParams.minSize, type: typeof validatedParams.minSize },
        maxSize: { value: validatedParams.maxSize, type: typeof validatedParams.maxSize },
        listingType: { value: validatedParams.listingType, type: typeof validatedParams.listingType },
        emirate: { value: validatedParams.emirate, type: typeof validatedParams.emirate },
        area: { value: validatedParams.area, type: typeof validatedParams.area }
      });
      
      const response = await propertyAPI.getProperties(validatedParams);
      
      if (response.success) {
        // Ensure all properties have safe display values
        const safeProperties = (response.data.properties || []).map(property => {
          console.log("Processing property:", property);
          
          const safeProperty = {
            ...property,
            // Ensure title is a string
            title: property.title || property.name || 'Property',
            // Ensure location is safely handled
            location: property.location && typeof property.location === 'object' 
              ? property.location.address || `${property.location.area || ''} ${property.location.emirate || ''}`.trim() || 'Location not specified'
              : property.location || 'Location not specified',
            // Ensure price is safely handled
            price: typeof property.price === 'number' ? property.price : 0
          };
          
          console.log("Safe property:", safeProperty);
          return safeProperty;
        });
        
        setResults(safeProperties);
        setTotalResults(response.data.pagination?.total || 0);
        setError(null);
        
        // Update parent component with results
        if (onResultsUpdate) {
          onResultsUpdate(safeProperties);
        }
      } else {
        console.error("Failed to fetch filtered results:", response);
        const errorMessage = response.error || response.message || "Failed to fetch results";
        setError(errorMessage);
        setResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching filtered results:", error);
      
      // Better error handling for different error types
      let errorMessage = "Network error. Please check your connection and try again.";
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = `Bad request: ${data?.message || 'Invalid filter parameters'}`;
        } else if (status === 404) {
          errorMessage = "No properties found with the specified criteria";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data?.message || `Request failed with status ${status}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something else happened
        errorMessage = error.message || "An unexpected error occurred";
      }
      
      setError(errorMessage);
      setResults([]);
      setTotalResults(0);
    } finally {
      setFilterLoading(false);
    }
  };

  // Apply filters
  const applyFilters = async () => {
    // Collect all filter values including ranges
    const allFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      // Include listing type from page context
      listingType: listingType
    };
    
    // Validate filters before applying
    const validation = validateFilters(allFilters);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    // Clean up filter parameters - remove empty values
    const cleanFilters = { ...allFilters };
    Object.keys(cleanFilters).forEach(key => {
      if (cleanFilters[key] === "" || cleanFilters[key] === null || cleanFilters[key] === undefined) {
        delete cleanFilters[key];
      }
      if (Array.isArray(cleanFilters[key]) && cleanFilters[key].length === 0) {
        delete cleanFilters[key];
      }
    });

    // Ensure numeric values are properly formatted
    if (cleanFilters.minPrice !== undefined) {
      cleanFilters.minPrice = Number(cleanFilters.minPrice);
    }
    if (cleanFilters.maxPrice !== undefined) {
      cleanFilters.maxPrice = Number(cleanFilters.maxPrice);
    }
    if (cleanFilters.minSize !== undefined) {
      cleanFilters.minSize = Number(cleanFilters.minSize);
    }
    if (cleanFilters.maxSize !== undefined) {
      cleanFilters.maxSize = Number(cleanFilters.maxSize);
    }

    // Handle amenities array properly
    // if (cleanFilters.amenities && Array.isArray(cleanFilters.amenities)) { // This state is removed
    //   if (cleanFilters.amenities.length === 0) {
    //     delete cleanFilters.amenities;
    //   } else {
    //     cleanFilters.amenities = cleanFilters.amenities.join(', ');
    //   }
    // }
    
    console.log("Applying filters with listing type context:", cleanFilters);
    
    // Call parent filter change handler with all collected filters
    if (onFilterChange) {
      onFilterChange(cleanFilters);
    }
    
    // Fetch filtered results for preview
    await fetchFilteredResults(cleanFilters);
    
    // Close modal using multiple methods for reliability
    const modal = document.getElementById('modalFilter');
    if (modal) {
      // Method 1: Try to use Bootstrap if available
      try {
        if (typeof window !== 'undefined' && window.bootstrap) {
          const modalInstance = window.bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
            return;
          }
        }
      } catch (error) {
        console.log('Bootstrap not available, using fallback method');
      }
      
      // Method 2: Use data attribute to trigger modal close
      const closeButton = modal.querySelector('[data-bs-dismiss="modal"]');
      if (closeButton) {
        closeButton.click();
        return;
      }
      
      // Method 3: Manually hide the modal
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
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
      area: ""
    });
    setAreas([]);
    setResults([]);
    setTotalResults(0);
    setError(null);
    closeAllDropdowns();
    
    // Clear results in parent component
    if (onResultsUpdate) {
      onResultsUpdate([]);
    }
  };

  // Preview filters (fetch results without closing modal)
  const previewFilters = async () => {
    // Collect all filter values including ranges
    const allFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      propertyType: filters.propertyType,
      emirate: filters.emirate,
      area: filters.area,
      // Include listing type from page context
      listingType: listingType
    };
    
    // Validate filters before previewing
    const validation = validateFilters(allFilters);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    // Clean up filter parameters - remove empty values
    const cleanFilters = { ...allFilters };
    Object.keys(cleanFilters).forEach(key => {
      if (cleanFilters[key] === "" || cleanFilters[key] === null || cleanFilters[key] === undefined) {
        delete cleanFilters[key];
      }
      if (Array.isArray(cleanFilters[key]) && cleanFilters[key].length === 0) {
        delete cleanFilters[key];
      }
    });

    // Ensure numeric values are properly formatted
    if (cleanFilters.minPrice !== undefined) {
      cleanFilters.minPrice = Number(cleanFilters.minPrice);
    }
    if (cleanFilters.maxPrice !== undefined) {
      cleanFilters.maxPrice = Number(cleanFilters.maxPrice);
    }
    if (cleanFilters.minSize !== undefined) {
      cleanFilters.minSize = Number(cleanFilters.minSize);
    }
    if (cleanFilters.maxSize !== undefined) {
      cleanFilters.maxSize = Number(cleanFilters.maxSize);
    }

    // Handle amenities array properly
    // if (cleanFilters.amenities && Array.isArray(cleanFilters.amenities)) { // This state is removed
    //   if (cleanFilters.amenities.length === 0) {
    //     delete cleanFilters.amenities;
    //   } else {
    //     cleanFilters.amenities = cleanFilters.amenities.join(', ');
    //   }
    // }
    
    console.log("Previewing filters with listing type context:", cleanFilters);
    await fetchFilteredResults(cleanFilters);
  };

  return (
    <div className="modal modal-filter fade" id="modalFilter">
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
              {/*<div className="widget-price">
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
              </div>*/}
            </div>
            
            <div className="group-select">
              <div className="box-select">
                <div 
                  className={`nice-select ${openDropdowns.propertyType ? 'open' : ''}`} 
                  tabIndex={0}
                  onClick={() => toggleDropdown('propertyType')}
                  onKeyDown={(e) => handleKeyDown(e, 'propertyType')}
                >
                  <span className="current">
                    {filters.propertyType || "Property Type"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('propertyType', '');
                      }}
                    >
                      Any Type
                    </li>
                    {propertyTypes.map((type, index) => (
                      <li 
                        key={index}
                        data-value={type} 
                        className="option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect('propertyType', type);
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div 
                  className={`nice-select ${openDropdowns.emirate ? 'open' : ''}`} 
                  tabIndex={0}
                  onClick={() => toggleDropdown('emirate')}
                  onKeyDown={(e) => handleKeyDown(e, 'emirate')}
                >
                  <span className="current">
                    {filters.emirate || "Emirate"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('emirate', '');
                      }}
                    >
                      Any Emirate
                    </li>
                    {emirates.map((emirate, index) => (
                      <li 
                        key={index}
                        data-value={emirate} 
                        className="option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect('emirate', emirate);
                        }}
                      >
                        {emirate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="box-select">
                <div 
                  className={`nice-select ${openDropdowns.area ? 'open' : ''}`} 
                  tabIndex={0}
                  onClick={() => toggleDropdown('area')}
                  onKeyDown={(e) => handleKeyDown(e, 'area')}
                >
                  <span className="current">
                    {filters.area || "Area"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('area', '');
                      }}
                    >
                      Any Area
                    </li>
                    {areas.map((area, index) => (
                      <li 
                        key={index}
                        data-value={area} 
                        className="option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect('area', area);
                        }}
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* <div className="box-select"> // This state is removed
                <div 
                  className={`nice-select ${openDropdowns.bedrooms ? 'open' : ''}`} 
                  tabIndex={0}
                  onClick={() => toggleDropdown('bedrooms')}
                  onKeyDown={(e) => handleKeyDown(e, 'bedrooms')}
                >
                  <span className="current">
                    {filters.bedrooms || "Bedrooms"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('bedrooms', '');
                      }}
                    >
                      Any
                    </li>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <li 
                        key={num}
                        data-value={num} 
                        className="option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect('bedrooms', num);
                        }}
                      >
                        {num}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              
              {/* <div className="box-select"> // This state is removed
                <div 
                  className={`nice-select ${openDropdowns.bathrooms ? 'open' : ''}`} 
                  tabIndex={0}
                  onClick={() => toggleDropdown('bathrooms')}
                  onKeyDown={(e) => handleKeyDown(e, 'bathrooms')}
                >
                  <span className="current">
                    {filters.bathrooms || "Bathrooms"}
                  </span>
                  <ul className="list">
                    <li 
                      data-value="" 
                      className="option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('bathrooms', '');
                      }}
                    >
                      Any
                    </li>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <li 
                        key={num}
                        data-value={num} 
                        className="option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionSelect('bathrooms', num);
                        }}
                      >
                        {num}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
            </div>
            
            {/* <div className="group-checkbox"> // This state is removed
              <div className="title text-4 fw-6">Amenities:</div>
              {!filters.propertyType && (
                <div className="text-muted text-center p-2 mb-3 bg-light border rounded">
                  <small>💡 Select a property type first to see relevant amenities</small>
                </div>
              )}
              <div className="group-amenities">
                {amenitiesLoading ? ( // This state is removed
                  // Show loading state when amenities are being fetched
                  <div className="text-center p-3">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-muted">Loading amenities for {filters.propertyType}...</span>
                  </div>
                ) : availableAmenities.length > 0 ? ( // This state is removed
                  // Show amenities specific to selected property type
                  availableAmenities.map((amenity, index) => (
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
                  ))
                ) : filters.propertyType ? ( // This state is removed
                  // Show message when no amenities available for selected property type
                  <div className="text-muted text-center p-3">
                    No specific amenities available for {filters.propertyType}. 
                    Select a different property type or proceed without amenities.
                  </div>
                ) : (
                  // Show default amenities when no property type is selected
                  [
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
                  ))
                )}
              </div>
            </div> */}

            {/* Active Filters Summary */}
            {getActiveFiltersSummary().length > 0 && (
              <div className="active-filters mt-4 p-3 bg-primary text-white border rounded">
                <div className="title text-4 fw-6 mb-2">
                  🎯 Active Filters:
                </div>
                <div className="filter-tags">
                  {getActiveFiltersSummary().map((filter, index) => (
                    <span key={index} className="badge bg-light text-dark me-2 mb-1">
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* No Filters Warning */}
            {getActiveFiltersSummary().length === 0 && (
              <div className="no-filters-warning mt-4 p-3 bg-warning text-dark border rounded">
                <div className="title text-4 fw-6 mb-2">
                  ⚠️ No Filters Selected
                </div>
                <p className="mb-0 text-dark">
                  Please select at least one filter to narrow down your property search. 
                  You can choose from property type, emirate, area, price range, or size range.
                </p>
              </div>
            )}

            {/* Results Preview */}
            {results.length > 0 && (
              <div className="results-preview mt-4 p-3 bg-light border rounded">
                <div className="title text-4 fw-6 mb-3 text-dark">
                  Found {totalResults} properties
                </div>
                <div className="preview-list">
                  {results.slice(0, 3).map((property, index) => (
                    <div key={property._id || index} className="preview-item mb-2 p-2 bg-white border rounded d-flex justify-content-between align-items-center">
                      <div className="property-info">
                        <h6 className="mb-1 text-dark fw-600" style={{ fontSize: '14px', margin: 0 }}>
                          {safeRender(property.title, 'Property')}
                        </h6>
                        <p className="mb-1 text-muted" style={{ fontSize: '12px', margin: 0 }}>
                          {safeRender(property.location, 'Location not specified')}
                        </p>
                      </div>
                      <span className="price text-success fw-600" style={{ fontSize: '14px' }}>
                        AED {property.price && typeof property.price === 'number' ? property.price.toLocaleString() : 'Price not specified'}
                      </span>
                    </div>
                  ))}
                  {totalResults > 3 && (
                    <div className="more-results text-center p-2 text-muted fst-italic" style={{ fontSize: '14px' }}>
                      +{totalResults - 3} more properties
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No Results State */}
            {!filterLoading && !error && results.length === 0 && totalResults === 0 && (
              <div className="no-results mt-4 p-3 bg-secondary text-muted border rounded text-center" style={{ fontSize: '14px' }}>
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="error-message mt-4 p-3 bg-danger text-white border rounded" style={{ fontSize: '14px' }}>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">🚨</span>
                  <strong>Filter Error:</strong>
                </div>
                <p className="mb-0">{error}</p>
                <div className="mt-2">
                  <small>
                    💡 Tip: Make sure you've selected at least one filter field before applying.
                  </small>
                </div>
              </div>
            )}
            
            <div className="group-btn flex gap-12 mt-5">
              <button 
                className="tf-btn style-border w-full"
                onClick={applyFilters}
                disabled={loading || filterLoading || !areFiltersValid()}
              >
                {filterLoading ? "Loading..." : "Apply Filters"}
              </button>
             <button 
                className="tf-btn style-border w-full"
                onClick={previewFilters}
                disabled={loading || filterLoading || !areFiltersValid()}
              >
                Preview Results
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
