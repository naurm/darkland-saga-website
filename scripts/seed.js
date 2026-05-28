const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const { generateCodes } = require("../lib/codes")

const prisma = new PrismaClient()

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

  await prisma.contentItem.upsert({
    where: { slug: "the-children-of-the-ash-tree" },
    update: {},
    create: {
      slug: "the-children-of-the-ash-tree",
      title: "The Children of the Ash Tree",
      contentType: "lore",
      body: "# The Children of the Ash Tree\n\n## Origins\n\nDeep in the heart of the Whisperwood...",
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