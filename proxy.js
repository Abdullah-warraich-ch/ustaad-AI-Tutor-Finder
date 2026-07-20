import { NextResponse } from "next/server";

/**
 * Next.js 16 Proxy / Middleware for Route Protection
 * Protects dashboard routes (e.g. /dashboard/tutor) from unauthenticated access.
 */
export function proxy(request) {
  const token = request.cookies.get("session")?.value || request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes check: only dashboard sub-routes require login
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/tutor/dashboard");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Alternatively alias middleware for backwards compatibility
export const middleware = proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutor/dashboard/:path*",
  ],
};
