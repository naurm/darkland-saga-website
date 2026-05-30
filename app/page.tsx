import Link from "next/link"
import { SITE, BOOKS, LINKS } from "@/lib/constants"

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
            <span className="inline-block mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ember-600 border border-ember-dim/50 rounded-full px-3 py-1">
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
          </div>
          {/* Cover art */}
          <div className="rounded-lg overflow-hidden border border-ember-dim/30 max-w-sm mx-auto">
            <img
              src="/images/hunting-misfortune-cover.jpg"
              alt="Hunting Misfortune cover art — a lone figure on a precipice facing a beam of light through the storm"
              className="w-full h-auto"
            />
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

      {/* Tagline quote */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="border-t border-ember-dim pt-12">
          <svg
            className="mx-auto mb-6 h-12 w-8 text-ember-400"
            viewBox="0 0 32 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Hanging loop */}
            <path d="M16 4v3" />
            <path d="M10 7h12" />
            {/* Lantern body trapezoid */}
            <path d="M8 10l3 18h18l3-18z" />
            {/* Horizontal divider */}
            <line x1="12" y1="18" x2="28" y2="18" />
            {/* Base */}
            <path d="M12 28l-2 4h20l-2-4" />
            {/* Ember glow inside */}
            <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="22" r="1" fill="currentColor" opacity="0.6" />
            {/* Radiant lines from inner ember */}
            <path d="M20 8v-1" opacity="0.4" />
            <path d="M24 11l1-1" opacity="0.3" />
          </svg>
          <blockquote className="font-display text-xl sm:text-2xl text-ember-300 leading-relaxed text-balance">
            &ldquo;Death incarnate, called &lsquo;bane&rsquo;, came with The Storm, and everything they touched turned to Darkness.&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-parchment-500">
            — The Darkland Saga
          </p>
        </div>
      </section>
    </>
  )
}