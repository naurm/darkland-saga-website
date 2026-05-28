import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

/**
 * GET /api/companion/admin/check
 * Simple auth check for admin pages
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL

  if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({ authenticated: true })
}