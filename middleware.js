import { NextResponse } from 'next/server';

// Admin portal configuration
const ADMIN_PORTAL_URL = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Extract the path after /admin
    const adminPath = pathname.replace('/admin', '');
    
    // Construct the target URL
    const targetUrl = adminPath 
      ? `${ADMIN_PORTAL_URL}${adminPath}` 
      : ADMIN_PORTAL_URL;
    
    // Redirect to admin portal
    return NextResponse.redirect(targetUrl);
  }
  
  // For non-admin routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
  ],
}; 