import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const timeExpired = request.cookies.get("expired");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (timeExpired.value < new Date().getTime()) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
