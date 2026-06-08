/**
 * Seed the Bestia Darkanda (Bane Compendium) into the database
 *
 * Usage: npx tsx scripts/seed-bestia.ts
 */

import { PrismaClient } from "@prisma/client"
import { readFileSync } from "fs"

const prisma = new PrismaClient()

async function main() {
  const raw = readFileSync(
    "/home/naurm/.openclaw/workspace/darkland/compendium-parsed.json",
    "utf-8"
  )
  const { entries } = JSON.parse(raw)

  let created = 0
  let skipped = 0

  for (const entry of entries) {
    const existing = await prisma.bestiaEntry.findUnique({
      where: { catalogId: entry.catalogId },
    })

    if (existing) {
      console.log(`  ↻ ${entry.catalogId} — already exists, skipping`)
      skipped++
      continue
    }

    await prisma.bestiaEntry.create({
      data: {
        catalogId: entry.catalogId,
        title: entry.title,
        type: entry.type || "creature",
        classification: entry.classification || null,
        aliases: entry.aliases || null,
        threatRating: entry.threatRating || null,
        physicalDescription: entry.physicalDescription || "",
        sections: entry.sections || {},
        spoilers: entry.spoilers || [],
        restricted: entry.restricted || false,
        sourceBooks: entry.sourceBook || [],
        crossReferences: entry.crossReferences || [],
        fieldNotes: entry.fieldNotes || [],
        published: true,
      },
    })
    console.log(`  ✓ ${entry.catalogId} — ${entry.title}`)
    created++
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())