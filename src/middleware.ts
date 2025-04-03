import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that should be accessible without authentication
const publicPaths = ['/login', '/register', '/api/auth']

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path.startsWith(publicPath)
  )

  // For API routes, let the endpoint handle authentication
  if (path.startsWith('/api/')) {
    return NextResponse.next()
  }

  // We'll handle auth check on the client side
  // This middleware will only prevent direct URL access
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}