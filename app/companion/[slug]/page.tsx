import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import Link from "next/link"

const contentTypeLabels: Record<string, string> = {
  lore: "Lore Entry",
  story: "Short Story",
  log: "Banehunter's Log",
  art: "Art",
  commentary: "Chapter Commentary",
  deleted_scene: "Deleted Scene",
  map: "Map",
  glossary: "Glossary",
}

const contentTypeEmoji: Record<string, string> = {
  lore: "📜",
  story: "✍",
  log: "📓",
  art: "🎨",
  commentary: "💬",
  deleted_scene: "✂",
  map: "🗺",
  glossary: "📖",
}

export default async function ContentViewPage({
  params,
}: {
  params: { slug: string }
}) {
  const session = await auth()
  if (!session?.user) redirect("/companion/signin")

  const item = await prisma.contentItem.findUnique({
    where: { slug: params.slug },
    include: { tags: true },
  })

  if (!item || !item.published) notFound()

  const userBooks: string[] = (session as any)?.userBooks || []
  const userAccess: string[] = (session as any)?.userAccess || []

  const hasAccess =
    item.accessLevel === "book_code_member"
      ? userBooks.length > 0 || userAccess.includes("kofi_supporter")
      : userAccess.includes(item.accessLevel)

  const hasBookSpecificAccess = !item.bookId || userBooks.includes(item.bookId)

  if (!hasAccess || !hasBookSpecificAccess) {
    return (
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12">
        <div className="companion-vault p-8 text-center">
          <h1 className="font-display text-2xl text-ember-200 mb-4">Content Locked</h1>
          <p className="text-sm text-parchment-400 mb-6">
            {item.bookId
              ? `This content requires a book code for "${item.bookId}".`
              : "This content requires a higher access level."}
          </p>
          <Link
            href="/companion/redeem"
            className="inline-flex items-center gap-1.5 rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all"
          >
            Redeem a Code
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-12 pb-12">
      <Link
        href="/companion"
        className="inline-flex items-center gap-1 text-xs font-mono text-parchment-500 hover:text-parchment-300 mb-6 transition-colors"
      >
        <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2L5 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Archive
      </Link>

      {/* Decorative content header */}
      <div className="companion-content-header mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{contentTypeEmoji[item.contentType] || "📜"}</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500">
            {contentTypeLabels[item.contentType] || item.contentType}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl text-ember-200 leading-tight emberglow-text">
          {item.title}
        </h1>

        <div className="companion-title-rule mt-4" />
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((t) => (
            <span
              key={t.tag}
              className="rounded-full border border-ember-dim bg-parchment-800/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-parchment-500"
            >
              {t.tag}
            </span>
          ))}
        </div>
      )}

      {/* Callout box for lore/story/log */}
      {(item.contentType === "lore" || item.contentType === "story" || item.contentType === "log") && (
        <div className={`companion-callout companion-callout--${item.contentType} mb-8`}>
          <div className="companion-callout-icon">
            {item.contentType === "lore" && "📜"}
            {item.contentType === "story" && "✍"}
            {item.contentType === "log" && "📓"}
          </div>
          <div className="companion-callout-text">
            <p className="text-xs font-mono uppercase tracking-wider companion-callout-label">
              {contentTypeLabels[item.contentType]}
            </p>
            <p className="text-sm text-parchment-400">
              {item.contentType === "lore" && "This entry contains worldbuilding knowledge from the Darkland Saga. May contain spoilers."}
              {item.contentType === "story" && "A narrative fragment from the world of the Darkland Saga."}
              {item.contentType === "log" && "A first-hand account from a Banehunter — raw, unfiltered, and dangerous."}
            </p>
          </div>
        </div>
      )}

      {/* Prose content */}
      <div className="companion-prose">
        {item.body.split("\n").map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={i} className="text-ember-200 font-display text-2xl mt-8 mb-4">{line.slice(2)}</h1>
          if (line.startsWith("## ")) return <h2 key={i} className="text-ember-200 font-display text-xl mt-6 mb-3">{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={i} className="text-ember-200 font-display text-lg mt-5 mb-2">{line.slice(4)}</h3>
          if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-parchment-200 mt-4">{line.slice(2, -2)}</p>
          if (line.startsWith("- ")) return <li key={i} className="text-parchment-400 ml-4 list-disc">{line.slice(2)}</li>
          if (line.trim() === "") return <br key={i} />
          if (line.startsWith("> ")) return <blockquote key={i} className="border-l-2 border-ember-700 pl-4 italic text-parchment-500 my-4">{line.slice(2)}</blockquote>
          if (line.startsWith("---")) return <hr key={i} className="border-ember-dim my-6" />
          return <p key={i} className="mb-3">{line}</p>
        })}
      </div>
    </article>
  )
}