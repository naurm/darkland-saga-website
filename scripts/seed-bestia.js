/**
 * Sync Bestia entries from compendium-parsed.json into the database.
 * Plain JS for Vercel build compatibility.
 *
 * Usage: node scripts/seed-bestia.js
 */
const { PrismaClient } = require("@prisma/client")
const { readFileSync } = require("fs")
const path = require("path")

const prisma = new PrismaClient()

async function main() {
  const raw = readFileSync(
    path.join(__dirname, "..", "data", "compendium-parsed.json"),
    "utf-8"
  )
  const { entries } = JSON.parse(raw)

  let count = 0

  for (const entry of entries) {
    const existing = await prisma.bestiaEntry.findUnique({
      where: { catalogId: entry.catalogId },
      select: { publicExcerpt: true },
    })

    // Preserve admin-set publicExcerpt — don't overwrite with JSON default
    const publicExcerpt = entry.publicExcerpt || existing?.publicExcerpt || null

    const data = {
      title: entry.title,
      type: entry.type || "creature",
      classification: entry.classification || null,
      aliases: entry.aliases || null,
      threatRating: entry.threatRating || null,
      physicalDescription: entry.physicalDescription || "",
      publicExcerpt,
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

    count++
  }

  console.log(`Bestia: ${count} entries synced`)
}

main()
  .catch((e) => {
    console.error("Bestia seed failed:", e.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())