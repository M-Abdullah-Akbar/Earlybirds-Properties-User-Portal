"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { propertyAPI } from "@/utils/api";
import PropertyGridItems from "@/components/properties/PropertyGridItems";
import Link from "next/link";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Get search parameters from URL
  const listingType = searchParams.get("listingType");
  const propertyType = searchParams.get("propertyType");
  const emirate = searchParams.get("emirate");

  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build search parameters
      const searchParams = {};
      
      if (listingType) {
        searchParams.listingType = listingType;
      }
      
      if (propertyType) {
        searchParams.propertyType = propertyType;
      }
      
      if (emirate) {
        searchParams.emirate = emirate;
      }

      // Add default status to show only available properties
      searchParams.status = "available";
      searchParams.limit = 8; // Show max 8 properties on home page

      console.log("Searching with params:", searchParams);

      const response = await propertyAPI.getProperties(searchParams);

      if (response.success) {
        setProperties(response.data.properties || []);
        console.log(`Found ${response.data.properties?.length || 0} properties`);
      } else {
        console.error("Search failed:", response);
        setError(response.message || "Search failed");
        setProperties([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to perform search. Please try again.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [listingType, propertyType, emirate]);

  useEffect(() => {
    // Only search if we have search parameters
    if (listingType || propertyType || emirate) {
      setHasSearched(true);
      performSearch();
    } else {
      setHasSearched(false);
      setProperties([]);
    }
  }, [listingType, propertyType, emirate, performSearch]);

  // Don't render anything if no search has been performed
  if (!hasSearched) {
    return null;
  }

  // Build search summary
  const searchSummary = [];
  if (listingType) {
    searchSummary.push(listingType === "sale" ? "For Sale" : 
                     listingType === "rent" ? "For Rent" : 
                     listingType === "off plan" ? "Off Plan" : listingType);
  }
  if (propertyType) {
    searchSummary.push(propertyType);
  }
  if (emirate) {
    searchSummary.push(emirate);
  }

  return (
    <section className="section-property-layout tf-spacing-3">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-title">
              <h2>
                Search Results
                {searchSummary.length > 0 && (
                  <span className="text-color-default fw-4 text-3">
                    {" "}for {searchSummary.join(" in ")}
                  </span>
                )}
              </h2>
              <div className="right">
                <Link href="/properties" className="tf-btn style-border">
                  View All Properties
                </Link>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Searching properties...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-5">
                <div className="alert alert-danger" role="alert">
                  {error}
                  <button 
                    className="btn btn-outline-danger ms-3"
                    onClick={performSearch}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {!loading && !error && properties.length > 0 && (
              <>
                <div className="tf-grid-layout lg-col-4 md-col-2">
                  <PropertyGridItems properties={properties} showItems={8} />
                </div>
                <div className="text-center mt-4">
                  <Link href="/properties" className="tf-btn bg-color-primary">
                    View More Results
                  </Link>
                </div>
              </>
            )}

            {/* No Results */}
            {!loading && !error && properties.length === 0 && hasSearched && (
              <div className="text-center py-5">
                <div className="alert alert-info" role="alert">
                  <h4>No properties found</h4>
                  <p>Try adjusting your search criteria or browse all available properties.</p>
                  <Link href="/properties" className="tf-btn bg-color-primary mt-3">
                    Browse All Properties
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
