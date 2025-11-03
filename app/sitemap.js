import { blogAPI, propertyAPI } from "@/utils/api";

// Base URL for the site
const baseUrl = "https://earlybirds-properties.com";

// Static routes with their priorities
const staticRoutes = [
  { url: "", priority: 1.0 }, // Homepage
  { url: "about-us", priority: 0.8 },
  { url: "buy", priority: 0.9 },
  { url: "rent", priority: 0.9 },
  { url: "sell", priority: 0.9 },
  { url: "properties", priority: 0.9 },
  { url: "blogs", priority: 0.8 },
  { url: "off-plan-properties", priority: 0.8 },
  { url: "areas-in-uae", priority: 0.7 },
  { url: "developers-in-uae", priority: 0.7 },
  { url: "services", priority: 0.7 },
  { url: "contact-us", priority: 0.6 },
  { url: "faqs", priority: 0.6 },
  { url: "book-a-consultation", priority: 0.7 },
  { url: "instant-valuation", priority: 0.7 },
];

/**
 * Fetch all blog slugs from the API
 */
async function getBlogSlugs() {
  try {
    let allBlogs = [];
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 50; // Backend validation max is 50

    // Fetch all blogs with pagination
    while (hasMorePages) {
      try {
        const response = await blogAPI.getBlogs({
          page: currentPage,
          limit: limit,
        });

        if (response && response.success) {
          // Handle different possible response structures
          const responseData = response.data?.data || response.data || {};
          const blogs = responseData.blogs || responseData.data || [];
          
          // Filter to only include published blogs (in case API returns all)
          const publishedBlogs = blogs.filter(blog => blog.status === 'published' || !blog.status);
          
          if (publishedBlogs.length === 0) {
            hasMorePages = false;
          } else {
            allBlogs = allBlogs.concat(publishedBlogs);
            
            // Check if there are more pages
            const pagination = responseData.pagination || {};
            // Handle different pagination formats
            const totalPages = pagination.totalPages || pagination.pages || 1;
            const totalCount = pagination.totalCount || pagination.total || 0;
            
            // Check if we've fetched all blogs
            if (currentPage >= totalPages || allBlogs.length >= totalCount || blogs.length < limit) {
              hasMorePages = false;
            } else {
              currentPage++;
            }
          }
        } else {
          hasMorePages = false;
        }
      } catch (apiError) {
        // If we get a 400 error, continue without blog entries
        if (apiError.response?.status === 400) {
          break;
        }
        // For other errors, throw to be caught by outer try-catch
        throw apiError;
      }
    }

    // Extract slugs from blogs
    return allBlogs
      .map((blog) => blog.focusKeyword || blog.slug || blog._id)
      .filter(Boolean); // Remove any null/undefined values
  } catch (error) {
    // Return empty array if error - sitemap will generate without blogs
    return [];
  }
}

/**
 * Fetch all property slugs from the API
 */
async function getPropertySlugs() {
  try {
    let allProperties = [];
    let currentPage = 1;
    let hasMorePages = true;
    const limit = 30; // Backend validation: min 10, max 30 for properties

    // Fetch all properties with pagination
    while (hasMorePages) {
      const response = await propertyAPI.getProperties({
        page: currentPage,
        limit: limit,
        status: "available",
      });

      if (response && response.success !== false) {
        // Handle different possible response structures
        const responseData = response.data?.data || response.data || {};
        const properties = responseData.properties || response.properties || [];
        
        if (properties.length === 0) {
          hasMorePages = false;
        } else {
          allProperties = allProperties.concat(properties);
          
          // Check if there are more pages
          const pagination = responseData.pagination || {};
          // Handle different pagination formats
          const totalPages = pagination.totalPages || pagination.pages || 1;
          const totalCount = pagination.totalCount || pagination.total || 0;
          
          // Check if we've fetched all properties
          if (currentPage >= totalPages || allProperties.length >= totalCount || properties.length < limit) {
            hasMorePages = false;
          } else {
            currentPage++;
          }
        }
      } else {
        hasMorePages = false;
      }
    }

    // Extract slugs from properties
    return allProperties
      .map((property) => property.focusKeyword || property.slug || property._id)
      .filter(Boolean); // Remove any null/undefined values
  } catch (error) {
    // Return empty array if error - sitemap will generate without properties
    return [];
  }
}

/**
 * Generate sitemap entries
 * This function is called by Next.js to generate the sitemap.xml
 */
export default async function sitemap() {
  const currentDate = new Date().toISOString();

  // Start with static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: route.url ? `${baseUrl}/${route.url}` : baseUrl,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: route.priority,
  }));

  // Fetch dynamic routes
  const [blogSlugs, propertySlugs] = await Promise.all([
    getBlogSlugs(),
    getPropertySlugs(),
  ]);

  // Create blog entries
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // Create property entries
  const propertyEntries = propertySlugs.map((slug) => ({
    url: `${baseUrl}/property-detail/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Combine all entries
  return [...staticEntries, ...blogEntries, ...propertyEntries];
}

