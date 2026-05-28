import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

/**
 * GET /api/companion/content
 * Returns published content items the current user has access to.
 */
export async function GET(req: NextRequest) {
  const session = await auth()

  const userBooks: string[] = (session as any)?.userBooks || []
  const userAccess: string[] = (session as any)?.userAccess || []
  const isLoggedIn = !!session?.user

  if (!isLoggedIn) {
    return NextResponse.json({ items: [], isLoggedIn: false })
  }

  const hasBookAccess = userBooks.length > 0
  const hasKoFiAccess = userAccess.includes("kofi_supporter")
  const hasPatronAccess = userAccess.includes("patron")

  const accessibleLevels: string[] = []

  if (hasBookAccess || hasKoFiAccess) {
    accessibleLevels.push("book_code_member")
  }
  if (hasKoFiAccess) {
    accessibleLevels.push("kofi_supporter")
  }
  if (hasPatronAccess) {
    accessibleLevels.push("patron")
  }

  const where: any = {
    published: true,
  }

  if (accessibleLevels.length > 0) {
    if (userBooks.length > 0) {
      where.OR = [
        { accessLevel: { in: accessibleLevels }, bookId: null },
        { accessLevel: { in: accessibleLevels }, bookId: { in: userBooks } },
      ]
    } else {
      where.accessLevel = { in: accessibleLevels }
    }
  } else {
    where.accessLevel = "none"
    return NextResponse.json({ items: [], isLoggedIn: true, userBooks, userAccess })
  }

  const items = await prisma.contentItem.findMany({
    where,
    select: {
      slug: true,
      title: true,
      contentType: true,
      excerpt: true,
      coverImage: true,
      bookId: true,
      createdAt: true,
      tags: { select: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ items, isLoggedIn: true, userBooks, userAccess })
}

/**
 * POST /api/companion/content (Admin)
 * Creates or updates a content item.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session?.user?.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const { slug, title, contentType, body: contentBody, excerpt, coverImage, bookId, accessLevel, published, tags } = body

  if (!slug || !title || !contentBody) {
    return NextResponse.json({ error: "slug, title, and body required" }, { status: 400 })
  }

  const item = await prisma.contentItem.upsert({
    where: { slug },
    update: { title, contentType, body: contentBody, excerpt, coverImage, bookId, accessLevel, published },
    create: { slug, title, contentType, body: contentBody, excerpt, coverImage, bookId, accessLevel, published: published ?? false },
  })

  if (tags && Array.isArray(tags)) {
    await prisma.contentTag.deleteMany({ where: { contentId: item.id } })
    await prisma.contentTag.createMany({
      data: tags.map((tag: string) => ({ contentId: item.id, tag })),
    })
  }

  return NextResponse.json({ success: true, slug: item.slug })
}