import { PrismaClient } from "@prisma/client"
import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const prisma = new PrismaClient()

async function main() {
  const whyFantasyHtml = readFileSync(
    join(__dirname, "..", "content", "blog", "why-fantasy.html"),
    "utf-8"
  )

  await prisma.blogPost.upsert({
    where: { slug: "why-fantasy" },
    update: { pinned: true, published: true },
    create: {
      slug: "why-fantasy",
      title: "Why Fantasy?",
      excerpt:
        "Why fantasy matters — on writing nobledark fantasy, the influence of Tolkien and Lewis, and the power of stories about impossible choices.",
      content: whyFantasyHtml,
      category: "on-writing",
      pinned: true,
      published: true,
    },
  })

  console.log("✅ Blog post seeded: why-fantasy")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })