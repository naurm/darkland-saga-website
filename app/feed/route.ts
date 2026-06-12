import { SITE } from "@/lib/constants"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    select: { title: true, slug: true, excerpt: true, createdAt: true },
  })

  const items = posts
    .map(
      (post) => `    <entry>
      <title>${escapeXml(post.title)}</title>
      <link href="${SITE.url}/blog/${post.slug}"/>
      <id>${SITE.url}/blog/${post.slug}</id>
      <published>${post.createdAt.toISOString()}</published>
      <updated>${post.createdAt.toISOString()}</updated>
      <summary type="html">${escapeXml(post.excerpt || post.title)}</summary>
    </entry>`
    )
    .join("\n")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE.name)} — Blog</title>
  <subtitle>Thoughts on nobledark fantasy, storytelling, and the craft behind the Darkland Saga.</subtitle>
  <link href="${SITE.url}/feed" rel="self"/>
  <link href="${SITE.url}/blog"/>
  <id>${SITE.url}/blog</id>
  <updated>${posts[0]?.createdAt.toISOString() || new Date().toISOString()}</updated>
  <author>
    <name>J.L. Allred</name>
  </author>
${items}
</feed>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}