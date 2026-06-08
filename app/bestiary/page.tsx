"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import compendiumData from "@/data/compendium-parsed.json"

const entries = (compendiumData as any).entries as CompendiumEntry[]

interface CompendiumEntry {
  catalogId: string
  title: string
  type: string
  spoilers: string[]
  restricted: boolean
  physicalDescription?: string
  sections?: Record<string, string>
  threatRating?: string
  classification?: string
  aliases?: string
  sourceBooks?: string[]
}

const categories = [
  { value: "all", label: "All Creatures" },
  { value: "creature", label: "Creatures" },
  { value: "appendix", label: "Appendices" },
]

const books = [
  "Darkness Kindled",
  "Hunting Misfortune",
]

function truncateText(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…"
}

export default function PublicBestiaryPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [bookFilter, setBookFilter] = useState("all")
  const [selectedEntry, setSelectedEntry] = useState<CompendiumEntry | null>(null)

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      // Search
      if (search) {
        const q = search.toLowerCase()
        const matchesSearch =
          e.title.toLowerCase().includes(q) ||
          e.catalogId.toLowerCase().includes(q) ||
          (e.physicalDescription?.toLowerCase().includes(q))
        if (!matchesSearch) return false
      }

      // Category
      if (categoryFilter !== "all" && e.type !== categoryFilter) return false

      // Book filter
      if (bookFilter !== "all" && !e.spoilers?.includes(bookFilter)) return false

      return true
    })
  }, [search, categoryFilter, bookFilter])

  const creatures = filtered.filter((e) => e.type === "creature")
  const appendices = filtered.filter((e) => e.type === "appendix")

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-16">
      {/* Page Header */}
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-1">
          Tower of Archives — Level 7
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400 mb-4">
          Bestia Darkanda
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="block h-px w-8 bg-ember-dim" />
          <span className="text-ember-500 text-sm">◈</span>
          <span className="block h-px w-8 bg-ember-dim" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200">
          Bane Compendium
        </h1>
        <p className="mt-2 text-sm text-parchment-500 font-mono max-w-xl mx-auto">
          A public catalog of creatures beyond the light — compiled by the Archivists of Level 7
          with field observations from the Banewardens of House Stoutfire.
        </p>
      </div>

      {/* Stats bar */}
      <div className="rounded border border-ember-dim/40 bg-parchment-900/50 p-4 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
          <div>
            <p className="text-ember-200 font-display text-lg">{entries.filter(e => e.type === "creature").length}</p>
            <p className="text-parchment-500 uppercase tracking-wider">Creatures</p>
          </div>
          <div>
            <p className="text-ember-200 font-display text-lg">{entries.filter(e => e.type === "appendix").length}</p>
            <p className="text-parchment-500 uppercase tracking-wider">Appendices</p>
          </div>
          <div>
            <p className="text-ember-200 font-display text-lg">{entries.filter(e => e.restricted).length}</p>
            <p className="text-parchment-500 uppercase tracking-wider">Restricted</p>
          </div>
          <div>
            <p className="text-ember-200 font-display text-lg">31</p>
            <p className="text-parchment-500 uppercase tracking-wider">Total Entries</p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-parchment-600"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search creatures…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-ember-dim/50 bg-parchment-950 py-2.5 pl-10 pr-3 text-sm text-parchment-200 placeholder-parchment-600 focus:outline-none focus:border-ember-500/60 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded border border-ember-dim/50 bg-parchment-950 px-3 py-2.5 text-xs font-mono text-parchment-400 focus:outline-none focus:border-ember-500/60 transition-colors"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="rounded border border-ember-dim/50 bg-parchment-950 px-3 py-2.5 text-xs font-mono text-parchment-400 focus:outline-none focus:border-ember-500/60 transition-colors"
          >
            <option value="all">All Books</option>
            {books.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-[11px] font-mono text-parchment-600 mb-4">
        {filtered.length} entry{filtered.length !== 1 ? "ies" : "y"} found
      </p>

      {/* Creature Grid */}
      {creatures.length > 0 && (
        <div className="mb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-4">
            Creatures {categoryFilter !== "all" && `(${creatures.length})`}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {creatures.map((entry) => {
              const locked = entry.restricted
              const preview = entry.physicalDescription
                ? truncateText(entry.physicalDescription, 120)
                : ""

              return (
                <div
                  key={entry.catalogId}
                  className={`group relative rounded border ${
                    locked
                      ? "border-ember-dim/20 bg-parchment-900/30 opacity-70"
                      : "border-ember-dim/40 bg-parchment-900/60 hover:border-ember-600/50 cursor-pointer"
                  } transition-all p-4`}
                  onClick={() => !locked && setSelectedEntry(entry)}
                >
                  {/* ID + badges */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-ember-600">{entry.catalogId}</span>
                    {locked && (
                      <span className="text-[10px]">🔒</span>
                    )}
                    {entry.spoilers && entry.spoilers.length > 0 && entry.spoilers.some(Boolean) && (
                      <span className="text-[9px] font-mono text-parchment-600">
                        [{entry.spoilers.filter(Boolean).join(", ")}]
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm text-parchment-200 font-medium group-hover:text-ember-300 transition-colors">
                    {entry.title}
                  </h3>

                  {/* Preview text */}
                  {preview && !locked && (
                    <p className="mt-2 text-[11px] text-parchment-500 leading-relaxed">
                      {preview}
                    </p>
                  )}

                  {locked && (
                    <p className="mt-2 text-[11px] text-parchment-600 italic">
                      🔒 Restricted — sign in to unlock
                    </p>
                  )}

                  {/* Threat rating */}
                  {entry.threatRating && (
                    <span className="mt-2 inline-block text-[10px] font-mono text-red-400/70">
                      {entry.threatRating.split("—")[0].trim()}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Appendices */}
      {appendices.length > 0 && (
        <div className="mb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-4">
            Appendices {categoryFilter !== "all" && `(${appendices.length})`}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {appendices.map((entry) => (
              <div
                key={entry.catalogId}
                className="rounded border border-ember-dim/40 bg-parchment-900/60 p-4 hover:border-ember-600/50 cursor-pointer transition-all group"
                onClick={() => setSelectedEntry(entry)}
              >
                <span className="font-mono text-[10px] text-ember-600">{entry.catalogId}</span>
                <h3 className="text-sm text-parchment-200 font-medium mt-1 group-hover:text-ember-300 transition-colors">
                  {entry.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-parchment-500 text-sm font-mono">No entries match your search.</p>
          <button
            onClick={() => { setSearch(""); setCategoryFilter("all"); setBookFilter("all") }}
            className="mt-3 text-xs font-mono text-ember-400 underline hover:text-ember-300"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Companion upsell */}
      <div className="mt-10 rounded border border-ember-dim/40 bg-parchment-900/50 p-6 text-center">
        <p className="text-2xl mb-2">📖</p>
        <h3 className="font-display text-lg text-ember-200 mb-2">Unlock the Full Archive</h3>
        <p className="text-sm text-parchment-500 max-w-md mx-auto mb-4">
          The complete Tower of Archives contains all 31 entries with full lore, field notes,
          cross-references, and exclusive restricted content — available in the Companion.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/companion/signin"
            className="rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/companion"
            className="text-xs font-mono text-parchment-500 hover:text-parchment-300 underline transition-colors"
          >
            About the Companion
          </Link>
        </div>
      </div>

      {/* Entry detail modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 overflow-y-auto"
          onClick={() => setSelectedEntry(null)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-lg border border-ember-dim/50 bg-parchment-900 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 text-parchment-500 hover:text-parchment-300 transition-colors"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>

            {/* Entry header */}
            <div className="pr-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-ember-600">{selectedEntry.catalogId}</span>
                <span className="text-[10px] font-mono text-parchment-600 uppercase tracking-wider">
                  {selectedEntry.type === "appendix" ? "Appendix" : "Creature Entry"}
                </span>
                {selectedEntry.spoilers && selectedEntry.spoilers.length > 0 && selectedEntry.spoilers.some(Boolean) && (
                  <span className="text-[10px] font-mono text-amber-400/70">
                    ⚠ {selectedEntry.spoilers.filter(Boolean).join(", ")}
                  </span>
                )}
              </div>
              <h2 className="font-display text-xl sm:text-2xl text-ember-200 mt-1">
                {selectedEntry.title}
              </h2>
              <div className="h-px bg-ember-dim/40 mt-3 mb-4" />
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-4 text-sm text-parchment-300 leading-relaxed">
              {selectedEntry.physicalDescription && (
                <p>{selectedEntry.physicalDescription}</p>
              )}

              {selectedEntry.sections && Object.entries(selectedEntry.sections).map(([key, val]) => (
                <div key={key}>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-2">
                    {key.replace(/_/g, " ")}
                  </h3>
                  {val.split("\n").filter(Boolean).map((line: string, i: number) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-ember-dim/30 text-center">
              <p className="text-[10px] font-mono text-parchment-600">
                This is a preview.{" "}
                <Link href="/companion" className="text-ember-400 underline hover:text-ember-300">
                  Sign in to the Companion
                </Link>{" "}
                for the full entry with field notes, cross-references, and restricted content.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-8 bg-ember-dim" />
          <span className="text-ember-500 text-sm">◈</span>
          <span className="block h-px w-8 bg-ember-dim" />
        </div>
        <Link
          href="/world-of-eadrom"
          className="text-xs font-mono text-parchment-500 hover:text-parchment-300 transition-colors"
        >
          ← Back to World of Eadrom
        </Link>
      </div>
    </section>
  )
}