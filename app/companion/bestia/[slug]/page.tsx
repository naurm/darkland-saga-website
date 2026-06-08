import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"

interface Props {
  params: { slug: string }
}

// Convert slug back to catalogId
function slugToCatalogId(slug: string): string {
  const parts = slug.split("-")
  const type = parts[0]?.toUpperCase() || ""
  const category = parts[1]?.toUpperCase() || ""
  const num = parts.slice(2).join("-")
  return `${type}/${category}/${num}`
}

// Navigate to next/prev entry
async function getAdjacent(catalogId: string, type: string) {
  const all = await prisma.bestiaEntry.findMany({
    where: { published: true, type },
    orderBy: { catalogId: "asc" },
    select: { catalogId: true, title: true },
  })
  const idx = all.findIndex((e) => e.catalogId === catalogId)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export default async function BestiaEntryPage({ params }: Props) {
  const session = await auth()
  const isSignedIn = !!session?.user

  const catalogId = slugToCatalogId(params.slug)
  const entry = await prisma.bestiaEntry.findUnique({
    where: { catalogId },
  })
  if (!entry || !entry.published) notFound()

  const locked = entry.restricted && !isSignedIn

  const { prev, next } = await getAdjacent(catalogId, entry.type)

  const sectionKeys = entry.sections
    ? Object.keys(entry.sections as Record<string, string>)
    : []

  return (
    <article className="mx-auto max-w-3xl px-6 pt-12 pb-12">
      {/* Back links */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/companion/bestia"
          className="inline-flex items-center gap-1 text-xs font-mono text-parchment-500 hover:text-parchment-300 transition-colors"
        >
          <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2L5 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Compendium
        </Link>
        <Link
          href="/companion"
          className="text-xs font-mono text-parchment-600 hover:text-parchment-400 transition-colors"
        >
          Companion Archive
        </Link>
      </div>

      {/* Restricted overlay */}
      {locked ? (
        <div className="companion-vault p-8 text-center">
          <p className="text-2xl mb-2">🔒</p>
          <h1 className="font-display text-xl text-ember-200 mb-2">Restricted Entry</h1>
          <p className="text-sm text-parchment-400 mb-6">
            This entry requires Level 7 clearance or Banewarden sponsorship.
          </p>
          <p className="text-sm text-parchment-500 mb-6">
            Sign in with a redeemed book code to access restricted content.
          </p>
          <Link
            href="/companion/signin"
            className="inline-flex items-center gap-1.5 rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <>
          {/* Header — Archivist's framing */}
          <div className="companion-content-header mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-ember-600 shrink-0">
                {entry.catalogId}
              </span>
              {entry.restricted && (
                <span className="rounded border border-red-800/40 bg-red-900/20 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-red-400">
                  Restricted
                </span>
              )}
              <span className="text-[9px] font-mono text-parchment-600 uppercase tracking-wider">
                {entry.type === "appendix" ? "Appendix" : "Creature Entry"}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl text-ember-200 leading-tight emberglow-text mt-2">
              {entry.title}
            </h1>

            <div className="companion-title-rule mt-3" />

            {/* Meta tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {entry.classification && (
                <span className="rounded-full border border-ember-dim bg-parchment-800/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-parchment-500">
                  {entry.classification}
                </span>
              )}
              {entry.aliases && (
                <span className="rounded-full border border-ember-dim bg-parchment-800/50 px-2.5 py-0.5 text-[10px] font-mono text-parchment-500">
                  aka {entry.aliases}
                </span>
              )}
              {entry.threatRating && (
                <span className="rounded-full border border-red-900/30 bg-red-900/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-red-400">
                  {entry.threatRating}
                </span>
              )}
              {entry.sourceBooks.length > 0 && (
                <span className="rounded-full border border-ember-dim bg-parchment-800/50 px-2.5 py-0.5 text-[10px] font-mono text-parchment-500">
                  {entry.sourceBooks.join(", ")}
                </span>
              )}
              {entry.spoilers.length > 0 && (
                <span className="rounded-full border border-amber-800/30 bg-amber-900/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  Spoilers: {entry.spoilers.join(", ")}
                </span>
              )}
            </div>
          </div>

          {/* Physical Description */}
          {entry.physicalDescription && (
            <div className="companion-prose mb-8">
              {entry.physicalDescription.split("\n").map((line: string, i: number) => {
                if (line.startsWith("> ")) {
                  return (
                    <blockquote key={i} className="border-l-2 border-ember-700/50 pl-4 italic text-parchment-500 my-4 text-sm">
                      {line.slice(2)}
                    </blockquote>
                  )
                }
                if (line.trim() === "") return <br key={i} />
                return <p key={i} className="mb-3 text-sm">{line}</p>
              })}
            </div>
          )}

          {/* Dynamic sub-sections */}
          {sectionKeys.map((key) => {
            const val = (entry.sections as Record<string, string>)[key]
            if (!val?.trim()) return null
            const lines = val.split("\n")
            return (
              <div key={key} className="mb-8">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">
                  {key.replace(/_/g, " ")}
                </h2>
                <div className="companion-prose">
                  {lines.map((line: string, i: number) => {
                    if (line.startsWith("> ")) {
                      return (
                        <blockquote key={i} className="border-l-2 border-ember-700/50 pl-4 italic text-parchment-500 my-4 text-sm">
                          {line.slice(2)}
                        </blockquote>
                      )
                    }
                    if (line.trim() === "") return <br key={i} />
                    // Check for field notes (italicized)
                    if (line.startsWith("*") && line.endsWith("*")) {
                      return <p key={i} className="mb-2 text-sm italic text-parchment-500">{line.slice(1, -1)}</p>
                    }
                    return <p key={i} className="mb-2 text-sm">{line}</p>
                  })}
                </div>
              </div>
            )
          })}

          {/* Field Notes */}
          {entry.fieldNotes && entry.fieldNotes.length > 0 && (
            <div className="companion-callout companion-callout--log mb-8">
              <div className="companion-callout-icon">
                <span className="text-ember-400">📓</span>
              </div>
              <div className="companion-callout-text">
                <p className="text-xs font-mono uppercase tracking-wider companion-callout-label">
                  Additional Field Notes
                </p>
                {entry.fieldNotes.map((note: string, i: number) => (
                  <p key={i} className="text-sm text-parchment-400 mt-2 italic">
                    {note.replace(/^[*>]\s*/, "")}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Cross-References */}
          {entry.crossReferences && entry.crossReferences.length > 0 && (
            <div className="border-t border-ember-dim/40 pt-6 mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember-500 mb-3">
                Cross-References
              </p>
              <div className="flex flex-wrap gap-2">
                {entry.crossReferences.map((ref: string) => {
                  // Extract catalog ID from reference text
                  const refMatch = ref.match(/(TOA\/\w+\/\d+)/)
                  const refId = refMatch ? refMatch[1] : null
                  const label = ref.replace(/^TOA\/\w+\/\d+\s*[—–-]?\s*/, "").trim() || ref
                  if (!refId) {
                    return (
                      <span key={ref} className="text-[10px] font-mono text-parchment-600">
                        {ref}
                      </span>
                    )
                  }
                  return (
                    <Link
                      key={refId}
                      href={`/companion/bestia/${refId.toLowerCase().replace(/\//g, "-")}`}
                      className="rounded border border-ember-dim bg-parchment-800/50 px-2.5 py-1 text-[10px] font-mono text-ember-400 hover:text-emberglow-bright hover:border-ember-600/50 transition-all"
                    >
                      {label || refId}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Navigation — prev / next */}
          <div className="flex items-center justify-between border-t border-ember-dim/40 pt-6 mt-8">
            {prev ? (
              <Link
                href={`/companion/bestia/${prev.catalogId.toLowerCase().replace(/\//g, "-")}`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-500 hover:text-parchment-300 transition-colors"
              >
                <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 2L5 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {prev.catalogId}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/companion/bestia/${next.catalogId.toLowerCase().replace(/\//g, "-")}`}
                className="flex items-center gap-1 text-xs font-mono text-parchment-500 hover:text-parchment-300 transition-colors"
              >
                {next.catalogId}
                <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
          {prev && next && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] font-mono text-parchment-600">{prev.title}</span>
              <span className="text-[9px] font-mono text-parchment-600">{next.title}</span>
            </div>
          )}

          {/* Level 7 clearance footer */}
          <div className="mt-10 text-center">
            <div className="companion-section-rule mb-4" />
            <p className="font-mono text-[9px] text-parchment-600 uppercase tracking-wider">
              Tower of Archives — Level 7 · Authorized by Archmaster Naphos
            </p>
          </div>
        </>
      )}
    </article>
  )
}