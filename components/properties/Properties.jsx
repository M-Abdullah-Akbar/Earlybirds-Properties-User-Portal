"use client";
import React, { useState, useEffect } from "react";
import PropertyGridItems from "./PropertyGridItems";
import PropertyListItems from "./PropertyListItems";
import LayoutHandler from "./LayoutHandler";
import DropdownSelect from "../common/DropdownSelect";
import FilterModal from "./FilterModal";
import { propertyAPI } from "@/utils/api";


export default function Properties({ defaultGrid = false, propertyType = "", initialFilters = {} }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  });
  
  // Map propertyType to listingType for backend API
  const listingType = propertyType === "sale" ? "sale" : 
                     propertyType === "rent" ? "rent" : 
                     propertyType === "off-plan" ? "off plan" : "";
  
  const [filters, setFilters] = useState({
    // Include listing type in initial filters if provided
    ...(listingType && { listingType: listingType }),
    emirate: "",
    area: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    sortBy: "createdAt",
    // Apply initial filters from URL parameters
    ...(initialFilters.propertyType && { propertyType: initialFilters.propertyType }),
    ...(initialFilters.emirate && { emirate: initialFilters.emirate })
  });

  // State to track if we're using filtered results
  const [usingFilteredResults, setUsingFilteredResults] = useState(false);
  const [filteredResultsCount, setFilteredResultsCount] = useState(0);

  // Fetch properties from backend
  const fetchProperties = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("fetchProperties called with filterParams:", filterParams);
      
      // Filter out empty values to avoid validation errors
      const cleanFilters = Object.fromEntries(
        Object.entries(filterParams).filter(([key, value]) => {
          if (value === null || value === undefined || value === "") return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        })
      );
      
      const params = {
        page,
        limit: pagination.itemsPerPage,
        status: "available",
        // Always include listing type from page context
        ...(listingType && { listingType: listingType }),
        ...cleanFilters
      };

      console.log("fetchProperties - final API params:", params);
      
      const response = await propertyAPI.getProperties(params);
      
      if (response.success) {
        const fetchedProperties = response.data.properties || [];
        console.log(`Fetched ${fetchedProperties.length} properties`);
        
        setProperties(fetchedProperties);
        setPagination(prev => ({
          ...prev,
          currentPage: response.data.pagination?.current || page,
          totalPages: response.data.pagination?.pages || 1,
          totalItems: response.data.pagination?.total || 0,
          itemsPerPage: response.data.pagination?.limit || 12
        }));
      } else {
        console.error("API response error:", response);
        setError(response.message || "Failed to fetch properties");
        setProperties([]);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    console.log("Filter change received:", newFilters);
    
    // Reset filtered results state - wait for results from FilterModal
    setUsingFilteredResults(false);
    setFilteredResultsCount(0);
    
    // Map frontend filter names to backend API parameter names
    const mappedFilters = { ...newFilters };
    
    // Ensure listing type is always included from page context
    if (listingType) {
      mappedFilters.listingType = listingType;
    }
    
    // Don't override propertyType with listingType - they serve different purposes
    // propertyType = apartment, villa, etc.
    // listingType = sale, rent, off-plan
    
    // Handle price range
    if (mappedFilters.minPrice) {
      mappedFilters.minPrice = mappedFilters.minPrice;
    }
    if (mappedFilters.maxPrice) {
      mappedFilters.maxPrice = mappedFilters.maxPrice;
    }
    
    // Handle size range
    if (mappedFilters.minSize) {
      mappedFilters.minSize = mappedFilters.minSize;
    }
    if (mappedFilters.maxSize) {
      mappedFilters.maxSize = mappedFilters.maxSize;
    }
    
    // Handle amenities (convert array to string for backend)
    if (mappedFilters.amenities && Array.isArray(mappedFilters.amenities)) {
      mappedFilters.amenities = mappedFilters.amenities.join(', ');
    }
    
    console.log("Mapped filters for backend (with listing type):", mappedFilters);
    
    setFilters(prev => ({ ...prev, ...mappedFilters }));
    
    // Don't call fetchProperties here - wait for results from FilterModal
    // The FilterModal will call onResultsUpdate with the filtered results
  };

  // Handle results update from filter modal
  const handleResultsUpdate = (newResults) => {
    console.log("Results update received:", newResults);
    if (newResults && newResults.length > 0) {
      setProperties(newResults);
      setUsingFilteredResults(true);
      setFilteredResultsCount(newResults.length);
      setPagination(prev => ({
        ...prev,
        currentPage: 1,
        totalPages: 1,
        totalItems: newResults.length,
        itemsPerPage: newResults.length
      }));
      setError(null);
      setLoading(false);
    } else {
      // No results from filter
      setProperties([]);
      setUsingFilteredResults(true);
      setFilteredResultsCount(0);
      setPagination(prev => ({
        ...prev,
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 12
      }));
      setError(null);
      setLoading(false);
    }
  };

  // Clear filtered results and return to normal API loading
  const clearFilteredResults = () => {
    setUsingFilteredResults(false);
    setFilteredResultsCount(0);
    const clearedFilters = {
      ...(listingType && { listingType: listingType }),
      emirate: initialFilters.emirate || "",
      area: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      sortBy: "createdAt",
      // Preserve initial filters - don't override propertyType with listingType
      ...(initialFilters.propertyType && { propertyType: initialFilters.propertyType })
    };
    
    setFilters(clearedFilters);
    
    // Fetch properties from API again with the cleared filters
    fetchProperties(1, clearedFilters);
  };

  // Handle sort change
  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    
    if (usingFilteredResults) {
      // Sort the current filtered results
      const sortedProperties = [...properties].sort((a, b) => {
        switch (sortBy) {
          case "Newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "Oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "Price: Low to High":
            return (a.price || 0) - (b.price || 0);
          case "Price: High to Low":
            return (b.price || 0) - (a.price || 0);
          default:
            return 0;
        }
      });
      setProperties(sortedProperties);
    } else {
      // Make API call for sorting
      fetchProperties(1, { ...filters, sortBy });
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (usingFilteredResults) {
      // For filtered results, just update the current page
      // Since filtered results are already loaded, we don't need to make API calls
      setPagination(prev => ({
        ...prev,
        currentPage: page
      }));
    } else {
      // Make API call for pagination
      fetchProperties(page, filters);
    }
  };

  // Initial data fetch
  useEffect(() => {
    console.log("Properties component - initialFilters received:", initialFilters);
    console.log("Properties component - listingType:", listingType);
    
    // Update filters with initial values from URL parameters
    const updatedFilters = {
      ...(listingType && { listingType: listingType }),
      emirate: initialFilters.emirate || "",
      area: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      sortBy: "createdAt",
      // Apply initial filters from URL parameters
      ...(initialFilters.propertyType && { propertyType: initialFilters.propertyType })
    };
    
    console.log("Properties component - updatedFilters:", updatedFilters);
    
    // Update the filters state
    setFilters(updatedFilters);
    
    // Fetch properties with the updated filters
    fetchProperties(1, updatedFilters);
  }, [listingType, initialFilters]); // Re-fetch when listingType or initialFilters change

  return (
    <>
      <section className="section-property-layout mt-5">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="box-title">
                <h2>
                  {propertyType === "sale" ? "Properties for Sale" : 
                   propertyType === "rent" ? "Properties for Rent" : 
                   propertyType === "off-plan" ? "Off-Plan Properties" :
                   "Property listing"}
                  {usingFilteredResults && (
                    <span className="badge bg-primary ms-2">
                      Filtered Results ({filteredResultsCount})
                    </span>
                  )}
                </h2>
                <div className="right">
                  <div
                    className="filter-popup"
                    data-bs-toggle="modal"
                    href="#modalFilter"
                    role="button"
                  >
                    Filter
                    <div className="icons">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 4H14"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 4H3"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12H12"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H3"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 20H16"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20H3"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V6"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10V14"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 18V22"
                          stroke="#F1913D"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <ul className="nav-tab-filter group-layout" role="tablist">
                    <LayoutHandler defaultGrid={defaultGrid} />
                  </ul>

                  <DropdownSelect
                    addtionalParentClass="select-filter list-sort"
                    options={["Sort by (Default)", "Newest", "Oldest", "Price: Low to High", "Price: High to Low"]}
                    onChange={handleSortChange}
                  />
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading properties...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-5">
                  <div className="alert alert-danger" role="alert">
                    {error}
                    <button 
                      className="btn btn-outline-danger ms-3"
                      onClick={() => fetchProperties(1, filters)}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Properties Content */}
              {!loading && !error && (
                <div className="flat-animate-tab">
                  <div className="tab-content">
                    <div
                      className={`tab-pane ${defaultGrid ? " active show" : ""}`}
                      id="gridLayout"
                      role="tabpanel"
                    >
                      <div className="tf-grid-layout lg-col-3 md-col-2">
                        <PropertyGridItems properties={properties} />
                      </div>
                    </div>
                    <div
                      className={`tab-pane ${!defaultGrid ? " active show" : ""}`}
                      id="listLayout"
                      role="tabpanel"
                    >
                      <div className="tf-grid-layout lg-col-2">
                        <PropertyListItems properties={properties} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!loading && !error && properties.length === 0 && (
                <div className="text-center py-5">
                  <div className="alert alert-info" role="alert">
                    No properties found matching your criteria.
                  </div>
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && !usingFilteredResults && (
                <div className="wrap-pagination">
                  <p className="text-1">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} results.
                  </p>
                  <ul className="wg-pagination">
                    <li className={`arrow ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.currentPage > 1) {
                            handlePageChange(pagination.currentPage - 1);
                          }
                        }}
                      >
                        <i className="icon-arrow-left" />
                      </a>
                    </li>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <li key={pageNum} className={pageNum === pagination.currentPage ? "active" : ""}>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                          >
                            {pageNum}
                          </a>
                        </li>
                      );
                    })}
                    
                    {pagination.totalPages > 5 && (
                      <>
                        <li>
                          <a href="#">...</a>
                        </li>
                        <li>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pagination.totalPages);
                            }}
                          >
                            {pagination.totalPages}
                          </a>
                        </li>
                      </>
                    )}
                    
                    <li className={`arrow ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.currentPage < pagination.totalPages) {
                            handlePageChange(pagination.currentPage + 1);
                          }
                        }}
                      >
                        <i className="icon-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              {/* Filtered Results Info */}
              {/*{!loading && !error && usingFilteredResults && (
                <div className="wrap-pagination">
                  <p className="text-1">
                    Showing {filteredResultsCount} filtered results from advanced search.
                    <button 
                      className="btn btn-outline-primary ms-3"
                      onClick={clearFilteredResults}
                    >
                      Clear Filters & Show All
                    </button>
                  </p>
                </div>
              )}*/}
            </div>
          </div>
        </div>
      </section>
      <FilterModal 
        onFilterChange={handleFilterChange} 
        onResultsUpdate={handleResultsUpdate}
        listingType={listingType}
      />
    </>
  );
}
