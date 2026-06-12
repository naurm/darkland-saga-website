import { SITE } from "@/lib/constants"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CommentForm } from "./CommentForm"
import { LikeButton } from "./LikeButton"
import { ShareButtons } from "./ShareButtons"

export const dynamic = "force-dynamic"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post) return { title: "Not Found" }
  return {
    title: `${post.title} — ${SITE.name}`,
    description: post.excerpt || `Read "${post.title}" on the Darkland Saga blog.`,
    openGraph: {
      title: `${post.title} — ${SITE.name}`,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post || !post.published) notFound()

  const comments = await prisma.blogComment.findMany({
    where: { postSlug: params.slug, approved: true },
    orderBy: { createdAt: "desc" },
  })

  const likeCount = await prisma.blogLike.count({ where: { postSlug: params.slug } })

  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-[0.15em] text-ember-500 hover:text-ember-300 transition-colors"
      >
        &larr; Back to Blog
      </Link>

      <article className="mt-8">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
            {post.category.replace(/-/g, " ")}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ember-200 mb-4">{post.title}</h1>
          <time className="font-mono text-xs text-parchment-600" dateTime={post.createdAt.toISOString()}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div
          className="space-y-5 text-sm sm:text-base text-parchment-400 leading-relaxed blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Share + Like */}
      <div className="mt-12 pt-8 border-t border-ember-dim flex items-center justify-between flex-wrap gap-4">
        <LikeButton postSlug={post.slug} initialCount={likeCount} />
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {/* Comments */}
      <section className="mt-12 pt-8 border-t border-ember-dim">
        <h2 className="font-display text-xl text-ember-300 mb-6">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>

        {comments.length > 0 && (
          <div className="space-y-5 mb-10">
            {comments.map((c) => (
              <div key={c.id} className="border border-ember-dim/50 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-ember-400">{c.author}</span>
                  <time className="font-mono text-[10px] text-parchment-600">
                    {new Date(c.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="text-sm text-parchment-400 leading-relaxed whitespace-pre-wrap">{c.body}</p>
              </div>
            ))}
          </div>
        )}

        <CommentForm postSlug={post.slug} />
      </section>
    </section>
  )
}