"use client"

import { useState } from "react"

export function CommentForm({ postSlug }: { postSlug: string }) {
  const [author, setAuthor] = useState("")
  const [body, setBody] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!author.trim() || !body.trim()) {
      setError("Name and comment are required.")
      return
    }
    try {
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, author: author.trim(), body: body.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to submit")
      }
      setSubmitted(true)
      setAuthor("")
      setBody("")
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (submitted) {
    return (
      <div className="border border-ember-700/50 rounded p-5 text-center">
        <p className="text-ember-400 font-display text-lg mb-1">Thank you!</p>
        <p className="text-sm text-parchment-500">
          Your comment has been submitted and will appear once approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-base text-ember-300">Leave a comment</h3>

      <div>
        <label htmlFor="comment-author" className="font-mono text-xs uppercase tracking-wider text-parchment-600 mb-1 block">
          Name
        </label>
        <input
          id="comment-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded border border-ember-dim bg-void-800 px-3 py-2 text-sm text-parchment-300 placeholder-parchment-700 focus:border-ember-600 focus:outline-none"
          placeholder="Your name"
          maxLength={60}
        />
      </div>

      <div>
        <label htmlFor="comment-body" className="font-mono text-xs uppercase tracking-wider text-parchment-600 mb-1 block">
          Comment
        </label>
        <textarea
          id="comment-body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded border border-ember-dim bg-void-800 px-3 py-2 text-sm text-parchment-300 placeholder-parchment-700 focus:border-ember-600 focus:outline-none resize-y"
          placeholder="Share your thoughts..."
          maxLength={2000}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="rounded border border-ember-600 bg-ember-700/20 px-4 py-2 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all"
      >
        Submit Comment
      </button>
    </form>
  )
}