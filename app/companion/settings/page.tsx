"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    if (newPassword !== confirmPassword) {
      setStatus("error")
      setMessage("New passwords don't match.")
      return
    }

    if (newPassword.length < 6) {
      setStatus("error")
      setMessage("Password must be at least 6 characters.")
      return
    }

    try {
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Request failed" }))
        setStatus("error")
        setMessage(data.error || `Error ${res.status}`)
        return
      }

      setStatus("success")
      setMessage("Password changed successfully.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => router.refresh(), 1500)
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <section className="mx-auto max-w-lg px-6 pt-12 pb-12">
      <div className="text-center mb-10">
        <div className="companion-section-rule mb-6">
          <span className="companion-section-ornament">✦</span>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-2">
          The Companion Archive
        </p>
        <h1 className="font-display text-3xl text-ember-200 emberglow-text">Settings</h1>
        <p className="mt-2 text-sm text-parchment-500">Change your account password</p>

        <div className="companion-section-rule companion-section-rule--flip mt-6">
          <span className="companion-section-ornament">✦</span>
        </div>
      </div>

      <div className="companion-plaque p-6 md:p-8">
        <div className="companion-plaque-inner p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === "success" && (
              <div className="rounded border border-emerald-700 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300 text-center">
                {message}
              </div>
            )}
            {status === "error" && (
              <div className="rounded border border-red-700 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="currentPassword" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                Current Password
              </label>
              <input id="currentPassword" type="password" required autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none" />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                New Password
              </label>
              <input id="newPassword" type="password" required minLength={6} autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-parchment-400 mb-1.5 font-mono text-xs uppercase tracking-wider">
                Confirm New Password
              </label>
              <input id="confirmPassword" type="password" required minLength={6} autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900/70 px-4 py-2.5 text-sm text-parchment-200 placeholder-parchment-600 focus:border-ember-500 focus:outline-none" />
            </div>

            <button type="submit" disabled={status === "loading"}
              className="w-full rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all disabled:opacity-50">
              {status === "loading" ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-parchment-500">
        <Link href="/companion" className="text-ember-400 hover:text-emberglow-bright">
          ← Back to Archive
        </Link>
      </p>
    </section>
  )
}