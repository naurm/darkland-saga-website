/**
 * ArchiveSymbols — Minimal SVG crests for the Tower of Archives
 *
 * Each symbol is a single-stroke line-art crest in the ember color palette.
 * Designed to sit next to entries on the companion archive page, replacing
 * generic emoji icons.
 */

interface SymbolProps {
  className?: string
  size?: number
}

const symbolAttrs = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function LoreSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Scroll — unrolled parchment */}
      <path d="M4 3v14c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1z" />
      <path d="M6 2v3l2-1 2 1V2" />
      <path d="M7 8h6M7 11h4M7 14h5" />
    </svg>
  )
}

export function StorySymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Quill — feather nib */}
      <path d="M10 19L4 7l3-3 3 3-3 3 3 3-3 3 3 3z" />
      <path d="M7 4l6 6" />
      <path d="M13 10l4 4" />
      <path d="M13 10c0 0 2.5-4 6-5-1 2.5-3 5-6 5z" opacity="0.5" />
    </svg>
  )
}

export function LogSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Journal — bound book, open */}
      <path d="M4 3v14c0 .6.4 1 1 1h4V2H5c-.6 0-1 .4-1 1z" />
      <path d="M10 2v16h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4z" />
      <path d="M7 6h2M7 9h2M7 12h2" />
      <path d="M12 6h2M12 9h2" />
    </svg>
  )
}

export function ArtSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Paintbrush — angled tip */}
      <path d="M4 16l6-6" />
      <path d="M10 10l5-5c.6-.6.6-1.4 0-2s-1.4-.6-2 0l-5 5" />
      <path d="M14 6l-4 4" />
      <path d="M3 17c0 1 .5 1.5 1.5 1.5S6 18 7 17c1-1 .5-2-1-2-1 0-3 .5-3 2z" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function CommentarySymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Speech scroll — dialogue bubble as a sealed note */}
      <path d="M3 4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1H9l-3 3v-3H4c-.6 0-1-.4-1-1V4z" />
      <path d="M6 7h8M6 10h5" />
    </svg>
  )
}

export function DeletedSceneSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Severed fragment — torn edge */}
      <path d="M4 3h12v10l-3 3H4V3z" />
      <path d="M13 16v-3h3" />
      <path d="M7 7h6M7 10h4" />
      <path d="M16 8l2-2M18 8l-2-2" opacity="0.4" />
    </svg>
  )
}

export function MapSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Map — folded parchment with compass lines */}
      <path d="M3 4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4z" />
      <path d="M3 7h14" />
      <path d="M7 3v14" />
      {/* Compass rose */}
      <circle cx="13" cy="12" r="3" opacity="0.6" />
      <path d="M13 10v4M11 12h4" opacity="0.6" />
    </svg>
  )
}

export function GlossarySymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      {/* Book — closed, with spine and page marks */}
      <path d="M4 3v14c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1z" />
      <path d="M10 2v16" />
      <path d="M6 6h3M6 9h3M6 12h3" />
      <path d="M12 6h2M12 9h2" />
    </svg>
  )
}

/**
 * Default fallback — a simple diamond/lozenge
 */
export function DefaultSymbol({ className, size = 16 }: SymbolProps) {
  return (
    <svg
      {...symbolAttrs}
      width={size}
      height={size}
      className={`text-ember-400 ${className ?? ""}`}
    >
      <path d="M10 3l4 7-4 7-4-7 4-7z" />
    </svg>
  )
}

/**
 * Symbol lookup map — mirrors the contentTypeLabels keys used in the archive
 */
export const contentTypeSymbols: Record<string, React.ComponentType<SymbolProps>> = {
  lore: LoreSymbol,
  story: StorySymbol,
  log: LogSymbol,
  art: ArtSymbol,
  commentary: CommentarySymbol,
  deleted_scene: DeletedSceneSymbol,
  map: MapSymbol,
  glossary: GlossarySymbol,
}

export default function ArchiveSymbol({ type, className, size }: { type: string } & SymbolProps) {
  const SymbolComponent = contentTypeSymbols[type] ?? DefaultSymbol
  return <SymbolComponent className={className} size={size} />
}