import axios from "axios";

// Base API configuration
const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Static property types data
const PROPERTY_TYPES = [
  "apartment",
  "villa", 
  "house",
  "townhouse",
  "penthouse",
  "studio",
  "duplex",
  "commercial",
  "land"
];

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
    bathrooms: property.details?.bathrooms || property.bathrooms || 0,
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
    baths: property.details?.bathrooms || property.bathrooms || 0
  };
  
  console.log("Transformed property:", transformed.title);
  return transformed;
};

// Property API functions for user portal
export const propertyAPI = {
  // Get all properties with filtering and pagination
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

  // Get single property
  getProperty: async (id) => {
    const response = await api.get(`/properties/${id}`);
    
    // Transform the response data to match frontend expectations
    if (response.data && response.data.property) {
      response.data.property = transformPropertyData(response.data.property);
    }
    
    return response.data;
  },

  // Get property types (using static data since backend requires auth)
  getPropertyTypes: async () => {
    return {
      success: true,
      data: PROPERTY_TYPES,
      message: "Property types retrieved successfully"
    };
  },

  // Get amenities for property type (using static data since backend requires auth)
  getAmenitiesForPropertyType: async (propertyType) => {
    // Static amenities data for different property types
    const amenitiesMap = {
      apartment: [
        "Balcony", "Gym", "Swimming Pool", "Parking", "Security", "Elevator",
        "Air Conditioning", "Furnished", "Pet Friendly", "Garden"
      ],
      villa: [
        "Private Pool", "Garden", "Parking", "Security", "Maid's Room",
        "Air Conditioning", "Furnished", "Pet Friendly", "BBQ Area"
      ],
      house: [
        "Garden", "Parking", "Security", "Air Conditioning", "Furnished",
        "Pet Friendly", "Storage Room", "Utility Room"
      ],
      townhouse: [
        "Garden", "Parking", "Security", "Air Conditioning", "Furnished",
        "Pet Friendly", "Small Pool", "BBQ Area"
      ],
      penthouse: [
        "Private Pool", "Terrace", "Parking", "Security", "Air Conditioning",
        "Furnished", "Pet Friendly", "Panoramic Views", "Private Elevator"
      ],
      studio: [
        "Air Conditioning", "Furnished", "Security", "Parking", "Gym"
      ],
      duplex: [
        "Garden", "Parking", "Security", "Air Conditioning", "Furnished",
        "Pet Friendly", "Private Entrance", "Storage"
      ],
      commercial: [
        "Parking", "Security", "Air Conditioning", "Loading Dock",
        "Warehouse Space", "Office Space", "High Ceilings"
      ],
      land: [
        "Fenced", "Utilities Available", "Road Access", "Zoning Approved"
      ]
    };
    
    const amenities = amenitiesMap[propertyType] || [];
    return {
      success: true,
      data: amenities,
      message: `Amenities for ${propertyType} retrieved successfully`
    };
  },

  // Get areas for emirate (using static data since backend requires auth)
  getAreasForEmirate: async (emirate) => {
    const areas = EMIRATE_AREA_MAP[emirate] || [];
    return {
      success: true,
      data: areas,
      message: `Areas for ${emirate} retrieved successfully`
    };
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
        propertyType: type,
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
};

// Static data (since backend doesn't have location routes or requires auth)
const EMIRATES = [
  "Dubai",
  "Abu Dhabi", 
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain"
];

const EMIRATE_AREA_MAP = {
  Dubai: [
    "Downtown Dubai",
    "Dubai Marina",
    "Jumeirah Beach Residence (JBR)",
    "Palm Jumeirah",
    "Business Bay",
    "DIFC",
    "Dubai Hills Estate",
    "Arabian Ranches",
    "Jumeirah Village Circle (JVC)",
    "Dubai Sports City",
    "Motor City",
    "The Greens",
    "Emirates Hills",
    "Jumeirah",
    "Bur Dubai",
    "Deira",
    "Al Barsha",
    "Dubai Investment Park (DIP)",
    "International City",
    "Discovery Gardens",
    "Mirdif",
    "Festival City",
    "Silicon Oasis",
    "Dubai South",
    "Al Furjan",
    "Damac Hills",
    "Town Square",
    "Dubai Land",
    "Al Mizhar",
    "Al Warqa"
  ],
  "Abu Dhabi": [
    "Abu Dhabi City",
    "Al Reem Island",
    "Saadiyat Island",
    "Yas Island",
    "Al Reef",
    "Khalifa City",
    "Mohammed Bin Zayed City",
    "Al Shamkha",
    "Al Rahba",
    "Masdar City",
    "Corniche Area",
    "Tourist Club Area",
    "Electra Street",
    "Hamdan Street",
    "Al Bateen",
    "Al Mushrif",
    "Al Karamah",
    "Al Manhal",
    "Al Khalidiyah",
    "Al Markaziyah"
  ],
  Sharjah: [
    "Sharjah City",
    "Al Majaz",
    "Al Qasba",
    "Al Nahda",
    "Muweilah",
    "Al Warqa",
    "University City",
    "Al Taawun",
    "Al Qadisiya"
  ],
  Ajman: [
    "Ajman City",
    "Al Nuaimiya",
    "Al Rashidiya",
    "Al Zahra",
    "Al Hamidiya"
  ],
  "Ras Al Khaimah": [
    "Ras Al Khaimah City",
    "Al Hamra",
    "Al Marjan Island",
    "Al Nakheel",
    "Al Dhait"
  ],
  Fujairah: [
    "Fujairah City",
    "Al Faseel",
    "Al Taween",
    "Al Aqah"
  ],
  "Umm Al Quwain": [
    "Umm Al Quwain City",
    "Al Salamah",
    "Al Raas"
  ]
};

// Location API functions (using static data)
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
  },
};

// Developer API functions
export const developerAPI = {
  // Get all developers
  getDevelopers: async (params = {}) => {
    const response = await api.get("/developers", { params });
    return response.data;
  },

  // Get single developer
  getDeveloper: async (id) => {
    const response = await api.get(`/developers/${id}`);
    return response.data;
  },
};

export default api;
