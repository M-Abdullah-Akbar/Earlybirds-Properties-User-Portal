import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Add performance and caching headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // Add compression hint and optimize response
  response.headers.set('Vary', 'Accept-Encoding');
  
  // Add early hints for critical resources to reduce latency
  if (request.nextUrl.pathname === '/') {
    response.headers.set('Link', '</images/Buy-and-Rent-Properties-in-Dubai-Earlybird-Properties.jpg>; rel=preload; as=image; fetchpriority=high, </icons/icomoon/fonts/icomoon.woff?6ufuj>; rel=preload; as=font; type=font/woff; crossorigin');
  }

  // Optimize server response time with connection keep-alive
  response.headers.set('Connection', 'keep-alive');
  response.headers.set('Keep-Alive', 'timeout=5, max=1000');

  // Set cache control for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/') || 
      request.nextUrl.pathname.startsWith('/images/') ||
      request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};