import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, raw: true });
  // const decoded = jwtDecode(token);
  const url = request.nextUrl;
  if (token && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  } else if (token) {
    // return NextResponse.redirect(new URL("/home", request.url));
  } else if (!token && url.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/auth"],
};
