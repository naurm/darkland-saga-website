"use client"

import { useState } from "react"

export function LikeButton({ postSlug, initialCount }: { postSlug: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount)
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)

  async function handleLike() {
    if (liked || animating) return
    setAnimating(true)
    try {
      const res = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug }),
      })
      if (res.ok) {
        setCount((c) => c + 1)
        setLiked(true)
      }
    } catch {
      // silently fail
    }
    setAnimating(false)
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs transition-all ${
        liked
          ? "border-ember-600 bg-ember-700/20 text-ember-400"
          : "border-ember-dim/50 text-parchment-500 hover:border-ember-600/50 hover:text-ember-400"
      }`}
    >
      <svg className={`h-4 w-4 ${liked ? "fill-ember-500" : ""}`} viewBox="0 0 20 20" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
        <path d="M10 18s-7-5.5-7-9.5a4.5 4.5 0 019 0 4.5 4.5 0 019 0c0 4-7 9.5-7 9.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>{count || ""}</span>
      {liked ? "Liked" : "Like"}
    </button>
  )
}