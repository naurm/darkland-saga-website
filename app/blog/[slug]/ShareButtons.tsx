"use client"

import { useState } from "react"

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://jlallred.com/blog/${slug}`
  const text = encodeURIComponent(title)
  const shareUrl = encodeURIComponent(url)

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-600 mr-1">Share</span>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded p-1.5 text-parchment-500 hover:text-ember-400 hover:bg-ember-700/10 transition-colors"
        aria-label="Share on X"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded p-1.5 text-parchment-500 hover:text-ember-400 hover:bg-ember-700/10 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Reddit */}
      <a
        href={`https://reddit.com/submit?url=${shareUrl}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded p-1.5 text-parchment-500 hover:text-ember-400 hover:bg-ember-700/10 transition-colors"
        aria-label="Share on Reddit"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.052 1.587.043.282.063.569.063.86 0 3.497-3.908 6.333-8.726 6.333-4.818 0-8.726-2.836-8.726-6.333 0-.291.02-.578.063-.86a1.75 1.75 0 0 1-.59-1.188 1.755 1.755 0 0 1 1.01-1.738c.154-.07.319-.106.486-.106.546 0 1.027.383 1.161.915.986-.657 2.375-1.123 4.019-1.236l.603-3.526a.3.3 0 0 1 .307-.258l4.562.614c.064-.662.623-1.177 1.317-1.177z"/>
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="rounded p-1.5 text-parchment-500 hover:text-ember-400 hover:bg-ember-700/10 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  )
}