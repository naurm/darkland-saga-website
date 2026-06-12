import { SITE } from "@/lib/constants"
import { prisma } from "@/lib/db"
import Link from "next/link"

export const metadata = {
  title: `Blog — ${SITE.name}`,
  description:
    "Thoughts on writing nobledark fantasy, storytelling, and the craft behind the Darkland Saga.",
  openGraph: {
    title: `Blog — ${SITE.name}`,
    description:
      "Thoughts on writing nobledark fantasy, storytelling, and the craft behind the Darkland Saga.",
  },
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, excerpt: true, category: true, pinned: true, createdAt: true },
  })

  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">On Writing</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ember-200 mb-3">Blog</h1>
      <p className="text-sm text-parchment-500 mb-12">Thoughts on nobledark fantasy, storytelling, and the craft behind the Darkland Saga.</p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex items-start gap-3 mb-1">
                {post.pinned && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ember-500 border border-ember-700/50 rounded px-1.5 py-0.5 mt-1 shrink-0">
                    Pinned
                  </span>
                )}
                <h2 className="font-display text-xl text-ember-300 group-hover:text-emberglow-bright transition-colors">
                  {post.title}
                </h2>
              </div>
              {post.excerpt && (
                <p className="text-sm text-parchment-500 leading-relaxed ml-0">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-3 mt-2 ml-0">
                <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-600">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-600">
                  {post.category.replace(/-/g, " ")}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-parchment-500 text-sm">No posts yet. Check back soon.</p>
      )}
    </section>
  )
}