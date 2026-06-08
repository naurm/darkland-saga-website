import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"

export const metadata: Metadata = {
  title: "Bestia Darkanda — Bane Compendium",
  description:
    "A catalog of creatures beyond the light — Tower of Archives, Level 7. Explore the bane, dark-aligned entities, and corrupted beings of the Darkland Saga.",
  openGraph: {
    title: "Bestia Darkanda — Bane Compendium | Darkland Saga",
    description:
      "A catalog of creatures beyond the light — Tower of Archives, Level 7. Restricted reading requires Banewarden sponsorship.",
  },
}

const threatColors: Record<string, string> = {
  variable: "text-parchment-500",
  minor: "text-parchment-400",
  moderate: "text-ember-500",
  elevated: "text-ember-400",
  critical: "text-red-400",
}

function threatClass(rating?: string | null): string {
  if (!rating) return "text-parchment-600"
  const key = rating.toLowerCase().split("—")[0].trim()
  for (const [word, cls] of Object.entries(threatColors)) {
    if (key.includes(word) || key === word) return cls
  }
  if (['critical', 'coordinated'].some(w => key.includes(w))) return 'text-red-400'
  if (['elevated', 'high'].some(w => key.includes(w))) return 'text-ember-400'
  return 'text-parchment-500'
}

export default async function BestiaPage() {
  const session = await auth()
  const userBooks: string[] = (session as any)?.userBooks || []
  const isSignedIn = !!session?.user

  const entries = await prisma.bestiaEntry.findMany({
    where: { published: true },
    orderBy: { catalogId: "asc" },
  })

  const creatures = entries.filter((e) => e.type === "creature")
  const appendices = entries.filter((e) => e.type === "appendix")

  return (
    <section className="mx-auto max-w-4xl px-6 pt-12 pb-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-1">
          Tower of Archives — Level 7
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400 mb-4">
          Bestia Darkanda
        </p>
        <div className="companion-section-rule mb-4">
          <span className="companion-section-ornament">◈</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200 emberglow-text">
          Bane Compendium
        </h1>
        <p className="mt-2 text-sm text-parchment-500 font-mono max-w-lg mx-auto">
          A catalog of creatures beyond the light — compiled by the Archivists of Level 7
          with field observations from the Banewardens of House Stoutfire.
        </p>
        <p className="mt-2 text-[10px] text-parchment-600 font-mono italic">
          Authorized by Archmaster Naphos
        </p>
        <div className="companion-section-rule companion-section-rule--flip mt-4">
          <span className="companion-section-ornament">◈</span>
        </div>
      </div>

      {/* Entry plaque */}
      <div className="companion-plaque mb-8">
        <div className="companion-plaque-inner p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-ember-500 text-sm">📖</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember-500">
              Archive Statistics
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <p className="font-display text-lg text-ember-200">{creatures.length}</p>
              <p className="text-[10px] font-mono text-parchment-500 uppercase tracking-wider">Creatures</p>
            </div>
            <div>
              <p className="font-display text-lg text-ember-200">{appendices.length}</p>
              <p className="text-[10px] font-mono text-parchment-500 uppercase tracking-wider">Appendices</p>
            </div>
            <div>
              <p className="font-display text-lg text-ember-200">{entries.filter(e => e.restricted).length}</p>
              <p className="text-[10px] font-mono text-parchment-500 uppercase tracking-wider">Restricted</p>
            </div>
            <div>
              <p className="font-display text-lg text-ember-200">Level 7</p>
              <p className="text-[10px] font-mono text-parchment-500 uppercase tracking-wider">Clearance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in prompt for restricted entries */}
      {!isSignedIn && (
        <div className="companion-vault p-4 mb-8 text-center">
          <p className="text-xs text-parchment-500 font-mono">
            <span className="text-ember-400">🔒</span>{" "}
            Some entries require Level 7 clearance —{" "}
            <Link href="/companion/signin" className="text-ember-400 underline hover:text-emberglow-bright transition-colors">
              sign in
            </Link>{" "}
            with a redeemed book code for full access.
          </p>
        </div>
      )}

      {/* Bestiary grid */}
      <div className="space-y-1">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">
          Creature Catalog
        </h2>
        {creatures.map((entry) => {
          const locked = entry.restricted && !isSignedIn
          return (
            <Link
              key={entry.id}
              href={locked ? "#" : `/companion/bestia/${entry.catalogId.toLowerCase().replace(/\//g, "-")}`}
              className={`companion-tome-entry ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={locked ? (e) => e.preventDefault() : undefined}
            >
              <div className="companion-tome-spine" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-ember-600 shrink-0">
                    {entry.catalogId}
                  </span>
                  {entry.restricted && (
                    <span className="text-[10px]">🔒</span>
                  )}
                  {entry.sourceBooks.length > 0 && (
                    <span className="text-[9px] font-mono text-parchment-600">
                      [{entry.sourceBooks.join(", ")}]
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-parchment-200 font-medium mt-0.5">
                  {entry.title}
                </h3>
              </div>
              {entry.threatRating && (
                <span className={`shrink-0 text-[10px] font-mono ${threatClass(entry.threatRating)}`}>
                  {entry.threatRating.split("—")[0].trim()}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Appendices */}
      {appendices.length > 0 && (
        <div className="space-y-1 mt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">
            Appendices
          </h2>
          {appendices.map((entry) => (
            <Link
              key={entry.id}
              href={`/companion/bestia/${entry.catalogId.toLowerCase().replace(/\//g, "-")}`}
              className="companion-tome-entry"
            >
              <div className="companion-tome-spine" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-ember-600 shrink-0">
                    {entry.catalogId}
                  </span>
                </div>
                <h3 className="text-sm text-parchment-200 font-medium mt-0.5">
                  {entry.title}
                </h3>
              </div>
              {entry.threatRating && (
                <span className="shrink-0 text-[10px] font-mono text-parchment-500">
                  {entry.threatRating}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 text-center">
        <div className="companion-section-rule mb-6" />
        <Link
          href="/companion"
          className="inline-flex items-center gap-1 text-xs font-mono text-parchment-500 hover:text-parchment-300 transition-colors"
        >
          <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2L5 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Companion Archive
        </Link>
      </div>
    </section>
  )
}