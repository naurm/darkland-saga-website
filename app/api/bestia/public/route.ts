import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

/**
 * GET /api/bestia/public
 * Returns non-restricted, published bestia entries for the public bestiary.
 * No auth required.
 */
export async function GET() {
  const entries = await prisma.bestiaEntry.findMany({
    where: { published: true, restricted: false },
    orderBy: { catalogId: "asc" },
    select: {
      catalogId: true,
      title: true,
      type: true,
      classification: true,
      aliases: true,
      threatRating: true,
      physicalDescription: true,
      publicExcerpt: true,
      sections: true,
      spoilers: true,
      sourceBooks: true,
      crossReferences: true,
      fieldNotes: true,
    },
  })

  return NextResponse.json({ entries })
}