import { NextResponse } from 'next/server';

// Admin portal configuration with fallback
const ADMIN_PORTAL_URL = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3001';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Extract the path after /admin
    const adminPath = pathname.replace('/admin', '');
    
    // Construct the target URL with fallback
    const targetUrl = adminPath 
      ? `${ADMIN_PORTAL_URL}${adminPath}` 
      : ADMIN_PORTAL_URL;
    
    // Ensure the URL is valid before redirecting
    if (targetUrl && targetUrl !== 'undefined') {
      return NextResponse.redirect(targetUrl);
    } else {
      // If URL is invalid, redirect to a safe fallback
      return NextResponse.redirect('http://localhost:3001');
    }
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