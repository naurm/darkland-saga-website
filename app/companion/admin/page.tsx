"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [tab, setTab] = useState<"codes" | "content" | "users">("codes")
  const router = useRouter()

  useEffect(() => {
    fetch("/api/companion/admin/check")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.push("/companion")
        else setAuthenticated(true)
      })
  }, [router])

  if (authenticated === null) {
    return (
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12">
        <p className="text-sm text-parchment-500">Checking access...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
        Admin
      </p>
      <h1 className="font-display text-3xl text-ember-200 mb-8">Companion Admin</h1>

      <div className="flex gap-2 mb-8">
        {(["codes", "content", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-mono rounded border transition-all ${tab === t ? "border-ember-600 bg-ember-700/20 text-ember-300" : "border-ember-dim text-parchment-500 hover:text-parchment-300"}`}
          >
            {t === "codes" ? "Generate Codes" : t === "content" ? "Add Content" : "Users"}
          </button>
        ))}
      </div>

      {tab === "codes" ? <CodeGenerator /> : tab === "content" ? <ContentEditor /> : <UserManager />}
    </section>
  )
}

function CodeGenerator() {
  const [bookId, setBookId] = useState("hunting-misfortune")
  const [count, setCount] = useState(10)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string[] | null>(null)

  async function generate() {
    setGenerating(true)
    const res = await fetch("/api/redeem", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, count }),
    })
    const data = await res.json()
    setResult(data.codes || [])
    setGenerating(false)
  }

  async function copyAll() {
    if (result) await navigator.clipboard.writeText(result.join("\n"))
  }

  return (
    <div>
      <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Book</label>
            <select value={bookId} onChange={(e) => setBookId(e.target.value)}
              className="rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200">
              <option value="hunting-misfortune">Hunting Misfortune</option>
              <option value="darkness-kindled">Darkness Kindled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Qty</label>
            <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))}
              min={1} max={100}
              className="w-20 rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" />
          </div>
          <button onClick={generate} disabled={generating}
            className="rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all disabled:opacity-50">
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
      {result && (
        <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-parchment-200">{result.length} codes generated</h3>
            <button onClick={copyAll} className="text-xs text-ember-400 hover:text-emberglow-bright">Copy All</button>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {result.map((code) => (
              <code key={code} className="block font-mono text-xs text-parchment-400">{code}</code>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function UserManager() {
  type UserRow = { email: string; name: string | null; createdAt: string; _count: { bookCodes: number; accessLevels: number } }
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [resetEmail, setResetEmail] = useState("")
  const [resetPassword, setResetPassword] = useState("")
  const [resetting, setResetting] = useState(false)
  const [resetMessage, setResetMessage] = useState("")

  useEffect(() => {
    fetch("/api/companion/admin/reset-password")
      .then((r) => r.json())
      .then((d) => { setUsers(d.users || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setResetting(true)
    setResetMessage("")
    try {
      const res = await fetch("/api/companion/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, newPassword: resetPassword }),
      })
      const data = await res.json()
      if (data.success) {
        setResetMessage("Password reset for " + data.user.email)
        setResetEmail("")
        setResetPassword("")
      } else {
        setResetMessage(data.error || "Error")
      }
    } catch {
      setResetMessage("Network error")
    }
    setResetting(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6">
        <h3 className="text-sm text-parchment-200 mb-4 font-mono uppercase tracking-wider">Reset User Password</h3>
        <form onSubmit={handleReset} className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs text-parchment-400 mb-1">Email</label>
            <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required
              className="w-64 rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200"
              placeholder="user@example.com" />
          </div>
          <div>
            <label className="block text-xs text-parchment-400 mb-1">New Password</label>
            <input type="text" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} required minLength={6}
              className="w-48 rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200"
              placeholder="new password" />
          </div>
          <button type="submit" disabled={resetting}
            className="rounded border border-amber-600 bg-amber-700/20 px-5 py-2 font-mono text-sm text-amber-300 hover:bg-amber-700/40 transition-all disabled:opacity-50">
            {resetting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {resetMessage && <p className="mt-3 text-sm text-parchment-400">{resetMessage}</p>}
      </div>

      <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6">
        <h3 className="text-sm text-parchment-200 mb-4 font-mono uppercase tracking-wider">All Users</h3>
        {loading ? (
          <p className="text-sm text-parchment-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-parchment-500">No users yet.</p>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.email} className="flex items-center justify-between py-2 border-b border-ember-dim/30 last:border-0">
                <div>
                  <p className="text-sm text-parchment-200">{u.email}</p>
                  <p className="text-xs text-parchment-500">{u.name || "\u2014"} &middot; {new Date(u.createdAt).toLocaleDateString()} &middot; {u._count.bookCodes} codes &middot; {u._count.accessLevels} access levels</p>
                </div>
                <button onClick={() => { setResetEmail(u.email); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                  className="text-xs text-ember-500 hover:text-ember-300">Reset PW</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ContentEditor() {
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [contentType, setContentType] = useState("lore")
  const [body, setBody] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [bookId, setBookId] = useState("")
  const [accessLevel, setAccessLevel] = useState("book_code_member")
  const [published, setPublished] = useState(true)
  const [tags, setTags] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  async function save() {
    setSaving(true)
    setMessage("")
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean)
    const res = await fetch("/api/companion/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
        title, contentType, body, excerpt,
        bookId: bookId || undefined,
        accessLevel, published,
        tags: tagList,
      }),
    })
    const data = await res.json()
    if (data.success) {
      setMessage("Saved! /companion/" + data.slug)
      setSlug(""); setTitle(""); setBody(""); setExcerpt(""); setTags("")
    } else {
      setMessage(data.error || "Error saving")
    }
    setSaving(false)
  }

  return (
    <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="the-children-of-the-ash-tree" />
          </div>
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="The Children of the Ash Tree" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Type</label>
            <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200">
              <option value="lore">Lore</option>
              <option value="story">Short Story</option>
              <option value="log">Banehunter&apos;s Log</option>
              <option value="art">Art</option>
              <option value="commentary">Chapter Commentary</option>
              <option value="deleted_scene">Deleted Scene</option>
              <option value="map">Map</option>
              <option value="glossary">Glossary</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Access Level</label>
            <select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200">
              <option value="book_code_member">Book Code Member</option>
              <option value="kofi_supporter">Ko-fi Supporter</option>
              <option value="patron">Patron</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Book (optional)</label>
            <select value={bookId} onChange={(e) => setBookId(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200">
              <option value="">All books</option>
              <option value="hunting-misfortune">Hunting Misfortune</option>
              <option value="darkness-kindled">Darkness Kindled</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-parchment-400 mb-1">Excerpt</label>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Brief description for the content card" />
        </div>
        <div>
          <label className="block text-sm text-parchment-400 mb-1">Body (Markdown)</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12}
            className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200 font-mono"
            placeholder="Write your content in markdown..." />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm text-parchment-400 mb-1">Tags (comma-separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-60 rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="lore, history, darkland" />
          </div>
          <label className="flex items-center gap-2 pt-5">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-ember-dim bg-parchment-900" />
            <span className="text-sm text-parchment-400">Published</span>
          </label>
        </div>
        <button onClick={save} disabled={saving}
          className="rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all disabled:opacity-50">
          {saving ? "Saving..." : "Save Content"}
        </button>
        {message && <p className="text-sm text-parchment-400">{message}</p>}
      </div>
    </div>
  )
}