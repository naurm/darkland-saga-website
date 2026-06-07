import type { Metadata } from "next"
import { LINKS } from "@/lib/constants"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support the Darkland Saga — read Darkness Kindled for free on Royal Road, buy the author a coffee, or explore exclusive companion content.",
  openGraph: {
    title: "Support the Darkland Saga — J.L. Allred",
    description:
      "Support the Darkland Saga — read Darkness Kindled for free on Royal Road, buy the author a coffee, or explore exclusive companion content.",
  },
  twitter: {
    title: "Support the Darkland Saga — J.L. Allred",
    description:
      "Support the Darkland Saga — read Darkness Kindled for free on Royal Road, buy the author a coffee, or explore exclusive companion content.",
  },
}

export default function SupportPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
          Support the Saga
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200 mb-8">Support J.L. Allred</h1>

        <div className="space-y-5 text-sm sm:text-base text-parchment-400 leading-relaxed">

          <p>
            The Darkland Saga exists because readers like you choose to spend your time in these
            pages. If the stories have meant something to you, there are a few ways to help keep
            the light burning.
          </p>

          {/* Ko-fi */}
          <div className="my-10 rounded-lg border border-ember-dim bg-parchment-900/50 p-6 sm:p-8">
            <h2 className="font-display text-xl text-ember-200 mb-2">Buy Me a Coffee</h2>
            <p className="text-sm text-parchment-400 leading-relaxed mb-4">
              The simplest way to show support. A small contribution helps with writing time,
              editing costs, and keeping the world of Eadrom alive. Every coffee fuels another chapter.
            </p>
            <a
              href={LINKS.koFi}
              className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all emberglow"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2v20h20V2H2zm17 10.5c0 2.5-1.8 4.5-4 4.5H7V7h10.5c2.2 0 4 2 4 4.5z"/>
              </svg>
              Buy me a coffee
            </a>
          </div>

          {/* Companion content preview */}
          <div className="my-10 rounded-lg border border-ember-dim bg-parchment-900/50 p-6 sm:p-8">
            <h2 className="font-display text-xl text-ember-200 mb-2">Coming Soon &mdash; The World of Eadrom</h2>
            <p className="text-sm text-parchment-400 leading-relaxed mb-4">
              A deeper look into the world of the Darkland Saga with exclusive companion content:
            </p>
            <ul className="space-y-2 text-sm text-parchment-400">
              <li className="flex items-start gap-2">
                <span className="text-ember-600 mt-1">&bull;</span>
                <span>Expanded lore entries on the four nations and their magic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ember-600 mt-1">&bull;</span>
                <span>Behind-the-scenes notes on worldbuilding and character development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ember-600 mt-1">&bull;</span>
                <span>Maps, timelines, and secrets from the Storm&rsquo;s history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ember-600 mt-1">&bull;</span>
                <span>Early access to new chapters and exclusive short stories</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-parchment-500 italic">
              Details coming soon &mdash; sign up for updates or follow on Royal Road to be notified.
            </p>
          </div>

          {/* Read for free */}
          <div className="my-10 rounded-lg border border-ember-dim bg-parchment-900/50 p-6 sm:p-8">
            <h2 className="font-display text-xl text-ember-200 mb-2">No Pressure</h2>
            <p className="text-sm text-parchment-400 leading-relaxed">
              The best support is simply reading and sharing the stories you love. Darkness Kindled
              is available to read for free on Royal Road. If you enjoy it, leave a review, tell a
              friend, or share it with your book club. That matters more than anything.
            </p>
            <div className="mt-4">
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 text-sm font-mono text-ember-400 hover:text-emberglow-bright transition-colors"
              >
                Explore the books
                <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}