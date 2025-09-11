import axios from "axios";

// Base API configuration
//add this
const API_BASE_URL = "https://api.earlybirdsproperties.com/api";

// Create axios instance
const api = axios.create({  
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    //"ngrok-skip-browser-warning": "true",
  },
});

// Add request interceptor to include auth token (optional for user portal)
{/*api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/}

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if response is HTML instead of JSON (common with ngrok)
    if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
      console.error('Received HTML response instead of JSON. This usually means the API endpoint is not accessible or ngrok requires the warning to be bypassed.');
      throw new Error('API server returned HTML instead of JSON. The ngrok tunnel may have expired or the backend server is not running. Please check the backend connection.');
    }
    
    // Check for ngrok-specific errors
    if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
      console.error('Network error - ngrok tunnel may be down:', error);
      throw new Error('Unable to connect to the API server. The ngrok tunnel may have expired or the backend server is not running. Please check the backend connection.');
    }
    
    // Check for ngrok warning page
    if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('ngrok')) {
      console.error('Ngrok warning page detected. User needs to accept the ngrok warning.');
      throw new Error('Ngrok security warning detected. Please visit the API URL in your browser and accept the warning, then refresh this page.');
    }
    
    // Log detailed error information
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method
    };
    
    console.error("API Error Details:", errorDetails);
    
    // Create a more informative error message
    let errorMessage = 'An error occurred while connecting to the server.';
    
    if (error.response) {
      // Server responded with error status
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = 'API endpoint not found. Please check if the backend server is running.';
      } else if (error.response.status === 500) {
        errorMessage = 'Internal server error. Please try again later.';
      } else if (error.response.status >= 400) {
        errorMessage = `Server error (${error.response.status}): ${error.response.statusText || 'Unknown error'}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    
    // Create enhanced error object
    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.response = error.response;
    enhancedError.status = error.response?.status;
    
    return Promise.reject(enhancedError);
  }
);

// Static data for user portal (since backend doesn't provide these endpoints for users)
const PROPERTY_TYPES = [
  "apartment", "villa", "house", "townhouse", "penthouse", 
  "studio", "duplex", "commercial", "land"
];

const LISTING_TYPES = ["sale", "rent", "off plan"];

const PROPERTY_STATUS = ["available", "sold", "rented", "pending", "draft", "archived"];

const AREA_UNITS = ["sqft", "sqm"];

const PARKING_TYPES = ["covered", "open", "garage", "street"];

const PRICE_TYPES = ["total", "per_sqft", "per_sqm"];

const CURRENCIES = ["AED"];

const COUNTRIES = ["UAE"];

// Emirates and areas mapping for user portal
const EMIRATES = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", 
  "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"
];

const EMIRATE_AREA_MAP = {
  Dubai: [
    "Downtown Dubai", "Dubai Marina", "Jumeirah Beach Residence (JBR)", "Palm Jumeirah",
    "Business Bay", "DIFC", "Dubai Hills Estate", "Arabian Ranches", "Jumeirah Village Circle (JVC)",
    "Dubai Sports City", "Motor City", "The Greens", "Emirates Hills", "Jumeirah", "Bur Dubai",
    "Deira", "Al Barsha", "Dubai Investment Park (DIP)", "International City", "Discovery Gardens",
    "Mirdif", "Festival City", "Silicon Oasis", "Dubai South", "Al Furjan", "Damac Hills",
    "Town Square", "Dubai Land", "Al Mizhar", "Al Warqa"
  ],
  "Abu Dhabi": [
    "Abu Dhabi City", "Al Reem Island", "Saadiyat Island", "Yas Island", "Al Reef",
    "Khalifa City", "Mohammed Bin Zayed City", "Al Shamkha", "Al Rahba", "Masdar City",
    "Corniche Area", "Tourist Club Area", "Electra Street", "Hamdan Street", "Al Bateen",
    "Al Mushrif", "Al Karamah", "Al Manhal", "Al Khalidiyah", "Al Markaziyah"
  ],
  Sharjah: [
    "Sharjah City", "Al Majaz", "Al Qasba", "Al Nahda", "Muweilah", "Al Warqa",
    "University City", "Al Taawun", "Al Qadisiya"
  ],
  Ajman: [
    "Ajman City", "Al Nuaimiya", "Al Rashidiya", "Al Zahra", "Al Hamidiya"
  ],
  "Ras Al Khaimah": [
    "Ras Al Khaimah City", "Al Hamra", "Al Marjan Island", "Al Nakheel", "Al Dhait"
  ],
  Fujairah: [
    "Fujairah City", "Al Faseel", "Al Taween", "Al Aqah"
  ],
  "Umm Al Quwain": [
    "Umm Al Quwain City", "Al Salamah", "Al Raas"
  ]
};

// Property Type - Amenities mapping for user portal
const PROPERTY_TYPE_AMENITIES_MAP = {
  apartment: [
    "Air Conditioning", "Central Heating", "Built-in Wardrobes", "Balcony", "City View", 
    "Sea View", "Marina View", "High Floor", "Elevator", "Swimming Pool", "Gym", 
    "Security", "24/7 Security", "CCTV", "Concierge", "Parking", "Covered Parking", 
    "Internet Ready", "Cable TV Ready", "Intercom", "Maintenance", "Cleaning Service", 
    "Pets Allowed", "Furnished", "Semi Furnished", "Unfurnished"
  ],
  villa: [
    "Private Pool", "Private Garden", "Garage", "Maid Room", "Driver Room", "Study Room", 
    "Walk-in Closet", "Multiple Living Areas", "Formal Dining", "Family Room", "Home Office", 
    "Storage Room", "Laundry Room", "BBQ Area", "Outdoor Kitchen", "Jacuzzi", "Fireplace", 
    "High Ceilings", "Marble Floors", "Wooden Floors", "Smart Home", "Solar Panels", 
    "Generator Backup", "Security System", "CCTV", "Landscaped Garden", "Tree-lined Street", 
    "Gated Community", "Beach Access"
  ],
  house: [
    "Garden", "Garage", "Maid Room", "Study Room", "Storage Room", "Laundry Room", 
    "Fireplace", "High Ceilings", "Wooden Floors", "Modern Kitchen", "Built-in Wardrobes", 
    "Walk-in Closet", "Multiple Bathrooms", "Family Room", "Dining Room", "Home Office", 
    "BBQ Area", "Covered Parking", "Air Conditioning", "Central Heating", "Security System", 
    "Intercom", "Internet Ready", "Furnished", "Semi Furnished", "Unfurnished"
  ],
  townhouse: [
    "Private Garden", "Garage", "Maid Room", "Study Room", "Storage Room", "Laundry Room", 
    "Multiple Levels", "Terrace", "Rooftop Access", "Modern Kitchen", "Built-in Wardrobes", 
    "Walk-in Closet", "Family Room", "Dining Room", "Home Office", "BBQ Area", "Covered Parking", 
    "Air Conditioning", "Central Heating", "Community Pool", "Community Gym", "Playground", 
    "Security", "Gated Community", "Maintenance", "Landscaping"
  ],
  penthouse: [
    "Private Pool", "Private Terrace", "Rooftop Access", "Panoramic Views", "Sky Lounge", 
    "Private Elevator", "High-end Finishes", "Marble Floors", "Floor-to-ceiling Windows", 
    "Smart Home System", "Home Automation", "Premium Kitchen", "Wine Cellar", "Walk-in Closet", 
    "Master Suite", "Jacuzzi", "Steam Room", "Home Theater", "Study Room", "Maid Room", 
    "Driver Room", "Laundry Room", "Storage Room", "Private Garage", "Concierge Service", 
    "24/7 Security", "Valet Parking"
  ],
  studio: [
    "Air Conditioning", "Built-in Wardrobes", "Balcony", "City View", "Sea View", "High Floor", 
    "Modern Kitchen", "Marble Floors", "Wooden Floors", "Swimming Pool", "Gym", "Security", 
    "Elevator", "Parking", "Covered Parking", "Internet Ready", "Cable TV Ready", "Intercom", 
    "Maintenance", "Furnished", "Semi Furnished", "Unfurnished", "Compact Design", "Efficient Layout"
  ],
  duplex: [
    "Two Levels", "Private Entrance", "Terrace", "Garden", "Garage", "Maid Room", "Study Room", 
    "Storage Room", "Laundry Room", "Multiple Living Areas", "Formal Dining", "Modern Kitchen", 
    "Built-in Wardrobes", "Walk-in Closet", "Master Suite", "Family Room", "Home Office", 
    "BBQ Area", "Air Conditioning", "Central Heating", "High Ceilings", "Wooden Floors", 
    "Marble Floors", "Smart Home", "Security System", "Covered Parking"
  ],
  commercial: [
    "Prime Location", "High Visibility", "Street Frontage", "Parking Available", "Air Conditioning", 
    "Central Heating", "Elevator", "Loading Dock", "Storage Space", "Conference Room", 
    "Reception Area", "Private Offices", "Open Plan Layout", "Kitchen Facilities", "Bathroom Facilities", 
    "Security System", "CCTV", "Fire Safety System", "Backup Generator", "High Speed Internet", 
    "Phone Lines", "Disabled Access", "24/7 Access", "Maintenance Service", "Cleaning Service", 
    "Signage Rights", "Public Transport Access"
  ],
  land: [
    "Residential Zoning", "Commercial Zoning", "Mixed Use Zoning", "Corner Plot", "Main Road Access", 
    "Utilities Connected", "Electricity Ready", "Water Connection", "Sewage Connection", "Internet Ready", 
    "Planning Permission", "Building Permit Ready", "Flat Terrain", "Elevated Position", "Sea Frontage", 
    "Beach Access", "Investment Opportunity", "Development Potential", "Gated Community", "Security", 
    "Landscaping Allowed", "No Restrictions", "Freehold", "Leasehold"
  ]
};

// Helper function to get display location from property
export const getDisplayLocation = (property) => {
  if (typeof property.location === 'string') {
    return property.location;
  }
  if (property.location?.address) {
    return property.location.address;
  }
  const areaEmirate = `${property.area || ''} ${property.emirate || ''}`.trim();
  return areaEmirate || 'Location not specified';
};

// Helper function to transform backend property data to frontend format
const transformPropertyData = (property) => {
  console.log("Transforming property:", property.title);
  
  const transformed = {
    ...property,
    // Ensure we have clean string values for display
    title: property.title || 'Untitled Property',
    // Map backend location structure to frontend expected structure
    location: getDisplayLocation(property),
    // Map backend details structure to frontend expected structure
    bedrooms: property.details?.bedrooms || property.bedrooms || 0,
    bathrooms: property.details?.bathrooms || property.baths || 0,
    size: property.details?.area || property.size || 0,
    sqft: property.details?.area || property.sqft || 0,
    // Map backend image structure to frontend expected structure
    imageSrc: property.images?.[0]?.url || property.imageSrc,
    // Ensure we have the main image
    mainImage: property.images?.find(img => img.isMain)?.url || property.images?.[0]?.url,
    // Map listingType to propertyType for frontend compatibility
    propertyType: property.listingType || property.propertyType,
    // Add beds and baths for compatibility
    beds: property.details?.bedrooms || property.bedrooms || 0,
    baths: property.details?.bathrooms || property.baths || 0
  };
  
  console.log("Transformed property:", transformed.title);
  return transformed;
};

// Property API functions for user portal (only public endpoints)
export const propertyAPI = {
  // Get all properties with filtering and pagination - GET /api/properties
  getProperties: async (params = {}) => {
    console.log("getProperties called with params:", params);
    
    const response = await api.get("/properties", { params });
    
    console.log("getProperties response:", response.data);
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.properties) {
      response.data.properties = response.data.properties.map(transformPropertyData);
    }
    
    return response.data;
  },

  // Get single property - GET /api/properties/:id
  getProperty: async (id) => {
    const response = await api.get(`/properties/${id}`);
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.property) {
      response.data.property = transformPropertyData(response.data.property);
    }
    
    return response.data;
  },

  // Get featured properties
  getFeaturedProperties: async (limit = 6) => {
    const response = await api.get("/properties", { 
      params: { 
        featured: true, 
        limit,
        status: 'available'
      } 
    });
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.properties) {
      response.data.properties = response.data.properties.map(transformPropertyData);
    }
    
    return response.data;
  },

  // Get properties by type (buy/rent)
  getPropertiesByType: async (type, params = {}) => {
    const response = await api.get("/properties", { 
      params: { 
        listingType: type,
        status: 'available',
        ...params
      } 
    });
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.properties) {
      response.data.properties = response.data.properties.map(transformPropertyData);
    }
    
    return response.data;
  },

  // Search properties with filters
  searchProperties: async (filters = {}) => {
    // Handle exclude parameter by filtering out the excluded property
    const { exclude, ...apiFilters } = filters;
    
    console.log("API call with filters:", apiFilters);
    
    const response = await api.get("/properties", { 
      params: {
        status: 'available',
        ...apiFilters
      } 
    });
    
    console.log("Raw API response:", response.data);
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.properties) {
      let properties = response.data.properties.map(transformPropertyData);
      
      console.log("Transformed properties:", properties);
      
      // Filter out excluded property if specified
      if (exclude) {
        properties = properties.filter(property => {
          const propertyId = property._id || property.id;
          const shouldExclude = propertyId === exclude;
          if (shouldExclude) {
            console.log(`Excluding property with ID: ${propertyId}`);
          }
          return !shouldExclude;
        });
        console.log(`Filtered out property ${exclude}, remaining: ${properties.length}`);
      }
      
      response.data.properties = properties;
    }
    
    return response.data;
  },

  // Get related properties (exclude current property)
  getRelatedProperties: async (currentPropertyId, params = {}) => {
    const response = await api.get("/properties", { 
      params: {
        status: 'available',
        ...params
      } 
    });
    
    // Transform and filter out current property
    if (response.data && response.data.properties) {
      let properties = response.data.properties
        .map(transformPropertyData)
        .filter(property => property._id !== currentPropertyId)
        .slice(0, 4); // Limit to 4 related properties
      
      response.data.properties = properties;
    }
    
    return response.data;
  }
};

// Static data API functions for user portal (since backend doesn't provide these endpoints for users)
export const staticDataAPI = {
  // Get all available property types
  getPropertyTypes: async () => {
    return {
      success: true,
      data: PROPERTY_TYPES,
      message: "Property types retrieved successfully"
    };
  },

  // Get all available listing types
  getListingTypes: async () => {
    return {
      success: true,
      data: LISTING_TYPES,
      message: "Listing types retrieved successfully"
    };
  },

  // Get all available property statuses
  getPropertyStatuses: async () => {
    return {
      success: true,
      data: PROPERTY_STATUS,
      message: "Property statuses retrieved successfully"
    };
  },

  // Get all available area units
  getAreaUnits: async () => {
    return {
      success: true,
      data: AREA_UNITS,
      message: "Area units retrieved successfully"
    };
  },

  // Get all available parking types
  getParkingTypes: async () => {
    return {
      success: true,
      data: PARKING_TYPES,
      message: "Parking types retrieved successfully"
    };
  },

  // Get all available price types
  getPriceTypes: async () => {
    return {
      success: true,
      data: PRICE_TYPES,
      message: "Price types retrieved successfully"
    };
  },

  // Get all available currencies
  getCurrencies: async () => {
    return {
      success: true,
      data: CURRENCIES,
      message: "Currencies retrieved successfully"
    };
  },

  // Get all available countries
  getCountries: async () => {
    return {
      success: true,
      data: COUNTRIES,
      message: "Countries retrieved successfully"
    };
  },

  // Get amenities for specific property type
  getAmenitiesForPropertyType: async (propertyType) => {
    const amenities = PROPERTY_TYPE_AMENITIES_MAP[propertyType] || [];
    return {
      success: true,
      data: amenities,
      message: `Amenities for ${propertyType} retrieved successfully`
    };
  },

  // Get all available amenities for all property types
  getAllAmenities: async () => {
    return {
      success: true,
      data: PROPERTY_TYPE_AMENITIES_MAP,
      message: "All amenities retrieved successfully"
    };
  }
};

// Location API functions for user portal (using static data)
export const locationAPI = {
  // Get all emirates
  getEmirates: async () => {
    return {
      success: true,
      data: EMIRATES,
      message: "Emirates retrieved successfully"
    };
  },

  // Get areas for emirate
  getAreas: async (emirate) => {
    const areas = EMIRATE_AREA_MAP[emirate] || [];
    return {
      success: true,
      data: areas,
      message: `Areas for ${emirate} retrieved successfully`
    };
  },

  // Get all areas
  getAllAreas: async () => {
    return {
      success: true,
      data: EMIRATE_AREA_MAP,
      message: "Areas retrieved successfully"
    };
  }
};

// Email API functions for user portal
export const emailAPI = {
  // Send contact form email
  sendContactEmail: async (formData) => {
    const response = await api.post("/email/contact", formData);
    return response.data;
  },
  
  // Send instant valuation email
  sendInstantValuationEmail: async (formData) => {
    const response = await api.post("/email/instant-valuation", formData);
    return response.data;
  },
  
  // Send property inquiry email
  sendPropertyInquiryEmail: async (formData) => {
    const response = await api.post("/email/property-inquiry", formData);
    return response.data;
  }
};

// Upload API functions for user portal
export const uploadAPI = {
  // Upload images
  uploadImages: async (formData) => {
    const response = await api.post("/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};

// Export the main API instance for direct use if needed
export default api;
