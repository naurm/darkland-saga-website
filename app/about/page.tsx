export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
          The Storyteller
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200 mb-8">About J.L. Allred</h1>

        <div className="mb-8 flex justify-center">
          <img
            src="/images/author-headshot.jpg"
            alt="J.L. Allred"
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-2 border-ember-dim shadow-lg"
          />
        </div>

        <div className="space-y-5 text-sm sm:text-base text-parchment-400 leading-relaxed">
          <p>
            J.L. Allred writes fantasy that lives in the space between hope and despair —
            stories where the darkness is real and the light is worth fighting for.
          </p>

          <p>
            The Darkland Saga was born from a single question: what if the last refuge of light
            was surrounded by an endless storm of living darkness? From that image grew a world
            of four nations, each with its own elemental magic, bound together by the Pillar of
            Light that keeps the dark at bay.
          </p>

          <p>
            At its heart, the Darkland Saga is about people making impossible choices —
          </p>

          <div className="my-8 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-lg text-ember-300 italic">
              &ldquo;Death incarnate, called &lsquo;bane&rsquo;, came with The Storm, and everything they touched turned to Darkness.&rdquo;
            </p>
          </div>

          <p>
            Whether exploring the bonds between banehunters and hellcats, following a prince
            into the heart of a conspiracy, or asking whether betrayal can ever be redeemed,
            the stories of the Darkland Saga are grounded in the belief that even in the
            darkest places, something worth saving remains.
          </p>

          <p>
            When not writing, J.L. Allred can usually be found building worlds, developing magic systems,
            or wondering what happens if you give a hellcat a voice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-ember-dim">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-4 text-center">
          Get in Touch
        </p>
        <p className="text-sm text-parchment-400 text-center leading-relaxed max-w-md mx-auto">
          Follow the Darkland Saga on Royal Road for updates, new chapters, and the latest releases.
        </p>
      </section>
    </>
  )
}