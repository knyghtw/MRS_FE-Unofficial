import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const timeExpired = request.cookies.get("expired");
  // if (!token) {
  //   return NextResponse.redirect(new URL("/admin/login", request.url));
  // }

  // if (timeExpired.value < new Date().getTime()) {
  //   return NextResponse.redirect(new URL("/admin/logout", request.url));
  //   

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token && !request.nextUrl.pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (timeExpired?.value < new Date().getTime()) {
      return NextResponse.redirect(new URL("/admin/logout", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ["/admin/:path*"],
};
