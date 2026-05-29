export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="companion-archive">
      {/* Decorative top header bar */}
      <div className="companion-header-bar">
        <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <a href="/" className="shrink-0 flex items-center gap-1 text-parchment-500 hover:text-parchment-300 transition-colors font-mono text-[11px]">
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hidden sm:inline">Main Site</span>
            </a>
            <svg className="h-5 w-5 shrink-0 text-ember-400" viewBox="0 0 32 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 4v3"/><path d="M10 7h12"/>
              <path d="M8 10l3 18h18l3-18z"/>
              <line x1="12" y1="18" x2="28" y2="18"/>
              <path d="M12 28l-2 4h20l-2-4"/>
              <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.8"/>
              <circle cx="16" cy="22" r="1" fill="currentColor" opacity="0.6"/>
            </svg>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 truncate">
              Companion Archive
            </span>
          </div>
        </div>
      </div>

      <div className="companion-divider" />

      <main>{children}</main>

      <div className="companion-divider" />
      <footer className="mx-auto max-w-5xl px-6 py-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment-600">
          Secrets of the Darkland Saga · J.L. Allred
        </p>
      </footer>
    </div>
  )
}