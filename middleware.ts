import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public companion pages — anyone can access
  const publicPaths = ["/companion/redeem", "/companion/signin", "/companion/error"]
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check JWT token from the session cookie — edge-safe, no Prisma
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: false,
  })

  // All other /companion/* pages require authentication
  if (pathname.startsWith("/companion") && !token) {
    const signInUrl = new URL("/companion/signin", req.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/companion/:path*"],
}