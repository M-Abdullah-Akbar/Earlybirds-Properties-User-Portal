"use client";
import React, { useState, useEffect } from "react";
import PropertyGridItems from "./PropertyGridItems";
import PropertyListItems from "./PropertyListItems";
import LayoutHandler from "./LayoutHandler";
import DropdownSelect from "../common/DropdownSelect";
import FilterModal from "./FilterModal";
import { propertyAPI } from "@/utils/api";


export default function Properties({ defaultGrid = false, propertyType = "" }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });
  const [filters, setFilters] = useState({
    ...(propertyType && { listingType: propertyType }), // Map propertyType to listingType for backend
    emirate: "",
    area: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    sortBy: "createdAt"
  });

  // Fetch properties from backend
  const fetchProperties = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter out empty values to avoid validation errors
      const cleanFilters = Object.fromEntries(
        Object.entries(filterParams).filter(([key, value]) => 
          value !== null && value !== undefined && value !== ''
        )
      );
      
      const params = {
        page,
        limit: pagination.itemsPerPage,
        status: 'available',
        ...cleanFilters
      };

      const response = await propertyAPI.getProperties(params);
      
      if (response.success) {
        setProperties(response.data.properties || []);
        setPagination(prev => ({
          ...prev,
          currentPage: response.data.pagination?.current || page,
          totalPages: response.data.pagination?.pages || 1,
          totalItems: response.data.pagination?.total || 0,
          itemsPerPage: response.data.pagination?.limit || 12
        }));
      } else {
        setError(response.message || "Failed to fetch properties");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    // Map propertyType to listingType if it exists
    const mappedFilters = { ...newFilters };
    if (mappedFilters.propertyType) {
      mappedFilters.listingType = mappedFilters.propertyType;
      delete mappedFilters.propertyType;
    }
    
    setFilters(prev => ({ ...prev, ...mappedFilters }));
    fetchProperties(1, { ...filters, ...mappedFilters });
  };

  // Handle sort change
  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    fetchProperties(1, { ...filters, sortBy });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchProperties(page, filters);
  };

  // Initial data fetch
  useEffect(() => {
    fetchProperties(1, filters);
  }, [propertyType]); // Re-fetch when propertyType changes

  return (
    <>
      <section className="section-property-layout">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="box-title">
                <h2>
                  {propertyType === 'sale' ? 'Properties for Sale' : 
                   propertyType === 'rent' ? 'Properties for Rent' : 
                   'Property listing'}
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

              {/* Pagination */}
              {!loading && !error && pagination.totalPages > 1 && (
                <div className="wrap-pagination">
                  <p className="text-1">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} results.
                  </p>
                  <ul className="wg-pagination">
                    <li className={`arrow ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
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
                        <li key={pageNum} className={pageNum === pagination.currentPage ? 'active' : ''}>
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
                    
                    <li className={`arrow ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
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

              {/* No Results */}
              {!loading && !error && properties.length === 0 && (
                <div className="text-center py-5">
                  <div className="alert alert-info" role="alert">
                    No properties found matching your criteria.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <FilterModal onFilterChange={handleFilterChange} />
    </>
  );
}
