"use client"

import { useState } from "react"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <div className="md:hidden relative">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex items-center justify-center w-11 h-11 rounded border border-ember-dim cursor-pointer hover:bg-ember-900/30 transition-colors"
      >
        <svg className="w-5 h-5 text-ember-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M18 6l-12 12" />
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Menu panel */}
      <div
        className={`absolute right-0 top-12 w-48 rounded border border-ember-dim bg-parchment-950 shadow-xl backdrop-blur-sm z-50 transition-all ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col gap-1 p-3 text-sm font-mono text-parchment-400">
          <a href="/" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">Home</a>
          <a href="/books" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">Books</a>
          <a href="/why-fantasy" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">Why Fantasy</a>
          <a href="/world-of-eadrom" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">The World</a>
          <a href="/about" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">About</a>
          <a href="/companion" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">Companion</a>
          <a href="/support" onClick={close} className="rounded px-3 py-2 hover:bg-ember-900/20 hover:text-ember-300 transition-colors">Support</a>
        </div>
      </div>
    </div>
  )
}