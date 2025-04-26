import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Set the CSP header
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Add CSP header to the response - WITHOUT unsafe-eval
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*; font-src 'self' data:; connect-src 'self' blob: data: https://*; frame-src 'self';",
  )

  return response
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
