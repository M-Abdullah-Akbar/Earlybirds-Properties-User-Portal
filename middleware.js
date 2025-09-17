import { NextResponse } from 'next/server';

export function middleware(request) {
  // For all routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // No specific routes to match currently
  ],
};