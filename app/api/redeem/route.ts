import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { isValidCodeFormat } from "@/lib/codes"
import { auth } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"

/**
 * POST /api/redeem
 *
 * Body: { code, email?, password? }
 * If user is logged in, just uses their session.
 * If not, creates account with email/password.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  const { code, email, password } = await req.json()

  if (!code || !isValidCodeFormat(code)) {
    return NextResponse.json({ error: "Invalid code format" }, { status: 400 })
  }

  // Look up the code
  const bookCode = await prisma.bookCode.findUnique({
    where: { code },
  })

  if (!bookCode) {
    return NextResponse.json({ error: "Code not found" }, { status: 404 })
  }

  if (bookCode.isRedeemed) {
    return NextResponse.json({ error: "Code already redeemed" }, { status: 409 })
  }

  // Determine user
  let userId = session?.user?.id

  if (!userId) {
    // Must provide email + password for new account
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required for new account" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Account exists — please sign in first" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, passwordHash },
    })
    userId = user.id
  }

  // Redeem the code
  await prisma.bookCode.update({
    where: { id: bookCode.id },
    data: {
      isRedeemed: true,
      redeemedAt: new Date(),
      userId,
    },
  })

  return NextResponse.json({
    success: true,
    bookId: bookCode.bookId,
    message: `Unlocked companion content for ${bookCode.bookId}!`,
  })
}

/**
 * POST /api/codes/generate
 * Admin-only: generates a batch of codes for a book
 */
export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Simple admin check — admin email in env
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session.user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { bookId, count = 1 } = await req.json()

  if (!bookId) {
    return NextResponse.json({ error: "bookId required" }, { status: 400 })
  }

  const { generateCodes } = await import("@/lib/codes")
  const codes = generateCodes(count)

  await prisma.bookCode.createMany({
    data: codes.map((code) => ({ code, bookId })),
  })

  return NextResponse.json({ codes, count })
}