import { NextRequest, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("Request : ", request);
  const token = await getToken({ req: request, raw: true });
  console.log(token, "..................... token");
  // const decoded = jwtDecode(token);
  // console.log("Decoded : ", decoded);
  const url = request.nextUrl;
  //   console.log("Token : ", token);
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
