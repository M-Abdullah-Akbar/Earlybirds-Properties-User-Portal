"use client";
import DropdownSelect from "@/components/common/DropdownSelect";
//import SearchForm from "@/components/common/SearchForm";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackSearch } from "@/utils/analytics";


export default function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State to track the active item (For sale/For rent)
  const [activeItem, setActiveItem] = useState("For sale");
  
  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    propertyType: "",
    location: "",
    listingType: "sale" // Default to sale
  });

  // Array of items to render
  const items = ["For sale", "For rent", "Off Plan"];

  // Initialize state from URL parameters
  useEffect(() => {
    const listingType = searchParams.get("listingType");
    const propertyType = searchParams.get("propertyType");
    const emirate = searchParams.get("emirate");

    if (listingType) {
      let item = "For sale"; // Default
      if (listingType === "rent") {
        item = "For rent";
      } else if (listingType === "off plan") {
        item = "Off Plan";
      }
      setActiveItem(item);
      setSearchFilters(prev => ({ ...prev, listingType }));
    }

    if (propertyType) {
      setSearchFilters(prev => ({ ...prev, propertyType }));
    }

    if (emirate) {
      setSearchFilters(prev => ({ ...prev, location: emirate }));
    }
  }, [searchParams]);

  // Handle property type selection
  const handlePropertyTypeChange = (propertyType) => {
    setSearchFilters(prev => ({
      ...prev,
      propertyType: propertyType === "Property type" ? "" : propertyType
    }));
    
    // Track filter usage
    if (propertyType !== "Property type") {
      trackFilterUsage('propertyType', propertyType, {
        source: 'hero_search',
        listingType: searchFilters.listingType
      });
    }
  };

  // Handle location selection
  const handleLocationChange = (location) => {
    setSearchFilters(prev => ({
      ...prev,
      location: location === "Location" ? "" : location
    }));
    
    // Track filter usage
    if (location !== "Location") {
      trackFilterUsage('location', location, {
        source: 'hero_search',
        listingType: searchFilters.listingType
      });
    }
  };

  // Handle listing type change (For sale/For rent/Off Plan)
  const handleListingTypeChange = (item) => {
    setActiveItem(item);
    let listingType = "sale"; // Default
    
    if (item === "For rent") {
      listingType = "rent";
    } else if (item === "Off Plan") {
      listingType = "off plan";
    }
    
    setSearchFilters(prev => ({
      ...prev,
      listingType
    }));
    

  };

  // Handle search button click
  const handleSearch = () => {
    // Track the search event
    trackSearch("property_search", {
      listingType: searchFilters.listingType,
      propertyType: searchFilters.propertyType,
      location: searchFilters.location
    });

    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (searchFilters.propertyType) {
      queryParams.append("propertyType", searchFilters.propertyType);
    }
    
    if (searchFilters.location) {
      queryParams.append("emirate", searchFilters.location);
    }
    
    // Determine which page to navigate to based on listing type
    let targetPage = "/buy"; // Default
    
    if (searchFilters.listingType === "rent") {
      targetPage = "/rent";
    } else if (searchFilters.listingType === "off plan") {
      targetPage = "/off-plan-properties";
    }
    
    const queryString = queryParams.toString();
    const fullTargetUrl = queryString ? `${targetPage}?${queryString}` : targetPage;
    
    // Navigate to results page
    if (queryString) {
      router.push(`${targetPage}?${queryString}`);
    } else {
      router.push(targetPage);
    }
  };

  return (
    <div className="page-title home02">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">Earlybird Properties</h1>
                <p className="h6 fw-4" style={{ whiteSpace: 'nowrap' }}>
                  Own Tomorrow’s Dubai, Today
                </p>
              </div>
              <div className="widget-tabs style-1">
                <ul className="widget-menu-tab">
                  {items.map((item) => (
                    <li
                      key={item}
                      className={`item-title ${
                        activeItem === item ? "active" : ""
                      }`}
                      onClick={() => handleListingTypeChange(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="wg-filter">
                  <div className="widget-content-inner active">
                    <div className="form-title">
                      <DropdownSelect
                        options={[
                          "Property type",
                          "Apartment",
                          "Villa",
                          "Townhouse",
                          "Penthouse",
                          "Office",
                          "Studio"
                        ]}
                        addtionalParentClass=""
                        onChange={handlePropertyTypeChange}
                        defaultOption="Property type"
                        selectedValue={searchFilters.propertyType || "Property type"}
                      />

                      <DropdownSelect
                        options={[
                          "Location",
                          "Dubai",
                          "Abu Dhabi",
                          "Sharjah",
                          "Ajman",
                          "Ras al Khaimah",
                          "Umm al Quwain",
                          "Fujairah",
                        ]}
                        addtionalParentClass=""
                        onChange={handleLocationChange}
                        defaultOption="Location"
                        selectedValue={searchFilters.location || "Location"}
                      />
                      <div className="wrap-btn">
                        <button 
                          className="tf-btn bg-color-primary pd-3"
                          onClick={handleSearch}
                        >
                          Search <i className="icon-MagnifyingGlass fw-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
