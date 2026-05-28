const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const prisma = new PrismaClient()

function generateCode() {
  const bytes = crypto.randomBytes(9)
  const raw = Buffer.from(bytes).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "")
  const segments = raw.slice(0, 12).match(/.{4}/g) || []
  return `DKLND-${segments.join("-")}`
}

function generateCodes(count) {
  const codes = new Set()
  while (codes.size < count) {
    codes.add(generateCode())
  }
  return Array.from(codes)
}

async function main() {
  console.log("Seeding database...")

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "changeme", 10)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "jlallred.author@gmail.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "jlallred.author@gmail.com",
      passwordHash: hash,
      name: "J.L. Allred",
    },
  })
  console.log("Admin user created")

  const codes = generateCodes(10)
  await prisma.bookCode.createMany({
    data: codes.map((code) => ({ code, bookId: "hunting-misfortune" })),
  })
  console.log(`Created ${codes.length} test codes`)
  console.log("First code:", codes[0])

  await prisma.contentItem.upsert({
    where: { slug: "the-children-of-the-ash-tree" },
    update: {},
    create: {
      slug: "the-children-of-the-ash-tree",
      title: "The Children of the Ash Tree",
      contentType: "lore",
      body: "# The Children of the Ash Tree\n\n## Origins\n\nDeep in the heart of the Whisperwood, where the old magic still stirs beneath the roots, there stands an ash tree older than the kingdoms of men. Its bark is silver-grey, its leaves shimmer like spilled moonlight, and its roots reach deeper than the foundations of the world.",
      excerpt: "The ancient origins of the mysterious Children of the Ash Tree.",
      accessLevel: "book_code_member",
      published: true,
    },
  })
  console.log("Sample lore entry created")
  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())