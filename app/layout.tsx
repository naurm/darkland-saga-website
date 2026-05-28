import type { Metadata } from "next"
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google"
import { SITE } from "@/lib/constants"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} font-sans bg-parchment-950 text-parchment-300 antialiased selection:bg-emberglow/25 selection:text-ember-200`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-ember-dim bg-parchment-950/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="font-display text-lg text-ember-300 hover:text-emberglow-bright transition-colors">
              J.L. Allred
            </a>
            <div className="flex items-center gap-6 text-sm font-mono text-parchment-400">
              <a href="/books" className="hover:text-ember-300 transition-colors">Books</a>
              <a href="/why-fantasy" className="hover:text-ember-300 transition-colors">Why Fantasy</a>
              <a href="/world-of-eadrom" className="hover:text-ember-300 transition-colors">The World</a>
              <a href="/about" className="hover:text-ember-300 transition-colors">About</a>
              <a href="/companion" className="hover:text-ember-300 transition-colors">Companion</a>
              <a href="/support" className="hover:text-ember-300 transition-colors">Support</a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen pt-16">
          {children}
        </main>

        <footer className="mx-auto max-w-5xl border-t border-ember-dim px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-parchment-500">
            <p>&copy; {new Date().getFullYear()} J.L. Allred. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://blog.jlallred.com"
                className="hover:text-ember-300 transition-colors"
              >
                Blog
              </a>
              <a
                href="https://bridgeoftwo.com"
                className="inline-flex items-center gap-1.5 hover:text-ember-300 transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM4.75 8a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5h-6.5z"/>
                </svg>
                Bridge of Two
              </a>
              <a
                href="https://www.royalroad.com/fiction/159610/darkness-kindled"
                className="hover:text-ember-300 transition-colors"
              >
                Royal Road
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}