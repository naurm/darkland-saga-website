/**
 * Seed / sync the Bestia Darkanda (Bane Compendium) into the database
 * Uses upsert so it stays in sync with compendium-parsed.json.
 *
 * Usage: npx tsx scripts/seed-bestia.ts
 */

import { PrismaClient } from "@prisma/client"
import { readFileSync } from "fs"

const prisma = new PrismaClient()

async function main() {
  const raw = readFileSync("./data/compendium-parsed.json", "utf-8")
  const { entries } = JSON.parse(raw)

  let created = 0
  let updated = 0

  for (const entry of entries) {
    const data = {
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
    }

    await prisma.bestiaEntry.upsert({
      where: { catalogId: entry.catalogId },
      update: data,
      create: { catalogId: entry.catalogId, ...data },
    })

    console.log(`  ✓ ${entry.catalogId} — ${entry.title}`)
    created++
  }

  console.log(`\nDone: ${created} entries synced`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())