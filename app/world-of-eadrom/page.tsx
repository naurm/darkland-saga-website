import Link from "next/link"

export default function WorldOfEadromPage() {
  return (
    <>
      {/* Chamber 1: Threshold */}
      <section className="mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-4">Emberlight Archive</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ember-200 leading-tight text-balance">
          The World of Eadrom
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-ember-600/50" />
        <p className="mt-6 text-lg text-parchment-400 leading-relaxed max-w-xl mx-auto font-display italic">
          What holds when the darkness presses in.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#the-pillar" className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all">Enter</Link>
          <Link href="/books" className="inline-flex items-center gap-2 rounded border border-parchment-700 px-5 py-2.5 font-mono text-sm text-parchment-400 hover:border-ember-700 hover:text-ember-300 transition-all">Read the Saga</Link>
        </div>
      </section>

      {/* The Pillar of Light */}
      <section id="the-pillar" className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Light</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200 mb-6">The Pillar of Light</h2>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>Just beyond the southern mountains of Ciallmhar, the Pillar stretches toward the sky — the only thing keeping the Storm and the Bane from finding a permanent home in Arsatir. Clouds swirl around the mile-wide beacon.</p>
            <p>No one fully understands the ancient magic that keeps it lit. Every year a ritual involving all four nations recharges its light. For those on the borders, the hours feel like days while the ritual is completed.</p>
          </div>
          <blockquote className="my-8 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-base text-ember-300 italic leading-relaxed">&ldquo;When the Pillar&rsquo;s light shines again, bane that have slipped across the border slink into the long shadows its light casts, hungering for their chance to turn creatures of light to darkness.&rdquo;</p>
            <cite className="mt-2 block font-mono text-xs text-parchment-500 not-italic">&mdash; Anonymous border keeper, Ciallmhar Garrison</cite>
          </blockquote>
        </div>
      </section>

      {/* The Storm & The Bane */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Darkness</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200 mb-6">The Storm &amp; The Bane</h2>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>The Storm is a dominating force of darkness over Eadrom — clouds of pure black, its wall stretching as far as the eye can see, bunching against the border of Arsatir, demanding entry.</p>
            <p><em>Bane</em> are ill-made creatures sent beyond the borders under cover of the Storm. Most are wild animals corrupted by other bane. Infected humans die of the corruption if not treated quickly. Bane cannot survive long in the light.</p>
          </div>
          <blockquote className="my-8 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-base text-ember-300 italic leading-relaxed">&ldquo;Death incarnate, called &lsquo;bane&rsquo;, came with The Storm, and everything they touched turned to Darkness.&rdquo;</p>
          </blockquote>
        </div>
      </section>

      {/* The Four Nations */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">Arsatir</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200 mb-8">The Four Nations</h2>
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
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">The Fallen Mountains — some float due to immense earthstone deposits. The tallest people, 7&ndash;9 feet. Longer lives, muscular builds.</p>
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
              <p className="mt-3 text-sm text-parchment-400 leading-relaxed">Great forest. Home to the Griffon Riders and forest drakes. Windstones mined in the Stone Trees — towering rock formations in intense wind streams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Magic System */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Weave</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200 mb-6">Essence Magic</h2>
          <div className="space-y-4 text-sm sm:text-base text-parchment-400 leading-relaxed">
            <p>Essence stones are found at locations of extreme elemental intensity. Each stone attunes to the element of its origin. To use a stone&rsquo;s power, one must <em>bond</em> with it — through prolonged contact, deliberate concentration, or using an already-bonded stone as a bridge.</p>
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

      {/* Notable Figures */}
      <section className="border-t border-ember-dim/40 bg-parchment-900/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">The Archive</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ember-200 mb-2">Notable Figures</h2>
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

      {/* Coda */}
      <section className="border-t border-ember-dim/40">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <div className="mx-auto h-px w-12 bg-ember-600/30 mb-8" />
          <blockquote className="font-display text-xl sm:text-2xl text-ember-300 italic leading-relaxed text-balance">&ldquo;There is more here than I can fully see yet.&rdquo;</blockquote>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/books" className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-6 py-3 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all">
              Begin Reading Darkness Kindled
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="mt-8">
            <p className="font-mono text-xs text-parchment-600 leading-relaxed">The Darkland Saga &middot; Emberlight Archive &middot; Colophon</p>
          </div>
        </div>
      </section>
    </>
  )
}
