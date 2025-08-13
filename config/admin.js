// Admin Portal Configuration
export const ADMIN_CONFIG = {
  // Default admin portal URL with fallback for development
  PORTAL_URL: process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3001',
  
  // Redirect delay in seconds
  REDIRECT_DELAY: 2,
  
  // Environment settings
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  
  // Get the full admin URL with path
  getAdminUrl: (path = '') => {
    const baseUrl = ADMIN_CONFIG.PORTAL_URL || 'http://localhost:3001';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  }
}; 