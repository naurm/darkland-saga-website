import Link from "next/link"
import { BOOKS, LINKS } from "@/lib/constants"

export default function BooksPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
          The Darkland Saga
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200">Books</h1>
      </section>

      {/* Reading Order */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded border border-ember-dim bg-parchment-900/30 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-2">Reading Order</p>
          <p className="text-sm text-parchment-400 leading-relaxed">
            Darkness Kindled is the entry point to the Darkland Saga — the main series begins here.
            Hunting Misfortune is a prequel set five years earlier, following a different protagonist.
            Either can be read first, though Darkness Kindled introduces the world.
          </p>
        </div>
      </section>

      {/* Darkness Kindled */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500">Book One</p>
            <span className="inline-flex items-center rounded-full bg-ember-700/20 px-3 py-0.5 font-mono text-xs text-ember-400 border border-ember-600/30">
              Free
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200">{BOOKS.darknessKindled.title}</h2>
          <p className="mt-1 text-sm text-parchment-400 font-mono">{BOOKS.darknessKindled.subtitle}</p>

          <div className="mt-6 border-l-2 border-ember-700/50 pl-4">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ember-500 mb-1">Tagline</p>
            <p className="font-display text-lg text-ember-300 italic">{BOOKS.darknessKindled.tagline}</p>
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ember-500 mb-2">Synopsis</p>
            <p className="text-sm text-parchment-400 leading-relaxed">{BOOKS.darknessKindled.synopsis}</p>
          </div>

          <div className="mt-8">
            <a
              href={LINKS.royalRoad}
              className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-6 py-3 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all emberglow"
            >
              Read Darkness Kindled Free on Royal Road
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Hunting Misfortune */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-full sm:w-48 flex-shrink-0 rounded border border-ember-dim overflow-hidden">
            <img src="/images/hunting-misfortune-cover.jpg" alt="Hunting Misfortune cover" className="w-full h-auto" />
          </div>
          <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-2">Prequel</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200">{BOOKS.huntingMisfortune.title}</h2>
          <p className="mt-1 text-sm text-parchment-400 font-mono">{BOOKS.huntingMisfortune.subtitle}</p>

          <div className="mt-6 border-l-2 border-ember-700/50 pl-4">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ember-500 mb-1">Tagline</p>
            <p className="font-display text-lg text-ember-300 italic">{BOOKS.huntingMisfortune.tagline}</p>
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ember-500 mb-2">Synopsis</p>
            <p className="text-sm text-parchment-400 leading-relaxed">{BOOKS.huntingMisfortune.synopsis}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-ember-dim/50">
            <Link
              href="/companion"
              className="inline-flex items-center gap-2 rounded border border-amber-800/40 bg-amber-900/20 px-4 py-2 font-mono text-xs text-amber-400 hover:bg-amber-900/40 hover:text-amberglow-bright transition-all"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 2h10v12l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Unlock the Companion Archive
            </Link>
            <p className="mt-2 text-[11px] text-parchment-600 font-mono">
              Every physical and ebook copy includes a unique code to unlock exclusive lore and stories.
            </p>
          </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}