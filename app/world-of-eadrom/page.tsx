import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "World of Eadrom — Tower of Archives",
  description:
    "Explore the world of the Darkland Saga — the Tower of Archives, the Four Nations, Essence Magic, the Storm and the Bane, and biographical records from Ciallmhar.",
  openGraph: {
    title: "World of Eadrom — Tower of Archives | Darkland Saga",
    description:
      "Explore the world of the Darkland Saga — the Tower of Archives, the Four Nations, Essence Magic, the Storm and the Bane, and biographical records from Ciallmhar.",
  },
  twitter: {
    title: "World of Eadrom — Tower of Archives | Darkland Saga",
    description:
      "Explore the world of the Darkland Saga — the Tower of Archives, the Four Nations, Essence Magic, the Storm and the Bane, and biographical records from Ciallmhar.",
  },
}

const floors = [
  { level: 1, name: "The Threshold", desc: "Public entry, exhibits, reception, and orientation. Where every visitor begins." },
  { level: 2, name: "The Keepers", desc: "Copyists, cataloging rooms, and preservation vaults. Those who keep the archive functioning." },
  { level: 3, name: "Military History", desc: "Campaigns, wars, battle maps, commanders, royal records, fortress designs.", href: "#the-pillar" },
  { level: 4, name: "Kingdoms & Peoples", desc: "History, genealogy, diplomacy, cultures, languages — the study of mankind itself.", href: "#four-nations" },
  { level: 5, name: "Natural Philosophy", desc: "Geography, weather, flora, fauna, agriculture, astronomy, navigation." },
  { level: 6, name: "Arts & Craftsmanship", desc: "Architecture, engineering, metallurgy, music, poetry, essence-stone technology.", href: "#essence-magic" },
  { level: 7, name: "Mysteries", desc: "The Bane, the Storm, Darkness, Light, Essence, Bonding, Weaving, ancient artifacts — the most restricted of the ordinary floors.", href: "#storm-bane" },
  { level: 8, name: "Philosophy & Theology", desc: "Questions of meaning. Virtue, ethics, the purpose of Light, interpretations of ancient texts." },
  { level: 9, name: "The Chamber of Inquiry", desc: "Active research, private collections, visiting scholars. Knowledge still being pursued." },
  { level: 10, name: "The Archmaster's Hall", desc: "The pinnacle. Council chambers, rarest manuscripts, observatories. What is kept here, the lower floors do not record.", href: "#archmasters-hall" },
]

export default function WorldOfEadromPage() {
  return (
    <>
      {/* Level 1 — The Threshold — entry point */}
      <section className="mx-auto max-w-4xl px-6 pt-32 pb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-2">
          Tower of Archives &middot; Ciallmhar
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-400 mb-4">
          Level 1 &mdash; The Threshold
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ember-200 leading-tight text-balance">
          The World of Eadrom
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-ember-600/50" />
        <p className="mt-6 text-lg text-parchment-400 leading-relaxed max-w-xl mx-auto font-display italic">
          What holds when the darkness presses in.
        </p>
        <p className="mt-4 text-sm text-parchment-400 max-w-lg mx-auto leading-relaxed">
          The Tower of Archives rises ten levels in the heart of Ciallmhar, each floor dedicated
          to a discipline of knowledge. Study the levels below, then step through the threshold
          to begin your ascent &mdash; the Tower awaits at the base of this page. Scroll up to climb.
        </p>
      </section>

      {/* The Ten Levels overview — map first so visitors see the full structure before starting */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-6 text-center">
            The Ten Levels
          </p>
          <div className="space-y-0">
            {floors.map((floor, i) => (
              <div
                key={floor.level}
                className={`flex gap-4 py-4 ${
                  i < floors.length - 1 ? "border-b border-ember-dim/20" : ""
                }`}
              >
                <span className="font-mono text-xs text-ember-300 w-6 flex-shrink-0 pt-0.5">
                  {String(floor.level).padStart(2, "0")}
                </span>
                <div>
                  {floor.href ? (
                    <a href={floor.href} className="font-mono text-sm text-ember-400 hover:text-emberglow-bright transition-colors">
                      {floor.name} <span className="text-ember-600 text-[10px]">&#8593;</span>
                    </a>
                  ) : (
                    <p className="font-mono text-sm text-ember-400">{floor.name}</p>
                  )}
                  <p className="text-xs text-parchment-400 mt-0.5 leading-relaxed">{floor.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#the-pillar" className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-6 py-3 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all">Ascend</a>
            <p className="mt-3 font-mono text-[10px] text-parchment-600 tracking-wider uppercase">(takes you to the base of the tower &mdash; scroll up to climb)</p>
          </div>
        </div>
      </section>

      {/* Lore — ordered highest → lowest in DOM.
          Ascend jumps to #the-pillar at the bottom of the page (Level 3, lowest floor with content).
          Scroll up to climb toward the summit. */}

      {/* Level 10 — The Archmaster's Hall (summit) */}
      <section id="archmasters-hall" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-4">Level 10 &mdash; The Archmaster&rsquo;s Hall</p>
          <blockquote className="font-display text-xl sm:text-2xl text-ember-300 italic leading-relaxed text-balance">&ldquo;There is more here than I can fully see yet.&rdquo;</blockquote>
          <p className="mt-6 text-sm text-parchment-400 max-w-md mx-auto leading-relaxed">
            The Archmaster&rsquo;s Hall sits beneath a lantern of cut glass and iron. What knowledge is kept there, no record in these lower floors can say.
          </p>
          <p className="mt-6 text-sm text-parchment-400 max-w-md mx-auto leading-relaxed">
            Deeper records &mdash; restricted archives, field notes, and uncovered fragments &mdash; are preserved in the <Link href="/companion" className="text-ember-400 hover:text-emberglow-bright transition-colors underline underline-offset-4 decoration-ember-700/50">Companion Archive</Link>.
          </p>
        </div>
      </section>

      {/* Level 7 — Mysteries: The Storm & The Bane */}
      <section id="storm-bane" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-1">Level 7 &mdash; Mysteries</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Darkness</p>
          <div className="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-ember-500">
              {/* Bane crest — broken circle with a through-line */}
              <circle cx="12" cy="12" r="8" opacity="0.5"/>
              <path d="M4 4l16 16M12 4v4M12 16v4M4 12h4M16 12h4"/>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl text-ember-200">The Storm &amp; The Bane</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>The Storm is a dominating force of darkness over Eadrom &mdash; clouds of pure black, its wall stretching as far as the eye can see, bunching against the border of Arsatir, demanding entry.</p>
            <p><em>Bane</em> are ill-made creatures sent beyond the borders under cover of the Storm. Most are wild animals corrupted by other bane. Infected humans die of the corruption if not treated quickly. Bane cannot survive long in the light.</p>
          </div>
          <blockquote className="my-8 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-base text-ember-300 italic leading-relaxed">&ldquo;Death incarnate, called &lsquo;bane&rsquo;, came with The Storm, and everything they touched turned to Darkness.&rdquo;</p>
          </blockquote>
        </div>
      </section>

      {/* Level 6 — Arts & Craftsmanship: Essence Magic */}
      <section id="essence-magic" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-1">Level 6 &mdash; Arts &amp; Craftsmanship</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Weave</p>
          <div className="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-ember-500">
              {/* Essence Magic crest — overlapping diamond with central knot */}
              <path d="M12 4l8 8-8 8-8-8 8-8z"/>
              <circle cx="12" cy="12" r="2"/>
              <path d="M4 12h16M12 4v16" opacity="0.3"/>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl text-ember-200">Essence Magic</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>Essence stones are found at locations of extreme elemental intensity. Each stone attunes to the element of its origin. To use a stone&rsquo;s power, one must <em>bond</em> with it &mdash; through prolonged contact, deliberate concentration, or using an already-bonded stone as a bridge.</p>
            <p>Weaving requires concentration and practice. Each element demands a different mindset:</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400">Fire</p>
              <p className="text-sm text-parchment-400 mt-1 leading-relaxed">Precision and discipline. Fire creates, it does not merely manipulate.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400">Earth</p>
              <p className="text-sm text-parchment-400 mt-1 leading-relaxed">Making whole. Healing, protecting, building. Keeping things intact.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400">Wind</p>
              <p className="text-sm text-parchment-400 mt-1 leading-relaxed">Openness. Working with the flow. Creativity and expansion.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400">Water</p>
              <p className="text-sm text-parchment-400 mt-1 leading-relaxed">Trust. Exploration, discovery, bravery to face what lies ahead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Level 4 — Kingdoms & Peoples: The Four Nations */}
      <section id="four-nations" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-1">Level 4 &mdash; Kingdoms &amp; Peoples</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">Arsatir</p>
          <div className="flex items-center gap-3 mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-ember-500">
              {/* Four Nations crest — four diamonds in a cross */}
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
              <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.4"/>
              <circle cx="17" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
              <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
              <circle cx="12" cy="17" r="1.5" fill="currentColor" opacity="0.4"/>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl text-ember-200">The Four Nations</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400 mb-1">Fire</p>
              <h3 className="font-display text-lg text-ember-200">Ciallmhar</h3>
              <p className="text-xs text-parchment-500 font-mono mt-0.5">Northeast</p>
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">The Smouldering Forest, rivers of lava beneath trees that crack with heat. Tall stature, 6&ndash;7 feet. The Crown grants nobility to accomplished banehunters.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400 mb-1">Earth</p>
              <h3 className="font-display text-lg text-ember-200">Oroa</h3>
              <p className="text-xs text-parchment-500 font-mono mt-0.5">Northwest</p>
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">The Fallen Mountains &mdash; some float due to immense earthstone deposits. The tallest people, 7&ndash;9 feet. Longer lives, muscular builds.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400 mb-1">Water</p>
              <h3 className="font-display text-lg text-ember-200">Proteya</h3>
              <p className="text-xs text-parchment-500 font-mono mt-0.5">West</p>
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">Coastal nation. At the center of a maelstrom lies dry land where waterstones can be mined. The finest sailors navigate these waters.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-900/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-400 mb-1">Wind</p>
              <h3 className="font-display text-lg text-ember-200">The Wildwood</h3>
              <p className="text-xs text-parchment-500 font-mono mt-0.5">East to Southeast</p>
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">Great forest. Home to the Griffon Riders and forest drakes. Windstones mined in the Stone Trees &mdash; towering rock formations in intense wind streams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Level 4 (continued) — Notable Figures */}
      <section id="notable-figures" className="border-t border-ember-dim/40 bg-parchment-900/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-1">Level 4 &mdash; Kingdoms &amp; Peoples</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">Notable Figures</p>
          <div className="flex items-center gap-3 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-ember-500">
              {/* Biographical Records crest — figure / scroll */}
              <circle cx="12" cy="7" r="2.5"/>
              <path d="M6 19c0-3 2.7-5 6-5s6 2 6 5"/>
              <path d="M14 6l2 2-2 2" opacity="0.4"/>
              <path d="M18 8l2 2-2 2" opacity="0.4"/>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl text-ember-200">Biographical Records</h2>
          </div>
          <p className="text-sm text-parchment-500 mb-8 max-w-lg">Fragments recovered from field notes, archival records, and banehunter journals.</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-ember-dim bg-parchment-950/50 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-500 mb-1">Banehunter &mdash; House Stoutfire</p>
              <h3 className="font-display text-lg text-ember-200">Rowan</h3>
              <p className="mt-2 text-sm text-parchment-400 leading-relaxed">Scarred by failure, Rowan works alone. A pragmatic hunter who has developed a grudging fondness for a town he never meant to protect. Blonde, scarred, carries the weight of past mistakes.</p>
            </div>
            
            <div className="rounded border border-ember-dim bg-parchment-950/50 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-500 mb-1">Darkstone &mdash; The Umbra Six</p>
              <h3 className="font-display text-lg text-ember-200">Priv &ldquo;Misfortune&rdquo;</h3>
              <p className="mt-2 text-sm text-parchment-400 leading-relaxed">A darkstone user serving the Blackstones, carrying a darkstone in one arm and a windstone in the other. Leads the Umbra Six &mdash; an elite squad of soldiers bound by loyalty and shared suffering.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-950/50 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-500 mb-1">Elemental Creature</p>
              <h3 className="font-display text-lg text-ember-200">Hellcat</h3>
              <p className="mt-2 text-sm text-parchment-400 leading-relaxed">A large, broad-shouldered black cat with coin-sized interlocking plates that raise to reveal flame. Highly intelligent, resistant to bane corruption. Bonds with such creatures are rare.</p>
            </div>
            <div className="rounded border border-ember-dim bg-parchment-950/50 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-500 mb-1">Master of Essence</p>
              <h3 className="font-display text-lg text-ember-200">Jack</h3>
              <p className="mt-2 text-sm text-parchment-400 leading-relaxed">A rare weaver who can use all four elements. Carries himself like a gentleman, frequently grins, flourishes his hands when he weaves.</p>
            </div>
          </div>
          <div className="mt-8 rounded border border-ember-dim bg-parchment-900/30 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-ember-500 mb-2">The Umbra Six</p>
            <p className="text-sm text-parchment-400 leading-relaxed">Priv&rsquo;s elite squad of Blackstone soldiers. <strong>Valier</strong> &mdash; optimistic, darkstone user. <strong>Zehr</strong> &mdash; the marksman. <strong>Rile</strong> &mdash; earth magic, jovial, massive build. <strong>Karrig</strong> &mdash; the medic, kind and gentle. <strong>Ator</strong> &mdash; fire magic, explosive expert. They are not evil, but are sometimes forced to follow evil orders.</p>
          </div>
        </div>
      </section>

      {/* Level 3 &mdash; Military History: The Pillar of Light &mdash; lowest content floor (the "base" that Ascend jumps to) */}
      <section id="the-pillar" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-300 mb-1">Level 3 &mdash; Military History</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Light</p>
          <div className="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-ember-500">
              {/* Pillar of Light crest — tapered pillar with a beacon crown */}
              <path d="M10 21h4"/>
              <path d="M11 21V5l1-2 1 2v16"/>
              <path d="M12 3l3 4M12 3l-3 4" opacity="0.5"/>
              <path d="M9 16c0 0 1.5-2 3-2s3 2 3 2" opacity="0.4"/>
              <path d="M7 18c0 0 2.5-3 5-3s5 3 5 3" opacity="0.25"/>
            </svg>
            <h2 className="font-display text-2xl sm:text-3xl text-ember-200">The Pillar of Light</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>Just beyond the southern mountains of Ciallmhar, the Pillar stretches toward the sky &mdash; the only thing keeping the Storm and the Bane from finding a permanent home in Arsatir. Clouds swirl around the mile-wide beacon.</p>
            <p>No one fully understands the ancient magic that keeps it lit. Every year a ritual involving all four nations recharges its light. For those on the borders, the hours feel like days while the ritual is completed.</p>
          </div>
          <blockquote className="my-8 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-base text-ember-300 italic leading-relaxed">&ldquo;When the Pillar&rsquo;s light shines again, bane that have slipped across the border slink into the long shadows its light casts, hungering for their chance to turn creatures of light to darkness.&rdquo;</p>
            <cite className="mt-2 block font-mono text-xs text-parchment-500 not-italic">&mdash; Anonymous border keeper, Ciallmhar Garrison</cite>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <div className="mx-auto h-px w-12 bg-ember-600/30 mb-8" />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/books" className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-6 py-3 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all">
              Begin Reading Darkness Kindled
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="mt-8">
            <p className="font-mono text-xs text-parchment-600 leading-relaxed">The Darkland Saga &middot; Tower of Archives &middot; Ciallmhar</p>
          </div>
        </div>
      </section>
    </>
  )
}
