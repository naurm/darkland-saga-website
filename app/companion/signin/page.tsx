"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Try the full redirect approach — let next-auth handle navigation
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/companion",
      })
      // If we get here, redirect didn't happen — handle it
      window.location.href = "/companion"
    } catch (err) {
      setLoading(false)
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <section className="mx-auto max-w-md px-6 pt-24 pb-12">
      <div className="mb-10 text-center">
        <div className="companion-section-rule mb-6">
          <span className="companion-section-ornament">✦</span>
        </div>
        <div className="mb-4">
          <svg className="mx-auto h-8 w-6 text-ember-400" viewBox="0 0 32 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M16 4v3"/><path d="M10 7h12"/>
            <path d="M8 10l3 18h18l3-18z"/>
            <line x1="12" y1="18" x2="28" y2="18"/>
            <path d="M12 28l-2 4h20l-2-4"/>
            <circle cx="20" cy="14" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-2">
          The Companion Archive
        </p>
        <h1 className="font-display text-3xl text-ember-200 emberglow-text">Sign In</h1>
        <p className="mt-2 text-sm text-parchment-500 max-w-sm mx-auto">
          Enter your credentials to access the archive
        </p>
        <div className="companion-section-rule companion-section-rule--flip mt-6">
          <span className="companion-section-ornament">✦</span>
        </div>
      </div>

      <div className="companion-plaque p-6 md:p-8 max-w-sm mx-auto">
        <div className="companion-plaque-inner p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded border border-red-700 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none"
                placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">Password</label>
              <input id="password" name="password" type="password" required autoComplete="current-password"
                className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-center text-sm text-parchment-500">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/companion/redeem" className="text-ember-400 hover:text-emberglow-bright">
            Redeem a book code
          </Link>
        </p>
        <p>
          <Link href="/companion/signin/forgot" className="text-ember-500 hover:text-ember-300">
            Forgot password?
          </Link>
        </p>
      </div>
    </section>
  )
}