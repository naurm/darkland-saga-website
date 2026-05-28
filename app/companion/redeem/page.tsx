"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RedeemPage() {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => {
        setIsLoggedIn(d.authenticated)
        setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    const body: Record<string, string> = { code: code.trim().toUpperCase() }

    if (!isLoggedIn) {
      body.email = email.trim()
      body.password = password
    }

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus("success")
        setMessage(data.message)
        setTimeout(() => router.push("/companion"), 2000)
      } else {
        setStatus("error")
        if (res.status === 409 && data.error?.includes("Account exists")) {
          setMessage("You already have an account. Please sign in first, then come back to redeem your code.")
        } else {
          setMessage(data.error || "Something went wrong.")
        }
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  if (checking) {
    return (
      <section className="mx-auto max-w-lg px-6 pt-24 pb-12">
        <p className="text-sm text-parchment-500">Loading...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-lg px-6 pt-24 pb-12">
      {/* Decorative header */}
      <div className="mb-10 text-center">
        <div className="companion-section-rule mb-6">
          <span className="companion-section-ornament">✦</span>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
          Unlock the Companion
        </p>
        <h1 className="font-display text-3xl text-ember-200 emberglow-text mb-2">Redeem Your Code</h1>
        <p className="text-sm text-parchment-400 max-w-md mx-auto">
          Found a code hidden within your book? Present it here to unlock exclusive companion content.
        </p>

        <div className="companion-section-rule companion-section-rule--flip mt-6">
          <span className="companion-section-ornament">✦</span>
        </div>
      </div>

      {isLoggedIn && (
        <div className="mb-6 rounded border border-emerald-700 bg-emerald-900/30 p-3 text-sm text-emerald-300 text-center">
          Signed in — just enter your code below.
        </div>
      )}

      <div className="companion-plaque p-6 md:p-8">
        <div className="companion-plaque-inner p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="code" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                Book Code
              </label>
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="DKLND-XXXX-XXXX-XXXX"
                className="w-full rounded border border-ember-dim/60 bg-parchment-900/80 px-5 py-3 text-sm font-mono tracking-[0.15em] text-ember-300 placeholder-parchment-700 focus:border-ember-500 focus:outline-none focus:shadow-[0_0_12px_rgba(184,148,79,0.08)] transition-all text-center"
                required
              />
            </div>

            {!isLoggedIn && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                    className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none"
                    required
                    minLength={6}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Redeeming..." : "Unlock Companion"}
            </button>
          </form>
        </div>
      </div>

      {status === "success" && (
        <div className="mt-6 rounded border border-emerald-700 bg-emerald-900/30 p-4 text-sm text-emerald-300 text-center">
          {message} — Redirecting to the Archive...
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded border border-red-700 bg-red-900/30 p-4 text-sm text-red-300 text-center">
          {message}
        </div>
      )}

      {!isLoggedIn && (
        <p className="mt-6 text-center text-sm text-parchment-500">
          Already have an account?{" "}
          <Link href="/companion/signin" className="text-ember-400 hover:text-emberglow-bright">
            Sign in first
          </Link>
        </p>
      )}
    </section>
  )
}