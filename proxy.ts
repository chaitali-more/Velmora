import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() || '';
  const hostname = host.split(':')[0];

  // If host is specifically 'velmoranow.in', redirect to 'www.velmoranow.in' with HTTPS
  if (hostname === 'velmoranow.in') {
    const url = request.nextUrl.clone();
    url.host = 'www.velmoranow.in';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
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
