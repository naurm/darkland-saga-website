'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Quote {
  text: string
  source?: string
}

export default function RotatingQuote({
  quotes,
  intervalMs = 8000,
  className = '',
}: {
  quotes: Quote[]
  intervalMs?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length)
        setFading(false)
      }, 500)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [quotes.length, intervalMs])

  const advance = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setIndex((i) => (i + 1) % quotes.length)
      setFading(false)
    }, 500)
  }, [quotes.length])

  const quote = quotes[index]

  if (!quotes.length) return null

  return (
    <div className={className} onClick={advance} style={{ cursor: 'pointer' }}>
      <blockquote
        className={`font-display text-xl sm:text-2xl text-ember-300 leading-relaxed text-balance transition-opacity duration-500 ${
          fading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {quote.source && (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-parchment-500">
          &mdash; {quote.source}
        </p>
      )}
    </div>
  )
}