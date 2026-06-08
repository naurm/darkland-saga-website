"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [tab, setTab] = useState<"codes" | "content" | "users" | "bestia">("codes")
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

      <div className="flex gap-2 mb-8 flex-wrap">
        {(["codes", "content", "users", "bestia"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-mono rounded border transition-all ${tab === t ? "border-ember-600 bg-ember-700/20 text-ember-300" : "border-ember-dim text-parchment-500 hover:text-parchment-300"}`}
          >
            {t === "codes" ? "Generate Codes" : t === "content" ? "Add Content" : t === "bestia" ? "Bestia" : "Users"}
          </button>
        ))}
      </div>

      {tab === "codes" ? <CodeGenerator /> : tab === "content" ? <ContentEditor /> : tab === "bestia" ? <BestiaEditor /> : <UserManager />}
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
            <button onClick={() => navigator.clipboard.writeText(result.join("\n"))} className="text-xs text-ember-400 hover:text-emberglow-bright">Copy All</button>
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

/* ───────── Bestia Entry Editor ───────── */

interface BestiaEntry {
  id: string
  catalogId: string
  title: string
  type: string
  classification?: string | null
  aliases?: string | null
  threatRating?: string | null
  physicalDescription: string
  sections: Record<string, string>
  spoilers: string[]
  restricted: boolean
  sourceBooks: string[]
  crossReferences: string[]
  fieldNotes: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

function BestiaEditor() {
  const [entries, setEntries] = useState<BestiaEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [catalogId, setCatalogId] = useState("")
  const [title, setTitle] = useState("")
  const [entryType, setEntryType] = useState("creature")
  const [classification, setClassification] = useState("")
  const [aliases, setAliases] = useState("")
  const [threatRating, setThreatRating] = useState("")
  const [physicalDescription, setPhysicalDescription] = useState("")
  const [sectionsJson, setSectionsJson] = useState("{}")
  const [spoilers, setSpoilers] = useState("")
  const [restricted, setRestricted] = useState(false)
  const [sourceBooks, setSourceBooks] = useState("")
  const [crossReferences, setCrossReferences] = useState("")
  const [fieldNotes, setFieldNotes] = useState("")
  const [published, setPublished] = useState(true)

  useEffect(() => {
    fetch("/api/companion/bestia")
      .then((r) => r.json())
      .then((d) => { setEntries(d.entries || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function selectEntry(entry: BestiaEntry) {
    setSelectedId(entry.id)
    setCatalogId(entry.catalogId)
    setTitle(entry.title)
    setEntryType(entry.type)
    setClassification(entry.classification || "")
    setAliases(entry.aliases || "")
    setThreatRating(entry.threatRating || "")
    setPhysicalDescription(entry.physicalDescription || "")
    setSectionsJson(JSON.stringify(entry.sections || {}, null, 2))
    setSpoilers((entry.spoilers || []).join(", "))
    setRestricted(entry.restricted)
    setSourceBooks((entry.sourceBooks || []).join(", "))
    setCrossReferences((entry.crossReferences || []).join(", "))
    setFieldNotes((entry.fieldNotes || []).join("\n---\n"))
    setPublished(entry.published)
    setMessage("")
  }

  function resetForm() {
    setSelectedId(null)
    setCatalogId("")
    setTitle("")
    setEntryType("creature")
    setClassification("")
    setAliases("")
    setThreatRating("")
    setPhysicalDescription("")
    setSectionsJson("{}")
    setSpoilers("")
    setRestricted(false)
    setSourceBooks("")
    setCrossReferences("")
    setFieldNotes("")
    setPublished(true)
    setMessage("")
  }

  async function handleSave() {
    setSaving(true); setMessage("")
    let parsedSections: Record<string, string> = {}
    try { parsedSections = JSON.parse(sectionsJson) }
    catch { setMessage("Error: sections is not valid JSON"); setSaving(false); return }

    const body = {
      catalogId: catalogId.toUpperCase().trim(),
      title: title.trim(),
      type: entryType,
      classification: classification.trim() || undefined,
      aliases: aliases.trim() || undefined,
      threatRating: threatRating.trim() || undefined,
      physicalDescription,
      sections: parsedSections,
      spoilers: spoilers.split(",").map((s) => s.trim()).filter(Boolean),
      restricted,
      sourceBooks: sourceBooks.split(",").map((s) => s.trim()).filter(Boolean),
      crossReferences: crossReferences.split(",").map((s) => s.trim()).filter(Boolean),
      fieldNotes: fieldNotes.split("\n---\n").map((s) => s.trim()).filter(Boolean),
      published,
    }

    try {
      const res = await fetch("/api/companion/bestia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.success) {
        setMessage("Saved! " + data.entry.catalogId)
        const r2 = await fetch("/api/companion/bestia")
        const d2 = await r2.json()
        setEntries(d2.entries || [])
      } else { setMessage(data.error || "Error saving") }
    } catch { setMessage("Network error") }
    setSaving(false)
  }

  async function handleDelete(catalogId: string) {
    if (!confirm("Delete " + catalogId + "? This cannot be undone.")) return
    await fetch("/api/companion/bestia", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catalogId }),
    })
    const r = await fetch("/api/companion/bestia")
    const d = await r.json()
    setEntries(d.entries || [])
    if (selectedId && !d.entries.find((e: BestiaEntry) => e.id === selectedId)) resetForm()
  }

  const creatures = entries.filter((e) => e.type === "creature")
  const appendices = entries.filter((e) => e.type === "appendix")

  return (
    <div>
      <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-parchment-200 font-mono uppercase tracking-wider">Entries ({entries.length})</h3>
          <button onClick={resetForm} className="text-xs font-mono text-ember-400 hover:text-emberglow-bright">+ New Entry</button>
        </div>
        {loading ? (
          <p className="text-sm text-parchment-500">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-parchment-500">No entries found in database.</p>
        ) : (
          <div className="max-h-48 overflow-y-auto space-y-1">
            {creatures.map((e) => (
              <div key={e.id} className="flex items-center gap-2">
                <button onClick={() => selectEntry(e)}
                  className={"flex-1 text-left px-2 py-1 rounded text-xs font-mono transition-colors " + (selectedId === e.id ? "bg-ember-700/20 text-ember-300" : "text-parchment-400 hover:bg-parchment-800")}>
                  <span className="text-ember-600">{e.catalogId}</span>  {e.title}
                </button>
                <button onClick={() => handleDelete(e.catalogId)}
                  className="text-[10px] text-red-400/50 hover:text-red-400" title="Delete">✕</button>
              </div>
            ))}
            {appendices.length > 0 && (
              <>
                <p className="text-[10px] text-parchment-600 font-mono pt-2">Appendices</p>
                {appendices.map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <button onClick={() => selectEntry(e)}
                      className={"flex-1 text-left px-2 py-1 rounded text-xs font-mono " + (selectedId === e.id ? "bg-ember-700/20 text-ember-300" : "text-parchment-400 hover:bg-parchment-800")}>
                      <span className="text-ember-600">{e.catalogId}</span>  {e.title}
                    </button>
                    <button onClick={() => handleDelete(e.catalogId)}
                      className="text-[10px] text-red-400/50 hover:text-red-400" title="Delete">✕</button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-ember-dim bg-parchment-900/50 p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Catalog ID</label>
              <input value={catalogId} onChange={(e) => setCatalogId(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200 font-mono" placeholder="TOA/BST/001" />
            </div>
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Type</label>
              <select value={entryType} onChange={(e) => setEntryType(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200">
                <option value="creature">Creature</option>
                <option value="appendix">Appendix</option>
              </select>
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 pb-[3px]">
                <input type="checkbox" checked={restricted} onChange={(e) => setRestricted(e.target.checked)} />
                <span className="text-sm text-parchment-400">Restricted</span>
              </label>
              <label className="flex items-center gap-2 pb-[3px]">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                <span className="text-sm text-parchment-400">Published</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-parchment-400 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Bane (General Category)" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Classification</label>
              <input value={classification} onChange={(e) => setClassification(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Host-former bane variant" />
            </div>
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Aliases</label>
              <input value={aliases} onChange={(e) => setAliases(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Shadow-Spawn, Night-Walker" />
            </div>
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Threat Rating</label>
              <input value={threatRating} onChange={(e) => setThreatRating(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="High" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Spoilers (comma-separated)</label>
              <input value={spoilers} onChange={(e) => setSpoilers(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Darkness Kindled, Hunting Misfortune" />
            </div>
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Source Books (comma-separated)</label>
              <input value={sourceBooks} onChange={(e) => setSourceBooks(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="DK, HM" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Cross-References (comma-separated)</label>
              <input value={crossReferences} onChange={(e) => setCrossReferences(e.target.value)}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="TOA/BST/001 — Bane (General)" />
            </div>
            <div>
              <label className="block text-sm text-parchment-400 mb-1">Field Notes (separate with ---)</label>
              <textarea value={fieldNotes} onChange={(e) => setFieldNotes(e.target.value)} rows={3}
                className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200 font-mono" placeholder="Note one\n---\nNote two" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-parchment-400 mb-1">Physical Description</label>
            <textarea value={physicalDescription} onChange={(e) => setPhysicalDescription(e.target.value)} rows={5}
              className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200" placeholder="Describe the creature..." />
          </div>

          <div>
            <label className="block text-sm text-parchment-400 mb-1">Sections (JSON)</label>
            <textarea value={sectionsJson} onChange={(e) => setSectionsJson(e.target.value)} rows={8}
              className="w-full rounded border border-ember-dim bg-parchment-900 px-3 py-2 text-sm text-parchment-200 font-mono" placeholder='{"Behavior & Combat Notes": "text...", "Origin & Lore": "text..."}' />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handleSave} disabled={saving}
              className="rounded border border-ember-600 bg-ember-700/20 px-5 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 disabled:opacity-50">
              {saving ? "Saving..." : "Save Entry"}
            </button>
            <button onClick={resetForm}
              className="text-xs font-mono text-parchment-500 hover:text-parchment-300">Cancel</button>
          </div>
          {message && <p className="text-sm text-parchment-400">{message}</p>}
        </div>
      </div>
    </div>
  )
}
