import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  const session = await auth()

  // Admin check
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session?.user?.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { email, newPassword } = await req.json()

  if (!email || !newPassword) {
    return NextResponse.json({ error: "Email and new password required" }, { status: 400 })
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const hash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { email },
    data: { passwordHash: hash },
  })

  return NextResponse.json({
    success: true,
    user: { email: user.email, name: user.name },
  })
}

export async function GET(req: NextRequest) {
  const session = await auth()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session?.user?.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      createdAt: true,
      _count: { select: { bookCodes: true, accessLevels: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ users })
}