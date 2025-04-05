// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get the token from cookies or headers
//   const token = request.cookies.get("token")?.value || request.headers.get("Authorization");

//   // Define protected routes
//   const protectedRoutes = ["/dashboard", "/profile", "/settings"];

//   // Check if the requested path is protected
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (isProtectedRoute && !token) {
//     // Redirect unauthenticated users to login before rendering the page
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// // Apply middleware to protected routes
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
// };
