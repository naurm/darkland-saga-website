import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

/**
 * GET /api/companion/bestia
 * Returns all bestia entries for the admin editor.
 * Admin-only.
 */
export async function GET() {
  const session = await auth()
  if (!ADMIN_EMAIL || session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const entries = await prisma.bestiaEntry.findMany({
    orderBy: { catalogId: "asc" },
  })

  return NextResponse.json({ entries })
}

/**
 * POST /api/companion/bestia
 * Create or update a bestia entry.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!ADMIN_EMAIL || session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const {
    catalogId,
    title,
    type,
    classification,
    aliases,
    threatRating,
    physicalDescription,
    sections,
    spoilers,
    restricted,
    sourceBooks,
    crossReferences,
    fieldNotes,
    published,
  } = body

  if (!catalogId || !title) {
    return NextResponse.json({ error: "catalogId and title required" }, { status: 400 })
  }

  const entry = await prisma.bestiaEntry.upsert({
    where: { catalogId },
    update: {
      title,
      type: type || "creature",
      classification: classification || null,
      aliases: aliases || null,
      threatRating: threatRating || null,
      physicalDescription: physicalDescription || "",
      sections: sections || {},
      spoilers: spoilers || [],
      restricted: restricted ?? false,
      sourceBooks: sourceBooks || [],
      crossReferences: crossReferences || [],
      fieldNotes: fieldNotes || [],
      published: published ?? false,
    },
    create: {
      catalogId,
      title,
      type: type || "creature",
      classification: classification || null,
      aliases: aliases || null,
      threatRating: threatRating || null,
      physicalDescription: physicalDescription || "",
      sections: sections || {},
      spoilers: spoilers || [],
      restricted: restricted ?? false,
      sourceBooks: sourceBooks || [],
      crossReferences: crossReferences || [],
      fieldNotes: fieldNotes || [],
      published: published ?? false,
    },
  })

  return NextResponse.json({ success: true, entry })
}

/**
 * DELETE /api/companion/bestia
 * Delete a bestia entry by catalogId.
 */
export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!ADMIN_EMAIL || session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { catalogId } = await req.json()
  if (!catalogId) {
    return NextResponse.json({ error: "catalogId required" }, { status: 400 })
  }

  await prisma.bestiaEntry.delete({ where: { catalogId } })
  return NextResponse.json({ success: true })
}