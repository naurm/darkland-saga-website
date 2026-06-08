import Link from "next/link"
import { BOOKS, LINKS } from "@/lib/constants"
import RotatingQuote from "@/components/RotatingQuote"

const homepageQuotes: { text: string; source?: string }[] = [
  {
    text: "Death incarnate, called 'bane', came with The Storm, and everything they touched turned to Darkness.",
    source: "The Darkland Saga",
  },
  {
    text: "Stories from the dark, for those struggling toward the dawn.",
    source: "J.L. Allred",
  },
  {
    text: "Protect the Pillar. Stop the Storm. Curse the Darkness.",
    source: "Darkness Kindled, Book One of the Darkland Saga",
  },
  {
    text: "Beyond Light's reach, monsters known as bane claim the shadows.",
    source: "Hunting Misfortune, A Darkland Saga Novel",
  },
  {
    text: "What holds when the darkness presses in.",
    source: "Tower of Archives",
  },
  {
    text: "When the Pillar's light shines again, bane that have slipped across the border slink into the long shadows its light casts.",
    source: "Anonymous border keeper, Ciallmhar Garrison",
  },
  {
    text: "There is more here than I can fully see yet.",
    source: "Tower of Archives",
  },
  {
    text: "Like the fire stones against the backdrop of the Storm, they were defiant lights against a cruel darkness. They were the wall even more than the stone and mortar that held it together.",
    source: "Darkness Kindled",
  },
  {
    text: "The Pillar doesn't shine everywhere. Bane gather in the dark.",
    source: "Fior, Darkness Kindled",
  },
  {
    text: "Just cause you aren't a coward doesn't mean you're brave, kid.",
    source: "Rowan Stoutfire, Hunting Misfortune",
  },
  {
    text: "There are many connections that move the world that we can't see though they are right in front of our eyes. All because we think that the ability to see means we aren't blind.",
    source: "Archmaster Naphos, Tower of Archives",
  },
  {
    text: "Sometimes your fear is a warning. Sometimes you should listen to it.",
    source: "Rowan Stoutfire",
  },
  {
    text: "House Stoutfire doesn't back down from any hunt. For anyone.",
    source: "Rowan Stoutfire, Hunting Misfortune",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — text and cover side by side */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-400 mb-3">
              J.L. Allred
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ember-200 leading-tight text-balance">
              Stories from the dark,<br />
              <span className="text-ember-400">for those struggling toward the dawn.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-parchment-300 leading-relaxed">
              Epic tales of living darkness, impossible choices, and light that pushes back.
            </p>
            <span className="inline-block mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ember-400 border border-ember-500/40 rounded-full px-3 py-1">
              Nobledark Fantasy
            </span>
            <div className="mt-6 flex flex-col items-start gap-3">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all emberglow"
              >
                Explore the Saga
                <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a
                href="https://www.royalroad.com/fiction/159610/darkness-kindled"
                className="inline-flex items-center gap-2 rounded border border-parchment-600 bg-parchment-900/50 px-5 py-2.5 font-mono text-sm text-parchment-300 hover:border-ember-700 hover:text-ember-300 transition-all backdrop-blur-sm"
              >
                Read Darkness Kindled Free
              </a>
              <Link
                href="/companion"
                className="inline-flex items-center gap-2 rounded border border-amber-800/40 bg-amber-900/20 px-5 py-2.5 font-mono text-sm text-amber-400 hover:bg-amber-900/40 hover:text-amberglow-bright transition-all"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 2h10v12l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unlock the Companion
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-parchment-500">
              <span className="text-parchment-600">·</span>
              <Link href="/why-fantasy" className="hover:text-ember-300 transition-colors underline underline-offset-4 decoration-parchment-700/50">
                Read why fantasy matters
              </Link>
              <span className="text-parchment-600">·</span>
            </div>
          </div>
          {/* Cover art */}
          <div className="flex flex-col items-center">
            <div className="rounded-lg overflow-hidden border border-ember-dim/30 max-w-sm mx-auto">
              <img
                src="/images/hunting-misfortune-cover.jpg"
                alt="Hunting Misfortune cover art — a lone figure on a precipice facing a beam of light through the storm"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-[11px] font-mono text-parchment-300 text-center">
              Illustration by Jeremiah Carrig
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Darkness Kindled */}
          <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-8 hover:border-ember-700/50 transition-colors">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-2">
              Book One
            </p>
            <h2 className="font-display text-2xl text-ember-200">{BOOKS.darknessKindled.title}</h2>
            <p className="mt-1 text-sm text-parchment-400 font-mono">{BOOKS.darknessKindled.subtitle}</p>
            <p className="mt-1 text-xs text-ember-600 font-mono uppercase tracking-wider">Free on Royal Road</p>
            <p className="mt-4 text-sm text-parchment-400 leading-relaxed line-clamp-4">
              {BOOKS.darknessKindled.synopsis}
            </p>
            <div className="mt-6">
              <a
                href={LINKS.royalRoad}
                className="inline-flex items-center gap-1.5 text-sm font-mono text-ember-400 hover:text-emberglow-bright transition-colors"
              >
                Read for free
                <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Hunting Misfortune */}
          <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-8 hover:border-ember-700/50 transition-colors">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-2">
              Prequel
            </p>
            <h2 className="font-display text-2xl text-ember-200">{BOOKS.huntingMisfortune.title}</h2>
            <p className="mt-1 text-sm text-parchment-400 font-mono">{BOOKS.huntingMisfortune.subtitle}</p>
            <p className="mt-4 text-sm text-parchment-400 leading-relaxed line-clamp-4">
              {BOOKS.huntingMisfortune.synopsis}
            </p>
          </div>
        </div>
      </section>

      {/* Rotating quote */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="border-t border-ember-dim pt-12">
          <svg
            className="mx-auto mb-6 h-12 w-10 text-ember-400"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Faceted crystal heart with jagged flame crown */}
            {/* Flame tips — upper crown */}
            <path d="M14 1l-2 3 2 1 2-3-2-1z" opacity="0.7"/>
            <path d="M8 3l-1 4 2 1 1-4-2-1z" opacity="0.6"/>
            <path d="M20 3l1 4-2 1-1-4 2-1z" opacity="0.6"/>
            <path d="M4 9l2 3-1 2-3-2 2-3z" opacity="0.5"/>
            <path d="M24 9l-2 3 1 2 3-2-2-3z" opacity="0.5"/>
            {/* Outer flame ring */}
            <path d="M5 12l-2 3 3 2 1-3-2-2z" opacity="0.4"/>
            <path d="M23 12l2 3-3 2-1-3 2-2z" opacity="0.4"/>
            {/* Faceted crystal center */}
            <path d="M14 8l5 5-5 8-5-8 5-5z"/>
            <path d="M14 8l-5 5h10l-5-5z"/>
            <path d="M9 13l5 8V8L9 13z" opacity="0.6"/>
            <path d="M19 13l-5 8V8l5 5z" opacity="0.3"/>
          </svg>
          <RotatingQuote quotes={homepageQuotes} intervalMs={30000} />
          <p className="mt-6 font-mono text-[11px] text-parchment-600">
            click to advance
          </p>
        </div>
      </section>
    </>
  )
}