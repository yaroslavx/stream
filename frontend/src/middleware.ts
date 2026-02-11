import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;

  const session = cookies.get("session")?.value;

  const isAuthRoute = nextUrl.pathname.startsWith("/account");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isDeactivateRoute = nextUrl.pathname === "/account/deactivate";

  if (!session && isDashboardRoute) {
    return NextResponse.redirect(new URL("/account/login", url));
  }

  if (!session && isDeactivateRoute) {
    return NextResponse.redirect(new URL("/account/login", url));
  }

  if (session && isAuthRoute && !isDeactivateRoute) {
    return NextResponse.redirect(new URL("/dashboard/settings", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"],
};
